class Cell {
    private nextState: boolean;
    private positionX: number;
    private positionY: number;
    constructor(
        private grid: Grid,
        private x: number,
        private y: number,
        private cellWidth: number,
        private cellHeight: number,
        private value: boolean) {
        this.nextState = this.value;
        this.positionX=this.x * this.cellWidth;
        this.positionY=this.y * this.cellHeight;
    }

    public draw(): void {
        this.value = this.nextState;
        if (this.value) {
            fill(255);
        } else {
            fill(0);
        }
        rect(this.positionX, this.positionY, this.cellWidth, this.cellHeight);
    }

    public calculateNextState() {
        let neiboursCount = this.countNeibours();
        if (this.value && (neiboursCount < 2 || neiboursCount > 3)) {
            this.nextState = false;
        }
        else if (!this.value && neiboursCount == 3) {
            this.nextState = true;
        } else {
            this.nextState = this.value;
        }
    }

    public getValue(): boolean {
        return this.value;
    }

    public setValue(newValue: boolean) {
        this.value = newValue;
    }

    public toString(): string {
        return `${this.x} - ${this.y} - ${this.value}`;
    }

    private countNeibours(): number {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x == 0 && y == 0)
                    continue;
                let searchX = (this.x + x + this.grid.getWidth()) % this.grid.getWidth();
                let searchY = (this.y + y + this.grid.getHeight()) % this.grid.getHeight();
                if (this.grid.getCell(searchX, searchY).getValue()) {
                    count++;
                }
            }
        }
        return count;
    }
}