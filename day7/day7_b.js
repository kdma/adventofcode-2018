const fs = require("fs");
const {DirectedGraph} = require(__dirname+"/DirectedGraph.js")
let p = __dirname+"/day7_input.txt";
// let p = __dirname+"/day7_test_input.txt";
const input = fs.readFileSync(p, "utf-8").split("\r\n");
let g = new DirectedGraph();

input.forEach(line => {
    let u = line.substr(5,1);
    let w = line.substr(36,1)
    g.addVertex(u);
    g.addVertex(w);
    g.addEdge(w,u);
});
g.printGraph();
g.topologicalOrder(5);