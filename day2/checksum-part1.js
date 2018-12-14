const parser = require('../inputparser');

const input = parser.parse('./input.txt');

const test = [
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab'
]

const checkSum = input => {
    const values = {
        twice: 0,
        thrice: 0
    };
    input.forEach(boxId => {
        const letterCount = {};
        let isTwiceRecorded = false;
        let isThriceRecorded = false;
        boxId.split("").forEach(letter => {
            if (letterCount[letter]) {
                letterCount[letter]++;
            } else {
                letterCount[letter] = 1;
            }
        });
        Object.keys(letterCount).forEach(letter => {
            if (letterCount[letter] === 2 && !isTwiceRecorded) {
                values.twice++;
                isTwiceRecorded = true;
            } else if (letterCount[letter] === 3 && !isThriceRecorded) {
                values.thrice++;
                isThriceRecorded = true;
            }
        });
    });

    return values.twice * values.thrice;
}

console.log(checkSum(input));