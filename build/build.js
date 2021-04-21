var Cell = (function () {
    function Cell(grid, x, y, cellWidth, cellHeight, value) {
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.value = value;
        this.nextState = this.value;
        this.positionX = this.x * this.cellWidth;
        this.positionY = this.y * this.cellHeight;
    }
    Cell.prototype.draw = function () {
        this.value = this.nextState;
        if (this.value) {
            fill(255);
        }
        else {
            fill(0);
        }
        rect(this.positionX, this.positionY, this.cellWidth, this.cellHeight);
    };
    Cell.prototype.calculateNextState = function () {
        var neiboursCount = this.countNeibours();
        if (this.value && (neiboursCount < 2 || neiboursCount > 3)) {
            this.nextState = false;
        }
        else if (!this.value && neiboursCount == 3) {
            this.nextState = true;
        }
        else {
            this.nextState = this.value;
        }
    };
    Cell.prototype.getValue = function () {
        return this.value;
    };
    Cell.prototype.setValue = function (newValue) {
        this.value = newValue;
    };
    Cell.prototype.toString = function () {
        return this.x + " - " + this.y + " - " + this.value;
    };
    Cell.prototype.countNeibours = function () {
        var count = 0;
        for (var x = -1; x <= 1; x++) {
            for (var y = -1; y <= 1; y++) {
                if (x == 0 && y == 0)
                    continue;
                var searchX = (this.x + x + this.grid.getWidth()) % this.grid.getWidth();
                var searchY = (this.y + y + this.grid.getHeight()) % this.grid.getHeight();
                if (this.grid.getCell(searchX, searchY).getValue()) {
                    count++;
                }
            }
        }
        return count;
    };
    return Cell;
}());
var Grid = (function () {
    function Grid(width, height, cellWidth, cellHeight) {
        this.width = width;
        this.height = height;
        this.grid = new Array();
        for (var y = 0; y < height; y++) {
            this.grid[y] = new Array();
            for (var x = 0; x < width; x++) {
                this.grid[y][x] = new Cell(this, x, y, cellWidth, cellHeight, Math.random() > .5);
            }
        }
    }
    Grid.prototype.draw = function () {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.grid[y][x].draw();
            }
        }
    };
    Grid.prototype.calculate = function () {
        var newStates = new Array();
        for (var y = 0; y < this.height; y++) {
            newStates[y] = new Array();
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x].calculateNextState();
            }
        }
    };
    Grid.prototype.getCell = function (x, y) {
        return this.grid[y][x];
    };
    Grid.prototype.getWidth = function () {
        return this.width;
    };
    Grid.prototype.getHeight = function () {
        return this.height;
    };
    Grid.prototype.debug = function () {
        var count = 0;
        var grid = new Array();
        for (var y = 0; y < this.height; y++) {
            grid[y] = new Array();
            for (var x = 0; x < this.width; x++) {
                grid[y][x] = this.grid[y][x].getValue();
            }
        }
        console.table(grid);
    };
    return Grid;
}());
var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var rows = 50;
var cols = 50;
var cellWidth;
var cellHeight;
var grid;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
    cellWidth = 500 / cols;
    cellHeight = 500 / rows;
    grid = new Grid(cols, rows, cellWidth, cellHeight);
}
function draw() {
    background(255);
    translate(width / 2 - 250, height / 2 - 250);
    stroke(0);
    grid.draw();
    grid.calculate();
    fill(0);
    text("50x50 grid " + frameCount + " generations with frameRate " + int(frameRate()), 0, -30);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/build.js.map