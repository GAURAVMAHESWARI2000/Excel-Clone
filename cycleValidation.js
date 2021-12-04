// storage -> 2d array 
let graphComponentMatrix = []
for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < cols; j++) {
        //why array -> more than one children or dependency
        row.push([])
    }
    graphComponentMatrix.push(row)
}

//returns true if graph is cyclic else returns false
function isGraphCyclic(graphComponentMatrix) {
    let visited = [] //2-d array initialised with false for keeping track of visited nodes
    let dfsVisited = []  //2-d array initialised with false for keeping track of nodes in current dfs

    for (let i = 0; i < rows; i++) {   // initialise visited and dfsVisited array
        let visitedRow = []
        let dfsVisitedRow = []
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow)
        dfsVisited.push(dfsVisitedRow)
    }

    for (let i = 0; i < rows; i++) {   // initialise visited and dfsVisited array
        for (let j = 0; j < cols; j++) {
            let isCycle = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited)
            if (isCycle == true) {
                return true
            }
        }
    }
    return false
}

//dfs function to detect cycle
function dfsCycleDetection(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited) {
    if (dfsVisited[srcRow][srcCol] == true) return true;
    if (visited[srcRow][srcCol] == true) return false;

    dfsVisited[srcRow][srcCol] = true
    visited[srcRow][srcCol] = true
    let nbrs = graphComponentMatrix[srcRow][srcCol]
    for (let i = 0; i < nbrs.length; i++) {
        let [childRid, childCid] = nbrs[i]
        let nbrResponse = dfsCycleDetection(graphComponentMatrix, childRid, childCid, visited, dfsVisited)
        if (nbrResponse==true) {
            return true
        }
    }
    dfsVisited[srcRow][srcCol] = false
    return false
}