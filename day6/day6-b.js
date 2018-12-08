const fs = require("fs");
let p = __dirname + "/day6-input.txt";
// let p = __dirname + "/day6-test.txt";
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

let region = 0;
for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        let summedDistance = points.reduce((acc, cur) => acc + manhattanDistance({ x: x, y: y }, cur), 0);
        if (summedDistance < 10000) {
            region++;
        }
    }
}
console.log(region)


function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}