<script>
  import ReferenceList from './lib/ReferenceList.svelte';
  import TextEditor from './lib/TextEditor.svelte'

  function callbackFunction(event) {
		console.log(`Notify fired! Detail`, event);
    const element = new TextEditor({
			target: document.querySelector('#abc')
		})
	}
</script>

<main>
    <ReferenceList on:notify={callbackFunction} />
    <TextEditor />
    <div id="abc"></div>
</main>

<style>
</style>
