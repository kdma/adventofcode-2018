const fs = require("fs");
// let p = __dirname + "/day6-input.txt";
let p = __dirname + "/day6-test.txt";
const input = fs.readFileSync(p, "utf-8");
let labels = Array.from(Array(52), (e, i) => {
    let char = String.fromCharCode(i % 26 + 65);
    if (i < 26) {
        return char;
    } else {
        return char + char;
    }
});

let points = input.split("\r\n").map((p, i) => {
    let coords = p.split(",")
    return { x: parseInt(coords[0]), y: parseInt(coords[1]), label: labels[i], areaCount: 0 }
});
let maxX = points.map(e => e.x).reduce((max, cur) => Math.max(cur, max), 0) + 1;
let maxY = points.map(e => e.y).reduce((max, cur) => Math.max(cur, max), 0) + 1;
let matrix = [];
for (let y = 0; y < maxY; y++) {
    matrix[y] = [];
    for (let x = 0; x < maxX; x++) {
        matrix[y][x] = { minDist: Infinity, owner: '.' }
    }
}
points.forEach(p => {
    matrix[p.y][p.x].owner = p.label;
    matrix[p.y][p.x].isLocked = true;
});
for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        if (matrix[y][x].isLocked) continue;
        for (let j = 0; j < points.length; j++) {
            const point = points[j];
            let manhattanDist = manhattanDistance(point, { x: x, y: y });
            if (manhattanDist < matrix[y][x].minDist) {
                matrix[y][x].minDist = manhattanDist;
                matrix[y][x].owner = point.label.toLowerCase();
            }
            else if (manhattanDist == matrix[y][x].minDist) {
                matrix[y][x].owner = '.';
            }
        }
    }
}

let toSkip = [];
toSkip.push(".");

for (let x = 0; x < maxX; x++) {
    let topLabel = matrix[0][x].owner.toLowerCase();
    let botLabel = matrix[maxY - 1][x].owner.toLowerCase();
    if (!toSkip.includes(topLabel)) {
        toSkip.push(topLabel.toLowerCase());
    }
    if (!toSkip.includes(botLabel)) {
        toSkip.push(botLabel.toLowerCase());
    }
}
for (let y = 0; y < maxY; y++) {
    let leftLabel = matrix[y][0].owner.toLowerCase();
    let rightLabel = matrix[y][maxX-1].owner.toLowerCase();
    if (!toSkip.includes(leftLabel)) {
        toSkip.push(leftLabel.toLowerCase());
    }
    if (!toSkip.includes(rightLabel)) {
        toSkip.push(rightLabel.toLowerCase());
    }
}
const areaMap = {}
for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        let label = matrix[y][x].owner.toLowerCase();
        if(!isInfinite(label, toSkip)){
            if(areaMap[label] == undefined){
                areaMap[label] = 1;
            }else{
                areaMap[label]++;
            }
        }
    }
}

let maxArea = 0;
for (const key in areaMap) {
    if (areaMap.hasOwnProperty(key)) {
        const labelMax = areaMap[key];
        if(labelMax > maxArea){
            maxArea = labelMax;
        }
    }
}
console.log(maxArea)

function isInfinite(label, toSkip){
    let targetNode = toSkip.find(el => el.toLowerCase() == label.toLowerCase());
    if(targetNode != undefined) return true;
    return false;
}

function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}