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

let firstIdx = 0;
while(isSafe(firstIdx,list) && isSafe(firstIdx+1,list))
{
    let secIdx = firstIdx+1;
    if(causesReaction(list[firstIdx], list[secIdx])){
        debugLog("collapsing " + list[firstIdx] + list[secIdx])
            list.splice(firstIdx,1)
            firstIdx = firstIdx-1 > 0 ? firstIdx-1 : 0;
            list.splice(secIdx-1,1)
            secIdx--;
            continue;
    }
    firstIdx++;
    secIdx++;
}

console.log(list.length)
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