export class AvatarGeneration {

    private readonly initialGeneration: boolean[][];

    constructor(private amountOfCellsOnX = 4,
                private amountOfCellsOnY = 8,
                private minimalAmountOfStartingCells = amountOfCellsOnX * amountOfCellsOnY / 2) {

        this.initialGeneration = this.createInitialGenerationWithRandomSeed();
    }

    public start(amountOfGenerations = 2): boolean[][] {
        let newGeneration: boolean[][] = this.initialGeneration;
        for (let i = 0; i < amountOfGenerations; i++) {
            newGeneration = this.nextGeneration(newGeneration);
        }
        let copyOfFinalGenerationFlippedHorizontally = this.makeCopyAndFlipHorizontally(newGeneration);
        return this.mergeLeftAndRightPart(newGeneration, copyOfFinalGenerationFlippedHorizontally);
    }

    private mergeLeftAndRightPart(leftSide: boolean[][], rightSide: boolean[][]) {
        const emptyGeneration: boolean[][] = this.createEmptyGeneration(this.amountOfCellsOnX * 2, this.amountOfCellsOnY);
        for (let y = 0; y < this.amountOfCellsOnY; y++) {
            for (let x = 0; x < this.amountOfCellsOnX * 2; x++) {
                emptyGeneration[y][x] = x < this.amountOfCellsOnX ? leftSide[y][x] : rightSide[y][x - this.amountOfCellsOnX];
            }
        }
        return emptyGeneration;
    }

    private makeCopyAndFlipHorizontally(finalGeneration: boolean[][]) {
        const copyOfFinalGeneration = finalGeneration.map(inner => inner.slice())
        copyOfFinalGeneration.map(row => row.reverse());
        return copyOfFinalGeneration;

    }

    private createInitialGenerationWithRandomSeed(): boolean[][] {
        const amountOfStartingCells = this.getRandom(this.minimalAmountOfStartingCells, this.amountOfCellsOnX * this.amountOfCellsOnY + 1)
        const initialGeneration: boolean[][] = this.createEmptyGeneration();
        for (let i = 0; i < amountOfStartingCells; i++) {
            let x = this.getRandom(0, this.amountOfCellsOnX);
            let y = this.getRandom(0, this.amountOfCellsOnY)
            initialGeneration[y][x] = true;
        }
        return initialGeneration
    }

    private nextGeneration(previousGeneration: boolean[][]): boolean[][] {
        let newGeneration = this.createEmptyGeneration();
        for (let y = 0; y < this.amountOfCellsOnY; y++) {
            for (let x = 0; x < this.amountOfCellsOnX; x++) {
                let amountOfNeighbours = this.countNeighbours(x, y, previousGeneration);
                if (amountOfNeighbours === 2 || amountOfNeighbours === 3) {
                    newGeneration[y][x] = previousGeneration[y][x];
                } else newGeneration[y][x] = !previousGeneration[y][x] && amountOfNeighbours <= 1;
            }
        }
        return newGeneration;
    }

    private countNeighbours(x: number, y: number, generation: boolean[][]): number {
        const xLeft = x - 1, xRight = x + 1;
        const yUp = y - 1, yDown = y + 1;
        return this.countNeighbour(xLeft, yUp, generation) +
            this.countNeighbour(xLeft, yDown, generation) +
            this.countNeighbour(xLeft, y, generation) +
            this.countNeighbour(xRight, yUp, generation) +
            this.countNeighbour(xRight, yDown, generation) +
            this.countNeighbour(xRight, yUp, generation) +
            this.countNeighbour(x, yUp, generation) +
            this.countNeighbour(x, yDown, generation);
    }

    private countNeighbour(x: number, y: number, generation: boolean[][]) {
        if (x < 0 || y < 0 || x >= this.amountOfCellsOnX || y >= this.amountOfCellsOnY) {
            return 0;
        }
        return generation[y][x] ? 1 : 0;
    }

    private createEmptyGeneration(amountOfCellsOnX = this.amountOfCellsOnX, amountOfCellsOnY = this.amountOfCellsOnY): boolean[][] {
        return Array.from(Array(amountOfCellsOnY), () => new Array(amountOfCellsOnX).fill(false));
    }

    private getRandom(minIncluding, maxExcluding): number {
        return Math.floor(Math.random() * (maxExcluding - minIncluding)) + minIncluding;
    }

}
