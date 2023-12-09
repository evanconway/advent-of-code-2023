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

    /**
     * "Minimum power" is a value which represents the fewest cubes a game could have been 
     * played with. It's the least number of red, green, and blue cubes multiplied together,
     * That still would have allowed for all sets within that game.
     * 
     * @param game  
     */
    const getGameMinimumPower = (game: Game) => {
        const resultSet = game.sets.reduce((result, set) => {
            if (set.red > result.red) result.red = set.red;
            if (set.green > result.green) result.green = set.green;
            if (set.blue > result.blue) result.blue = set.blue;
            return result;
        }, getBlankSet());
        return resultSet.red * resultSet.green * resultSet.blue;
    };

    const part2 = (games: Game[]) => {
        return games.reduce((total, game) => total + getGameMinimumPower(game), 0);
    };

    const part1 = (games: Game[]) => {
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
        const lines = data.split('\r\n');
        const games = lines.map(line => lineToGame(line));
        console.log(`Day 2 part 1: ${part1(games)}`);
        console.log(`Day 2 part 2: ${part2(games)}`);
    });
};
