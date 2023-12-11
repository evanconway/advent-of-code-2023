import fs from 'fs';

interface Cell {
    id: number,
    char: string,
}

export const day3 = (inputFilePath: string) => {
    const grid: Cell[][] = [];
    const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    const part1 = () => {
        const cellsVisited = new Set<number>();

        const getNumberAtLoc = (y: number, x: number) => {
            if (y < 0 || y >= grid.length) return 0;
            const row = grid[y];
            if (x < 0 || x >= row.length) return 0;
            const cell = row[x];
            if (cellsVisited.has(cell.id)) return 0;
            if (!NUMS.includes(cell.char)) return 0;
            let indexStart = x;
            let indexEnd = x;
            while (grid[y][indexStart - 1] !== undefined && NUMS.includes(grid[y][indexStart - 1].char)) indexStart--;
            while (grid[y][indexEnd + 1] !== undefined && NUMS.includes(grid[y][indexEnd + 1].char)) indexEnd++;
            let foundStr = "";
            for (let i = indexStart; i <= indexEnd; i++) {
                foundStr += grid[y][i].char;
                cellsVisited.add(grid[y][i].id);
            }
            return Number.parseInt(foundStr);
        };

        const getTotalSurroundingPos = (y: number, x: number) => {
            // rework so visited cells are accounted for here and not globally
            const cell = grid[y][x]; // 
            let result = 0;
            result += getNumberAtLoc(y, x + 1);
            result += getNumberAtLoc(y, x - 1);
            result += getNumberAtLoc(y + 1, x);
            result += getNumberAtLoc(y - 1, x);
            result += getNumberAtLoc(y + 1, x + 1);
            result += getNumberAtLoc(y + 1, x - 1);
            result += getNumberAtLoc(y - 1, x + 1);
            result += getNumberAtLoc(y - 1, x - 1);
            return result;
        };

        let result = 0;

        const processLocation = (y: number, x: number) => {
            const cell = grid[y][x];
            if (cellsVisited.has(cell.id)) return;
            if (cell.char === '.') {
                cellsVisited.add(cell.id);
                return;
            }
            if (NUMS.includes(cell.char)) return; // only add numbers to cells visited when returned for part number
            // if we're here, the cell must be an unprocessed part
            result += getTotalSurroundingPos(y, x);
        };

        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {

                processLocation(y, x);
            }
        }

        return result;
    };

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\n');

        // setup grid
        let ids = 0;
        for (let i = 0; i < lines.length; i++) {
            grid.push([]);
            const currentArr = grid[grid.length - 1];
            for (let k = 0; k < lines[i].length; k++) {
                currentArr.push({
                    id: ids++,
                    char: lines[i][k]
                });
            }
        }

        console.log(part1());
    });
};
