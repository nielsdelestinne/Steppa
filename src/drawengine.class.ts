import {Cell} from "./avatar/cell.class";

export class DrawEngine {

    constructor(private readonly ctx: CanvasRenderingContext2D,
                private readonly cellSize: number) {
    }

    public draw(finalGeneration: Cell[][]) {

        const colours = [
            ["#000000", "#05715c", "#0aac8b", "#12c19d", "#20d9b3", "#1cdcb5", "#28e7c0", "#34fcd3"],
            ["#000000", "#5f8900", "#88ba15", "#a4de1e", "#baf52e", "#c1f642", "#d1fc6c", "#daff89"],
            ["#000000", "#860174", "#cb01ae", "#ff02da", "#ff15dc", "#ff34e0", "#ff4ae4", "#ff71ea"],
            ["#000000", "#7b3900", "#bb5801", "#e36800", "#ff7a07", "#ff8b2a", "#ff953c", "#ffa14e"]
        ];

        let colour = colours[Math.floor(Math.random() * colours.length)];

        for (let y = 0; y < finalGeneration.length; y++) {
            for (let x = 0; x < finalGeneration[y].length; x++) {
                this.ctx.beginPath();
                this.ctx.rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                this.ctx.fillStyle = this.getFillStyle(finalGeneration[y][x], colour);
                this.ctx.fill();
            }
        }
    }

    private getFillStyle(cell: Cell, colour: string[]): string {
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

}
