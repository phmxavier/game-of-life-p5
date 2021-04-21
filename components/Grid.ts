class Grid {
    private grid: Array<Array<Cell>>;
    constructor(private width: number, private height: number, cellWidth: number, cellHeight: number) {
        this.grid = new Array<Array<Cell>>();
        for (let y = 0; y < height; y++) {
            this.grid[y] = new Array<Cell>();
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = new Cell(this, x, y, cellWidth, cellHeight, Math.random() > .5);
            }
        }
    }

    public draw(): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.grid[y][x].draw();
            }
        }
    }

    public calculate(): void {
        let newStates = new Array<Array<boolean>>();
        for (let y = 0; y < this.height; y++) {
            newStates[y] = new Array<boolean>();
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x].calculateNextState();
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.grid[y][x];
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public debug(): void {
        let count = 0;
        let grid = new Array<Array<boolean>>();
        for (let y = 0; y < this.height; y++) {
            grid[y] = new Array<boolean>();
            for (let x = 0; x < this.width; x++) {
                grid[y][x] = this.grid[y][x].getValue();
            }
        }
        console.table(grid);
    }
}