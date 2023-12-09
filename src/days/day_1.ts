import fs from 'fs';

export const day1 = (inputFilePath: string) => {
    const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];

    /**
     * Given a string, return the index of the first numerical character.
     * 
     * @param line 
     */
    const fromLineGetIndexFirstNum = (line: string, includeWords=false) => {
        for (let i = 0; i < line.length; i++) {
            if (NUMS.includes(line[i])) return line[i];
            if (includeWords) {
                for (let k = 0; k < WORDS.length; k++) {
                    if (line.indexOf(WORDS[k]) == i) return NUMS[k];
                }
            }
        }
        return '0';
    };

    /**
     * Given a string, return the index of the last numerical character.
     * 
     * @param line 
     */
    const fromLineGetIndexLastNumChar = (line: string, includeWords=false) => {
        for (let i = line.length - 1; i >= 0; i--) {
            if (NUMS.includes(line[i])) return line[i];
            if (includeWords) {
                const tail = line.substring(i);
                for (let k = 0; k < WORDS.length; k++) {
                    if (tail.includes(WORDS[k])) return NUMS[k];
                }
            }
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

    const part2 = (lines: string[]) => {
        const answer = lines.reduce((total, line) => {
            const firstNum = fromLineGetIndexFirstNum(line, true);
            const lastNum = fromLineGetIndexLastNumChar(line, true);
            return total + Number.parseInt(firstNum + lastNum);
        }, 0);
        console.log(`day 1 part 2: "${answer}"`);
    };

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\r\n')
        part1(lines);
        part2(lines);
    });
};
