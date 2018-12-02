const fs = require("fs");
const frequencies = fs.readFileSync("input_1.txt", "utf-8").split("\n");
let res = 0;
frequencies.forEach(freq => {
    let freqAsNumber = parseInt(freq);
    res += freqAsNumber;
});
console.log(res);