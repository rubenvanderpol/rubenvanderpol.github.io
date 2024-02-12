<script>
  import { referenceDto } from "../assets/Infrastructure/referenceRepository";
  import { Services } from "../assets/services";

  /** @type {referenceDto} */
  export let reference;
  export let show = true;
  console.log(reference);

  let repo = Services.getReferenceRepos();

  /** @type {HTMLParagraphElement} */
  let textElement;

  /** @type {HTMLElement} */
  let titleElement;

  let editMode = true;
  const switchEditmode = () => {
    editMode = !editMode;
  };

  const save = () => {
    reference.html = textElement.innerHTML;
    reference.title = titleElement.innerHTML;
    repo.editReference(reference);
  };

  const del = () => {
    repo.deleteReference(reference);
  };


</script>

<div class:hide={!show}>

  <div class = 'button-header'>
  <button on:click={switchEditmode}>
    {editMode ? "Read" : "Edit"}
  </button>
  <button on:click={save}> Save </button>
  <button on:click={del}> Delete </button>
  </div>
  <div class="text-editor" id="text-editor{reference.id}">
    {#if reference.title !== undefined}
      <h2 contenteditable={editMode} bind:this={titleElement}>
        {reference.title}
      </h2>
    {/if}
    <p
      class="base-text"
      bind:this={textElement}
      contenteditable={editMode}
      tabindex="-1"
    >
      {@html reference.html}
    </p>
  </div>
</div>

<style>

.hide {
    display: none !important;
  }
  .button-header{
    border: 1px solid rgb(199, 199, 199);
  }

  .base-text {
    height: calc(100vh -100px);
    padding: 2em;
    border: 1px solid rgb(199, 199, 199);
  }
</style>
