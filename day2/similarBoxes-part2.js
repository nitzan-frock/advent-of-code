const parser = require('../inputparser');

const input = parser.parse('./input.txt');

const findCommonLetters = input => {
    let sorted = input.sort();
    let commonLetters = [];

    for (let i = 1; i < sorted.length; i++) {
        let numUncommon = 0;
        let boxId = sorted[i];
        let prevBoxId = sorted[i-1];  
        
        for (let j = 0; j < boxId.length; j++){
            if (numUncommon > 1) {
                commonLetters = [];
                numUncommon = 0;
                break;
            };

            if (boxId[j] === prevBoxId[j]) {
                commonLetters.push(boxId[j]);
            } else {
                numUncommon++;
            }
        }
        if (numUncommon === 1) break;
    }

    return commonLetters.join('');
}

const test = parser.parse('./test.txt');

console.log(findCommonLetters(input));