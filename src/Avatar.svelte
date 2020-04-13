<script lang="typescript">
    import {onMount} from 'svelte';
    import {AvatarGeneration} from "./avatar/avatar-generation.class";
    import {Cell} from "./avatar/cell.class";

    export let index: number;

    let canvasElement;

    function draw(ctx: CanvasRenderingContext2D, finalGeneration: Cell[][]) {

        const colours = [
            ["#000000", "#05715c", "#0aac8b", "#12c19d", "#20d9b3", "#1cdcb5", "#28e7c0", "#34fcd3"],
            ["#000000", "#5f8900", "#88ba15", "#a4de1e", "#baf52e", "#c1f642", "#d1fc6c", "#daff89"],
            ["#000000", "#860174", "#cb01ae", "#ff02da", "#ff15dc", "#ff34e0", "#ff4ae4", "#ff71ea"],
            ["#000000", "#7b3900", "#bb5801", "#e36800", "#ff7a07", "#ff8b2a", "#ff953c", "#ffa14e"]
        ];

        let colour = colours[Math.floor(Math.random() * colours.length)];

        for (let y = 0; y < finalGeneration.length; y++) {
            for (let x = 0; x < finalGeneration[y].length; x++) {
                ctx.beginPath();
                ctx.rect(x * 10, y * 10, 10, 10);
                ctx.fillStyle = getFillStyle(finalGeneration[y][x], colour);
                ctx.fill();
            }
        }
    }

    function getFillStyle(cell: Cell, colour: string[]) {
        if (cell.isAlive && cell.amountOfNeighbours >= 8) {
            return colour[7];
        }
        if (cell.isAlive && cell.amountOfNeighbours >= 6) {
            return colour[6];
        }
        if (cell.isAlive && cell.amountOfNeighbours >= 6) {
            return colour[5];
        }
        if (cell.isAlive && cell.amountOfNeighbours >= 4) {
            return colour[4];
        }
        if (cell.isAlive && cell.amountOfNeighbours >= 2) {
            return colour[3];
        }
        if (cell.isAlive) {
            return colour[2];
        }
        if (!cell.isAlive && cell.amountOfNeighbours >= 1) {
            return colour[1];
        }
        return colour[0];
    }

    export const canvasHeight = 600;
    export const canvasWidth = 600;

    onMount(() => {
        const cellSize = 10;
        const width = (canvasWidth / cellSize - 4) / 2;
        const height = canvasHeight / cellSize - 4;

        const ctx = canvasElement.getContext('2d');
        const avatarGeneration = new AvatarGeneration(width, height);
        const finalGeneration: Cell[][] = avatarGeneration.start(10);
        draw(ctx, finalGeneration);
    });


</script>

<div class="avatar">
    <div>
        <canvas bind:this={canvasElement} height="{canvasHeight}px" width="{canvasWidth}px"></canvas>
    </div>
</div>

<style>
    canvas {
        background-color: #0aac8b;
    }

    .avatar {
        background-color: #efefef;
        border: 1px solid #cccccc;
        padding: 1rem;
        margin: 1rem;
    }
</style>
