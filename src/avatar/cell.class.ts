export class Cell {

    constructor(private _isAlive: boolean, private _amountOfNeighbours: number) {

    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    get amountOfNeighbours(): number {
        return this._amountOfNeighbours;
    }
}
