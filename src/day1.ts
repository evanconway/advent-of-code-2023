import fs from 'fs';

export const day1 = (inputFilePath: string) => {
    const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];

    /**
     * Given a string, return the index of the first numerical character.
     * 
     * @param line 
     */
    const fromLineGetIndexFirstNum = (line: string) => {
        for (let i = 0; i < line.length; i++) {
            if (NUMS.includes(line[i])) return line[i];
        }
        return '0';
    };

    /**
     * Given a string, return the index of the last numerical character.
     * 
     * @param line 
     */
    const fromLineGetIndexLastNumChar = (line: string) => {
        for (let i = line.length - 1; i >= 0; i--) {
            if (NUMS.includes(line[i])) return line[i];
        }
        return '0';
    };

    

    const part1 = (lines: string[]) => {
        const answer = lines.reduce((total, line) => {
            const firstNum = fromLineGetIndexFirstNum(line);
            const lastNum = fromLineGetIndexLastNumChar(line);
            return total + Number.parseInt(firstNum + lastNum);
        }, 0);
        console.log(`day 1 part 1: "${answer}"`);
    };

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        part1(data.split('\r\n'));
    });
};
