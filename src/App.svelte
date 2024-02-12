<script>
  import { referenceDto } from './assets/Infrastructure/referenceRepository';
  import { Services } from './assets/services';
  import ReferenceList from './lib/ReferenceList.svelte';
  import TextEditor from './lib/TextEditor.svelte'

  class TextEditorWithId{
     /**
     * @type {TextEditor}
     */
    element;

    /**
     * @type {string}
     */
    id;
  }

  const onAdd = () => {
      Services.getReferenceRepos().addReference('', '');
    };

  /**
     * @type {TextEditorWithId[]}
     */
  let openedElements = [];

  function callbackFunction(event) {
    
    /**
     * @type {referenceDto}
     */
    let ref = event.detail;
    
    if(openedElements.filter(a => a.id == ref.id).length === 0)
    {
      const element = new TextEditor({
          target: document.querySelector('#abc'),
          props: { reference : ref }
        });

        let t = new TextEditorWithId();
        t.element = element;
        t.id = ref.id;
        openedElements.push(t);  
    }
    else
    {
      openedElements.filter(a => a.id == ref.id).forEach(a => a.element.$set({show: true}))
    }
    openedElements.filter(a => a.id !== ref.id).forEach(a => a.element.$set({show: false}));
	}

</script>

<main>
  <div class="flex-container">
    <button on:click={() => onAdd()}>+</button>
    <ReferenceList on:notify={callbackFunction} />
  </div>
    
    <div id="abc"></div>
</main>

<style>
.flex-container {
      border-top: 1px solid black;
        display: flex;
        flex-direction: row;
        margin: 10px 10px 0px 0px;
    }
</style>
