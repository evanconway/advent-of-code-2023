import fs from 'fs';

interface Set {
    red: number,
    green: number,
    blue: number
}

interface Game {
    id: number,
    sets: Set[]
}

export const day2 = (inputFilePath: string) => {
    const getBlankSet = () => ({red: 0, green: 0, blue: 0});

    const lineToGame = (line: string) => {
        const data = line.split(':');
        const game: Game = {
            id: Number.parseInt(data[0].split(' ')[1]),
            sets: data[1].split(';').map(setStr => {
                const vals = setStr.split(',');
                const set: Set = getBlankSet();
                for (var i = 0; i < vals.length; i++) {
                    const valParts = vals[i].split(' ').filter(v => v !== '');
                    if (valParts[1] == 'red') set.red += Number.parseInt(valParts[0]);
                    if (valParts[1] == 'green') set.green += Number.parseInt(valParts[0]);
                    if (valParts[1] == 'blue') set.blue += Number.parseInt(valParts[0]);
                }
                return set;
            })
        };
        return game;
    };

    const part1 = (lines: string[]) => {
        const games = lines.map(line => lineToGame(line));

        /*
            The bag containing cubes holds:
            12 red
            13 green
            14 blue
            Add up the ids of games that are possible given this information.
        */
        const maxRed = 12;
        const maxGreen = 13;
        const maxBlue = 14;

        return games.reduce((total, game) => {
            let valid = true;
            for (var s = 0; s < game.sets.length; s++) {
                const set = game.sets[s];
                if (set.red > maxRed) valid = false;
                if (set.green > maxGreen) valid = false;
                if (set.blue > maxBlue) valid = false;
            }
            return total + (valid ? game.id : 0);
        }, 0);
    };

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\r\n')
        console.log(`Day 2 part 1: ${part1(lines)}`);
    });
};
