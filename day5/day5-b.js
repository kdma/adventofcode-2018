const fs = require("fs");
let p = __dirname+"/day5_input.txt";
const input = fs.readFileSync(p, "utf-8");

const list = [];
for (let i = 0; i < input.length; i++) {
    list.push(input.charAt(i));
}

function debugLog(str)  {
    let debug = false;
    if(debug){
    console.log(str);
    }
}

function isSafe(i, list) {
    return i >= 0 && i < list.length;
}

const alphabet = Array.from(Array(26), (e, i) => String.fromCharCode(i + 97));

const reductionMap = {};
for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    let filteredInput = list.slice();
    for (let j = filteredInput.length-1; j >= 0; j--) {
        if(filteredInput[j].toLowerCase() == letter){
            filteredInput.splice(j,1)
        }
    }

    let firstIdx = 0;
    while (isSafe(firstIdx, filteredInput) && isSafe(firstIdx + 1, filteredInput)) {
        let secIdx = firstIdx + 1;
        if (causesReaction(filteredInput[firstIdx], filteredInput[secIdx])) {
            debugLog("collapsing " + filteredInput[firstIdx] + filteredInput[secIdx])
            filteredInput.splice(firstIdx, 1)
            firstIdx = firstIdx - 1 > 0 ? firstIdx - 1 : 0;
            filteredInput.splice(secIdx - 1, 1)
            secIdx--;
            continue;
        }

        firstIdx++;
        secIdx++;
    }
    reductionMap[letter] = filteredInput.length;
}

let min = Number.MAX_SAFE_INTEGER;
for (const c in reductionMap) {
    if(reductionMap[c] < min){
        min = reductionMap[c];
    }
}
console.log(min);

function causesReaction(c1, c2) {
    function isUpperCase(c) {
        return (c == c.toUpperCase());
    }
    function isLowerCase(c) {
        return (c == c.toLowerCase());
    }

    if (c1.toLowerCase() == c2.toLowerCase()) {
        if (isUpperCase(c1) && isLowerCase(c2) || 
            isLowerCase(c1) && isUpperCase(c2)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}