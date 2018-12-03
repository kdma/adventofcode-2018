const fs = require("fs");
let p = __dirname+"\\input_3.txt";
const strings = fs.readFileSync(p, "utf-8").split("\r\n");

const fW = 1000;
const fH = 1000;
const fabric = Array.from(Array(fH), () => Array(fW).fill(0))

let claimStore = [];

for(let i = 0; i<strings.length;i++){
    let rawClaim = strings[i];
    let claimSplit = rawClaim.split("@");
    let id = parseInt(claimSplit[0].split("#")[1]);
    let values = claimSplit[1].split(":");
    let pos = values[0].split(",");
    let x = parseInt(pos[0]);
    let y = parseInt(pos[1]);
    let size = values[1].split("x");
    let w = parseInt(size[0]);
    let h = parseInt(size[1]);
    const claim = { id:id, x: x, y: y, w: w, h: h };
    claimStore.push(claim);
}

let intersectionsMap = {};
claimStore.forEach(claim => {
    
    intersectionsMap[claim.id] = { hasNoIntersections : false};
    let areaCount = 0;
    
    for(let y = claim.y; y < claim.y+claim.h; y++){
        for(let x = claim.x; x < claim.x+claim.w; x++){
            if(fabric[y][x] == 0){
                areaCount++;
            }else{
                intersectionsMap[fabric[y][x]].hasNoIntersections = false;
            }
            fabric[y][x] = claim.id;
        }
    }

    if(areaCount == claim.w*claim.h){
        intersectionsMap[claim.id].hasNoIntersections = true;
    }
});

for(key in intersectionsMap){

    if(intersectionsMap[key].hasNoIntersections){
        console.log(key)
    }
}
