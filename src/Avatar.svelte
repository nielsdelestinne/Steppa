<script lang="typescript">
    import {onMount} from 'svelte';
    import {AvatarGeneration} from "./avatar/avatar-generation.class";
    import {Cell} from "./avatar/cell.class";

    export let index: number;

    let canvasElement;

    function draw(ctx: CanvasRenderingContext2D, finalGeneration: Cell[][]) {
        for (let y = 0; y < finalGeneration.length; y++) {
            for (let x = 0; x < finalGeneration[y].length; x++) {
                ctx.beginPath();
                ctx.rect(x * 10, y * 10, 10, 10);
                ctx.fillStyle = getFillStyle(finalGeneration[y][x]);
                ctx.fill();
            }
        }
    }

    function getFillStyle(cell: Cell) {
        if(cell.isAlive && cell.amountOfNeighbours >= 8) {
            return "#34fcd3";
        }
        if(cell.isAlive && cell.amountOfNeighbours >= 6) {
            return "#28e7c0";
        }
        if(cell.isAlive && cell.amountOfNeighbours >= 6) {
            return "#1cdcb5";
        }
        if(cell.isAlive && cell.amountOfNeighbours >= 4) {
            return "#20d9b3";
        }
        if(cell.isAlive && cell.amountOfNeighbours >= 2) {
            return "#12c19d";
        }
        if(cell.isAlive) {
            return "#0aac8b";
        }
        if(!cell.isAlive && cell.amountOfNeighbours >= 1) {
            return "#05715c";
        }
        return "#2d2d2d";
    }

    export const canvasHeight = 400;
    export const canvasWidth = 400;

    onMount(() => {
        const cellSize = 10;
        const width = (canvasWidth / cellSize - 4) / 2;
        const height = canvasHeight / cellSize - 4;

        const ctx = canvasElement.getContext('2d');
        const avatarGeneration = new AvatarGeneration(width, height);
        const finalGeneration: Cell[][] = avatarGeneration.start(4);
        draw(ctx, finalGeneration);
    });


</script>

<div class="avatar">
    <div>Random Boy {index}</div>
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
