<script>
    import {
        ireferenceRepository, referenceDto,
    } from "../assets/Infrastructure/referenceRepository";
    import { createEventDispatcher } from "svelte";
    import { Services } from "../assets/services";
    const dispatch = createEventDispatcher();
    
    /** @type {ireferenceRepository} */
    let myRepos = Services.getReferenceRepos();

     /**
     * @type {referenceDto[]}
     */
    let references = myRepos.references;
    myRepos.readableReferences.subscribe(s => references = s);
</script>


    {#each references as reference}
        <div class="reference-item">
            <button
                on:click={() => {
                    console.log(reference.title);
                    dispatch("notify", reference);
                }}>{reference.title}
            </button>
        </div>
    {/each}

<style>
    p {
        margin: 3px 3px 3px 3px;
        font-family: "Comic Sans MS", cursive;
    }
</style>
