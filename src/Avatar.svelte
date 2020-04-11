<script lang="typescript">
    import {onMount} from 'svelte';

    export let index: number;

    let canvasElement;

    function draw(ctx: CanvasRenderingContext2D, finalGeneration: boolean[][]) {
        for (let y = 0; y < finalGeneration.length; y++) {
            for (let x = 0; x < finalGeneration[y].length; x++) {
                ctx.beginPath();
                ctx.rect(x * 10 + 10, y * 10 + 10, 10, 10);
                ctx.fillStyle = finalGeneration[y][x] ? "#c4c3c3" : "#0aac8b";
                ctx.fill();
                if(finalGeneration[y][x]) {
                    ctx.fillStyle = "#4b4b4b";
                    ctx.stroke();
                }
            }
        }

        let flippedFinalGeneration = finalGeneration.map(function(arr){return arr.reverse();});

        for (let y = 0; y < flippedFinalGeneration.length; y++) {
            for (let x = 0; x < flippedFinalGeneration[y].length; x++) {
                ctx.beginPath();
                ctx.rect((4*10) + x * 10 + 10, y * 10 + 10, 10, 10);
                ctx.fillStyle = flippedFinalGeneration[y][x] ? "#c4c3c3" : "#0aac8b";
                ctx.fill();
                if(flippedFinalGeneration[y][x]) {
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
        const finalGeneration: boolean[][] = gameOfLife(width, height);
        draw(ctx, finalGeneration);
    });


    function gameOfLife(width: number, height: number): boolean[][] {
        const amountOfStartingCells = getRandom(20, width * height + 1)
        const amountOfGenerations = 2;

        let selectedPositions = [];

        let initialGeneration: boolean[][] = createEmptyGeneration(width, height);

        for (let i = 0; i < amountOfStartingCells; i++) {
            let x = getRandom(0, width);
            let y = getRandom(0, height)
            initialGeneration[y][x] = true;
        }

        let newGeneration: boolean[][] = initialGeneration;
        for (let i = 0; i < amountOfGenerations; i++) {
            newGeneration = nextGeneration(newGeneration, width, height);
        }
        return newGeneration;
    }

    function nextGeneration(previousGeneration: boolean[][], width: number, height: number): boolean[][] {

        let newGeneration = createEmptyGeneration(width, height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let amountOfNeighbours = countNeighbours(x, y, previousGeneration, width, height);
                // Any live cell with two or three neighbors survives.
                if (amountOfNeighbours === 2 || amountOfNeighbours === 3) {
                    newGeneration[y][x] = previousGeneration[y][x];
                } else newGeneration[y][x] = !previousGeneration[y][x] && amountOfNeighbours <= 1;
            }
        }
        return newGeneration;
    }

    function countNeighbours(x: number, y: number, generation: boolean[][], width: number, height: number): number {
        const xLeft = x - 1, xRight = x + 1;
        const yUp = y - 1, yDown = y + 1;
        return countNeighbour(xLeft, yUp, generation, width, height) +
                countNeighbour(xLeft, yDown, generation, width, height) +
                countNeighbour(xLeft, y, generation, width, height) +
                countNeighbour(xRight, yUp, generation, width, height) +
                countNeighbour(xRight, yDown, generation, width, height) +
                countNeighbour(xRight, yUp, generation, width, height) +
                countNeighbour(x, yUp, generation, width, height) +
                countNeighbour(x, yDown, generation, width, height);
    }

    function countNeighbour(x: number, y: number, generation: boolean[][], width: number, height: number) {
        if (x < 0 || y < 0 || x >= width || y >= height) {
            return 0;
        }
        return generation[y][x] ? 1 : 0;
    }

    function createEmptyGeneration(width: number, height: number): boolean[][] {
        return Array.from(Array(height), () => new Array(width).fill(false));
    }

    function getRandom(minIncluding, maxExcluding): number {
        return Math.floor(Math.random() * (maxExcluding - minIncluding)) + minIncluding;
    }


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
