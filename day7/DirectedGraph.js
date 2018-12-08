class DirectedGraph{

    constructor(){
        this.adjMap = new Map();
    }

    addVertex(v){
        if(this.adjMap.get(v) != undefined) return;
        this.adjMap.set(v,[]);
    }

    addEdge(v,w){
        this.adjMap.get(v).push(w);
    }

    removeEdge(v,w){
        let edges = this.adjMap.get(w);
        let index = -1;
        for (let i = 0; i < edges.length; i++) {
            if(edges[i] == v)
                index = i;
        }
        this.adjMap.get(w).splice(index,1);
    }

    printGraph() {
        let get_keys = this.adjMap.keys();
        for (let i of get_keys) {
            let get_values = this.adjMap.get(i);
            let conc = "";
            for (let j of get_values)
                conc += j + " ";
            console.log(i + " <- " + conc);
        }
    } 

    getInEdges(v){
        return this.adjMap.get(v);
    }

    getOutEdges(v){
        let e = [];
        for (const k of this.adjMap.keys()) {
            if(this.adjMap.get(k).includes(v))
                e.push(k)
        }
        return e;
    }

    topologicalOrder(){
        let noDeps = this.getNodesWithoutEntryEdges();
        let s = []
        for (const key in noDeps) {
            s.push(key)
        }
        s.sort((a,b) => -(a.localeCompare(b)))

        let l = [];
        while(s.length > 0){
            let u = s.pop();
            l.push(u);
            let edges = this.getOutEdges(u);
            for (let i = 0; i < edges.length; i++) {
                let m = edges[i];
                this.removeEdge(u,m);
                if(this.getInEdges(m).length == 0){
                    s.push(m)
                }
            }
            s.sort((a,b) => -(a.localeCompare(b)));
        }
        console.log(l.reduce((s,e) => s+=e,""));

    }

    getNodesWithoutEntryEdges(){
        let noDeps = Array.from(this.adjMap.keys()).reduce((acc,cur)=>{ acc[cur] =cur; return acc;}, {});
        for (let key of this.adjMap.keys()) {
            let edges = this.getInEdges(key)
            for (let i = 0; i < edges.length; i++) {
                delete noDeps[key];
            }
        }
        return noDeps;
        
    }

    topologicalOrder(workersCount) {
        let letterWeights = Array.from(Array(26), ((v, i) =>  i + 1)).reduce((acc,w) => {acc[String.fromCharCode(64+w)] = w+60; return acc;}, {});

        let noDeps = this.getNodesWithoutEntryEdges();
        let s = []
        for (const key in noDeps) {
            s.push({task :key,w:letterWeights[key], assigned:false})
        }
        s.sort((a,b) => -(a.task.localeCompare(b.task)))

        let visited = [];
        let elapsed = 0;
        let workers = [];
        for (let i = 0; i < workersCount; i++) {
            if(i < s.length){
                workers.push({id:i, task: s[i].task})
                s[i].assigned = true;
            }else{
                workers.push({id:i, task : "."})
            }
        }

        let assignTask = (worker) =>{
            if(!s.some(el => el.assigned == false)) {
                worker.task = "."
                return;
            }
            s.sort((a, b) => -(a.task.localeCompare(b.task)));
            let i = s.length-1;
            while(i >= 0){
                let u = s[i];
                if(!u.assigned){
                    u.assigned = true;
                    worker.task = u.task;
                    return;
                }
                i--;
            }
            console.log('error')
        }

        while (s.length > 0) {
            for (let i = 0; i < workers.length; i++) {
                let anythingTodo = s.some(t => t.assigned == false);
                if(anythingTodo && workers[i].task == "."){
                    assignTask(workers[i]);
                }else if(workers[i].task != "."){
                    let taskIndex = s.findIndex(e => e.task == workers[i].task);
                    s[taskIndex].w--;
                    if (s[taskIndex].w == 0) {
                        let done = s[taskIndex];
                        s.splice(taskIndex,1);
                        visited.push(done.task);
                        let edges = this.getOutEdges(done.task);
                        for (let i = 0; i < edges.length; i++) {
                            let m = edges[i];
                            this.removeEdge(done.task, m);
                            if (this.getInEdges(m).length == 0) {
                                s.push({ task: m, w: letterWeights[m], assigned : false })
                            }
                        }
                        assignTask(workers[i]);
                    }
                }
            }
            elapsed++;
        }
        console.log(elapsed);
    }
}

module.exports = { DirectedGraph}