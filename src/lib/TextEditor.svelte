<script>
    import { onMount } from 'svelte';
    import {RefText } from '../assets/textreference';

    /** @type {HTMLParagraphElement} */
    let textElement;

    let editMode = true;
    const switchEditmode = () => {
        editMode = !editMode;
    }

    const selectText = () => {
        if(window.getSelection())
        {
            let sel = window.getSelection();
            let range = sel.getRangeAt(0);
        }
    }

    let t = new RefText(1);
    let text = t.plainText;
    let id = t.id;
    
    const save = () => {
      let savedText = textElement.innerHTML;
      t.saveText(savedText);
    }

    const link = () => {
        
    }

  </script>
  
  <button on:click={switchEditmode}>
    {editMode ? "Read" : "Edit"}
  </button>
  <button on:click={save}> 
    Save
  </button>
  {#if editMode}
  <button>
    Link
  </button>
  {/if}

  <div class="text-editor" id="text-editor{t.id}">
    {#if t.title !== undefined}
      <h2>{t.title}</h2>
    {/if}
    <p class="base-text" bind:this={textElement}
        contenteditable="{editMode}"
        tabindex="-1" 
        on:keydown={() =>selectText()}
        on:click={() => selectText()}>
        {@html text}
    </p>
  </div>

  <style>
    .base-text{
      height: calc(100vh -100px);
      padding: 2em;
      border: 1px solid rgb(199, 199, 199);
    }
  </style>

  
  
  
  