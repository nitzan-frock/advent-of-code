const parser = require('../inputparser');

const deltaHz = parser.parse('./input.txt');

const calibrate = deltaHz => {
    let resultHz = 0;
    let results = {0: 1};
    let duplicateResult = null;
    let foundFrequencyTwice = false;

    while (!foundFrequencyTwice) {
        for (let i = 0; i < deltaHz.length; i++) {
            const frequency = parseInt(deltaHz[i]);
            resultHz = resultHz + frequency;
            if (results[resultHz]) {
                foundFrequencyTwice = true;
                duplicateResult = resultHz;
                break;
            } else {
                results[resultHz] = 1;
            }
        }
    }
    return duplicateResult;
}

console.log(calibrate(deltaHz));