import fs from 'fs';

interface Cell {
    id: number,
    char: string,
}

export const day3 = (inputFilePath: string) => {
    const grid: Cell[][] = [];
    const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    const getNumberAtLoc = (y: number, x: number, ignoreIds = new Set<number>()) => {
        if (y < 0 || y >= grid.length) return null;
        const row = grid[y];
        if (x < 0 || x >= row.length) return null;
        const cell = row[x];
        if (ignoreIds.has(cell.id)) return null;
        if (!NUMS.includes(cell.char)) return null;
        let indexStart = x;
        let indexEnd = x;
        while (grid[y][indexStart - 1] !== undefined && NUMS.includes(grid[y][indexStart - 1].char)) indexStart--;
        while (grid[y][indexEnd + 1] !== undefined && NUMS.includes(grid[y][indexEnd + 1].char)) indexEnd++;
        let foundStr = "";
        const ids: number[] = []; // cell ids accounted for
        for (let i = indexStart; i <= indexEnd; i++) {
            foundStr += grid[y][i].char;
            ids.push(grid[y][i].id);
        }
        return {
            number: Number.parseInt(foundStr),
            ids
        };
    };

    const getNumbersSurroundingPos = (y: number, x: number) => {
        const idsProcessed = new Set<number>();
        const result: number[] = [];
        const handleAdjacent = (offsetY: number, offsetX: number) => {
            const val = getNumberAtLoc(y + offsetY, x + offsetX, idsProcessed);
            if (val !== null) {
                val.ids.forEach(id => idsProcessed.add(id));
                result.push(val.number);
            }
        };
        handleAdjacent(0, 1);
        handleAdjacent(0, -1);
        handleAdjacent(1, 0);
        handleAdjacent(-1, 0);
        handleAdjacent(1, 1);
        handleAdjacent(1, -1);
        handleAdjacent(-1, 1);
        handleAdjacent(-1, -1);
        return result;
    };

    const part1 = () => {
        const getTotalSurroundingPos = (y: number, x: number) => {
            return getNumbersSurroundingPos(y, x).reduce((total, current) => total + current, 0);
        };
        let result = 0;
        const processLocation = (y: number, x: number) => {
            const cell = grid[y][x];
            if (cell.char === '.') return;
            if (NUMS.includes(cell.char)) return;
            result += getTotalSurroundingPos(y, x);
        };
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                processLocation(y, x);
            }
        }
        return result;
    };

    const part2 = () => {
        let result = 0;
        const processLocation = (y: number, x: number) => {
            const cell = grid[y][x];
            if (cell.char === '.') return;
            if (NUMS.includes(cell.char)) return;
            const numbers = getNumbersSurroundingPos(y, x);
            if (numbers.length == 2) result += (numbers[0] * numbers[1]);
        };
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
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

        console.log(part2());
    });
};
