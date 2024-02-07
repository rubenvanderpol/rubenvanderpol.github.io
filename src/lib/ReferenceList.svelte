<script>
    import { onMount } from "svelte";
    import {
        referenceRepository,
        referenceDto,
    } from "../assets/Infrastructure/referenceRepository";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    /** @type {referenceRepository} */
    let myRepos = new referenceRepository();
</script>

<div class="flex-container">
    {#each myRepos.referenceNames as title}
        <div class="reference-item">
            <button
                on:click={() => {
                    console.log("clicked", title);
                    dispatch("notify", title);
                }}>{title}
            </button>
        </div>
    {/each}
</div>

<style>
    .flex-container {
        display: flex;
        flex-direction: row;
        margin: 1px;
    }

    .reference-item {
        border: 1px solid black;
    }

    p {
        margin: 3px 3px 3px 3px;
        font-family: "Comic Sans MS", cursive;
    }
</style>
