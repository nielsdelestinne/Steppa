<script lang="typescript">
    import {onMount} from 'svelte';
    import {AvatarGeneration} from "./avatar/avatar-generation.class";

    export let index: number;

    let canvasElement;

    function draw(ctx: CanvasRenderingContext2D, finalGeneration: boolean[][]) {
        for (let y = 0; y < finalGeneration.length; y++) {
            for (let x = 0; x < finalGeneration[y].length; x++) {
                ctx.beginPath();
                ctx.rect(x * 10, y * 10, 10, 10);
                ctx.fillStyle = finalGeneration[y][x] ? "#c4c3c3" : "#0aac8b";
                ctx.fill();
                if(finalGeneration[y][x]) {
                    ctx.fillStyle = "#4b4b4b";
                    ctx.stroke();
                }
            }
        }
    }

    export const canvasHeight = 100;
    export const canvasWidth = 100;

    onMount(() => {
        const cellSize = 10;
        const width = (canvasWidth / cellSize - 2) / 2;
        const height = canvasHeight / cellSize - 2;

        const ctx = canvasElement.getContext('2d');
        const avatarGeneration = new AvatarGeneration(width, height);
        const finalGeneration: boolean[][] = avatarGeneration.start(2);
        draw(ctx, finalGeneration);
    });


</script>

<div>
    Random Boy {index} <br/>

    <canvas bind:this={canvasElement} height="{canvasHeight}px" width="{canvasWidth}px"></canvas>

</div>

<style>
    canvas {
        background-color: #0aac8b;
    }

    div {
        background-color: #efefef;
        border: 1px solid #cccccc;
        padding: 1rem;
        margin: 1rem;
    }
</style>
