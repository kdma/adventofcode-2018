const fs = require("fs");
const strings = fs.readFileSync("input_2.txt", "utf-8").split("\n");

let doubles = 0;
let triples = 0;

for (let i = 0; i < strings.length; i++) {
    const el = strings[i];
    const occurences = {};

    for(let j = 0; j < el.length; j++){
        let c = el.charAt(j);

        if(occurences[c] != undefined){
            occurences[c]++;
        }else{
            occurences[c] = 1;
        }
    }

    let doubleFound = false;
    let tripleFound = false;


    for (const key in occurences) {
        const element = occurences[key];
        if(element == 2 && !doubleFound){
            doubleFound = true;
            doubles++;
        }else if(element == 3 && !tripleFound){
            tripleFound = true;
            triples++;
        }
    }
}

console.log(doubles*triples)