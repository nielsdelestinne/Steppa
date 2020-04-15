<script lang="typescript">
    import {onMount} from 'svelte';
    import {AvatarGeneration} from "./avatar/avatar-generation.class";
    import {Cell} from "./avatar/cell.class";
    import {DrawEngine} from "./drawengine.class";

    let canvasElement;

    export let canvasHeight = 600;
    export let canvasWidth = 600;
    export let cellSize = 10;
    export let amountOfGenerations = 10;

    onMount(() => {

        const width = Math.round((canvasWidth / cellSize - 4) / 2);
        const height = Math.round(canvasHeight / cellSize - 4);

        const drawEngine: DrawEngine = new DrawEngine(canvasElement.getContext('2d'), cellSize);
        const avatarGeneration: AvatarGeneration = new AvatarGeneration(width, height);
        const finalGeneration: Cell[][] = avatarGeneration.start(amountOfGenerations);
        drawEngine.draw(finalGeneration);
    });


</script>

<div class="avatar">
    <div>
        <canvas bind:this={canvasElement} height="{canvasHeight}px" width="{canvasWidth}px"></canvas>
    </div>
</div>

<style>
    canvas {
        background-color: #000000;
    }

    .avatar {
        background-color: #efefef;
        border: 1px solid #cccccc;
        padding: 1rem;
        margin: 1rem;
    }
</style>
