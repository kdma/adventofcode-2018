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

let intersections = 0;
for(let y = 0; y < fH; y++){
    for(let x = 0; x < fW; x++){
        if(fabric[y][x] == -1){
            intersections++;
        }
    }
}

console.log(intersections)