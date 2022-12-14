<script>
    import Countdown from "./Countdown.svelte";
    import { fade } from "svelte/transition";
    import Task from "./Task.svelte";
    const passcode = "testcode"
    let access = true;
    let pword="";
    let expired = false;
    function handleKeyup(e) {
      if(e.key=="Enter") {
        if(pword===passcode) {
          access = true;
        }
        pword="";
      }
      return;
    }
  
    function typewriter(node, { speed = 0.5 }) {
      const valid = (
        node.childNodes.length === 1 &&
        node.childNodes[0].nodeType === Node.TEXT_NODE
      );
      if(!valid) {
        throw new Error("This transition only works on elements with a single text child node");
      }
      const delay = 4000;
      const text = node.textContent;
      const duration = text.length / (speed * 0.01);
      return {
        delay,
        duration,
        tick: t => {
          const i = Math.trunc(text.length*t);
          node.textContent = text.slice(0, i);   
        }
      }
    }
  </script>
  <style>
    .countdown-wrapper {
      position: fixed;
      top: 0;
      left:0;
      right:0;
      text-align: center;
      width: 100vw;
    }
    h1 {
      font-family: SpecialElite-Regular;
    }
    .title-wrapper {
        text-align: center;
    }
    .password-wrapper {
      display: flex;
      flex-direction: column;
    }
    #password-box {
      background-color: black;
      border-color: lightgray;
    }
    #pbox-label {
      text-align: center;
      font-size: 1.6em;
      padding-bottom: 0.25em;;
    }
  </style>
  <main>
    <div class="countdown-wrapper">
      <Countdown deadline={new Date("19 December 2022 00:00:00")} bind:expired={expired}></Countdown>
    </div>
    
    {#if !access && !expired}
    <div class="password-wrapper" transition:fade="{{duration: 3000}}">
      <label for="password-box" id="pbox-label">Password Please</label>
      <input type="password" bind:value={pword} name="password-box" id="password-box" on:keyup={handleKeyup}>
    </div>
    {/if}
    {#if access && !expired}
    <div class="title-wrapper">
      <h1 in:typewriter out:fade="{{ duration: 3000 }}">Taskmaster</h1>
    </div>
    <div class="form-wrapper">
      <Task></Task>
    </div>
    {/if}
  </main>