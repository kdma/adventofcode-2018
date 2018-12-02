const fs = require("fs");
const frequencies = fs.readFileSync("input_1.txt", "utf-8").split("\n");
let map = new Map();
let found = false;
let resultingFrequency = 0;

while(!found){
    for (let i = 0; i < frequencies.length; i++) {

        let freqAsNumber = parseInt(frequencies[i]);
        resultingFrequency += freqAsNumber;

        if (map.has(resultingFrequency)) {
            map.set(resultingFrequency, map.get(resultingFrequency)+1);
            found = true;
            break;
        } else {
            map.set(resultingFrequency, 1);
        }
    }
}
console.log(resultingFrequency)
