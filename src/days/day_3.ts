import fs from 'fs';

interface Cell {
    id: number,
    char: string,
}

export const day2 = (inputFilePath: string) => {
    const grid: Cell[][] = [];

    const part1 = () => {
        const cellsVisited = new Set<number>();

        const processLocation = (x: number, y: number) => {
            const cell = grid[y][x];
            if (cellsVisited.has(cell.id)) return;
            cellsVisited.add(cell.id);
            // do stuff
        };

        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {

            }
        }
    };

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\r\n');

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

        part1();
    });
};
