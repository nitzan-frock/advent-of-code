const fs = require ('fs');

exports.parse = input => { 
    return fs.readFileSync(input).toString().split("\n");
};