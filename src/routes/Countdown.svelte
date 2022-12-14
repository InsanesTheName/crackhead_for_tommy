<script>
    import { onMount } from "svelte";
    let time = new Date();
    export let expired = false;
    export let deadline;
    $: diff = new Date(deadline.getTime()-time.getTime());
    $: remaining = (diff.getTime()/1000).toFixed(0);
    $: days = Math.floor(parseFloat(remaining)/86400);
    $: hours = Math.floor((parseFloat(remaining)%86400)/3600)
    $: minutes = Math.floor((parseFloat(remaining)%3600)/60);
    $: seconds = parseFloat(remaining)%60;
    $: if (parseFloat(remaining)<=0) {
      expired = true;
    }
     onMount(() =>{
      const interval = setInterval(() => {
          time = new Date();
      }, 1000);
     });
  </script>
  <style>
  
  </style>
  <div class="main">
      {#if diff.getTime()>=0}
        <h1>{days}:{hours}:{minutes}:{seconds}</h1>
      {:else}
        <h1>Time is up</h1>
      {/if}
  </div>