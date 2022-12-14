<script>
    import { fade } from "svelte/transition";
    let codename="";
    let name="";
    let tf;
    let a =5;
    let b=10;
    let submitted = false;
    let files = [];
    let type = "test";
    let content = "poo";
     
    function typewriter(node, { speed = 1 }) {
      const valid = (
        node.childNodes.length === 1 &&
        node.childNodes[0].nodeType === Node.TEXT_NODE
      );
      if(!valid) {
        throw new Error("This transition only works on elements with a single text child node");
      }
      const delay = 7000;
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
    
    const submitForm = async() => {
      const res = await fetch('/api/codename', {
        method: "POST",
        body: JSON.stringify({ name, codename}),
      })
      if (res.status===200) {
        submitted = true;
        const msg = await res.json();
        console.log(msg);
      }
    };
    //LOOK AT THIS METHOD. THIS IS THE BROKEN ONE
    const sendMail = async() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            content=e.target.result;
        };
        reader.readAsBinaryString(files[0]);

        type = new String(files.type);
        const res = await fetch('api/send-mail', {
            method: "POST",
            body: JSON.stringify({ name, codename, content, type}),
        })
      const msg = await res.json();
      console.log(msg);
      console.log(content);
    };

    function testA(event) {
        console.log(files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target.result);
        };
        reader.readAsBinaryString(files[0]);
    }

  </script>
  <style>
    .main {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    p {
      max-width: 30vw;
    }
    #submit {
      background: none;
      border: none;
    }
    #submit:hover {
      border: 3px outset white;
    }
    .done {
      text-align: center;
      color: black;

    }
  </style>
  {#if !submitted}
  <div class="main" out:fade="{{ duration: 3000 }}">
    <p in:typewriter>Over the next several months, you will be assigned a series of tasks both as inidividuals and a group.
      You will receive a notification in the group chat when a new task is available. You will have until the timer on this page expires to complete each task.
      Your first task is to designate your codename.</p>
      <div id="form">
        <form name="email-form"  transition:fade="{{ delay: 39000, duration: 5000 }}" method="POST" on:submit|preventDefault="{sendMail}">
          <table>
              <tr><td><label for="name">Name: </label></td><td><input class="form-data" type="text" name="name" id="name" bind:value={name}></td></tr>
              <tr><td><label for="codename">Codename: </label></td><td><input class="form-data" type="text" name="codename" id="codename" bind:value={codename}></td></tr>
              <tr><td><label for="test-file">Test File: </label><td><input class="form-data" type="file" accept="audio/*,video/*,image/*" name="test-file" bind:files ></td></tr>
              <tr><td colspan="2" style="text-align: right;"><input type="submit" name="submit" id="submit" value="Submit"></td></tr>
          </table>        
      </form>

      </div>
      
  </div>
  {:else}
  <div class='done' transition:fade="{{ delay: 4000, duration: 3000}}">
    <h3>Task Completed</h3>
  </div>
  {/if}
