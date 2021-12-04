for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        cell.addEventListener("blur", e => {
            let address = addressBar.value
            let [activecell, cellProp] = activeCell(address)   //activecell is cell
            let enteredData = cell.innerText

            if(enteredData == cellProp.value) return;
            
            cellProp.value = enteredData

            //if data modified using hard coding
            removeChildFromParent(cellProp.formula)
            cellProp.formula = ""
            updateChildrenCells(address)
        })
    }
}

// let formulaBar = document.querySelector(".formula-bar")
formulaBar.addEventListener("keydown", e => {
    let inputFormula = formulaBar.value
    if (e.key === "Enter" && inputFormula) {

        //if change in formula occurs, break old parent-child relation , add new parent child relation
        let address = addressBar.value
        let [cell, cellProp] = activeCell(address)
        if(inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula)

        //check formula is cyclic or not then only evaluate
        addChildToGraphComp(inputFormula,address)
        let isCyclic = isGraphCyclic(graphComponentMatrix)
        if(isCyclic==true){
            removeChildFromGraphComp(inputFormula,address)
            alert("your formula is cyclic")
            return;
        }
        
        let evaluatedValue = evaluateFormula(inputFormula)

        setCellUIAndProp(evaluatedValue, inputFormula,address)
        addChildToParent(inputFormula)
        updateChildrenCells(address)
        // console.log(sheetDB);
    }
})

function addChildToGraphComp(formula,childAddress){
    let [crid,ccid] = decodeRIDCIDFromAddress(childAddress)

    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0)
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid,pcid] = decodeRIDCIDFromAddress(encodedFormula[i])
            graphComponentMatrix[prid][pcid].push([crid,ccid])
        }
    }
}

function removeChildFromGraphComp(formula,childAddress){
    let [crid,ccid] = decodeRIDCIDFromAddress(childAddress)

    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0)
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid,pcid] = decodeRIDCIDFromAddress(encodedFormula[i])
            graphComponentMatrix[prid][pcid].pop()
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0)
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = activeCell(encodedFormula[i])
            encodedFormula[i] = cellProp.value
        }
    }
    let decodedFormula = encodedFormula.join(" ")
    return eval(decodedFormula)
}

function setCellUIAndProp(evaluatedValue, formula,address) {
    let [cell, cellProp] = activeCell(address)

    //ui update
    cell.innerText = evaluatedValue
    //storage update
    cellProp.value = evaluatedValue
    cellProp.formula = formula
}


function addChildToParent(formula) {
    let childAddress = addressBar.value
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0)
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i])
            parentCellProp.children.push(childAddress)
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0)
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i])
            let idx = parentCellProp.children.indexOf(childAddress)
            parentCellProp.children.splice(idx,1)
        }
    }
}

function updateChildrenCells(parentAddress){
    let [parentCell, parentCellProp] = activeCell(parentAddress)
    let children = parentCellProp.children

    for(let i=0;i<children.length;i++){
        let childAddress = children[i]
        let [childCell, childCellProp] = activeCell(childAddress)
        let childFormula = childCellProp.formula
        let evaluatedValue = evaluateFormula(childFormula)
        setCellUIAndProp(evaluatedValue,childFormula,childAddress)
        updateChildrenCells(childAddress)
    }
}