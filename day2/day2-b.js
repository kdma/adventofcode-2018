const fs = require("fs");
const ids = fs.readFileSync("input_2.txt", "utf-8").split("\r\n");

for (let i = 0; i < ids.length; i++) {
    let pivotId = ids[i];
    let differByOne = false;
    let charDiffPos = -1;

    for(let j = i+1 ; j < ids.length; j++){
        let targetId = ids[j];
        let charDiffCount = 0;

        for(let k = 0; k < pivotId.length;k++){
            if(pivotId.charAt(k) != targetId.charAt(k)){
                charDiffCount++;
                charDiffPos = k;
            }
            if(charDiffCount > 1){
                differByOne = false;
                break;
            }
        }

        if(charDiffCount == 1){
            differByOne = true;
            break;
        }
    }

    if(differByOne){
        console.log(pivotId.slice(0, charDiffPos).concat(pivotId.slice(charDiffPos+1, pivotId.length)));
        break;
    }
}
