//storge
let sheetDB = []

for (let i = 0; i < rows; i++) {
    let sheetRow = []
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGColor: "#000000",    //just for indication purpose
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

//selectors for cell properties
let bold = document.querySelector(".bold")
let italic = document.querySelector(".italic")
let underline = document.querySelector(".underline")
let fontSize = document.querySelector(".font-size-prop")
let fontFamily = document.querySelector(".font-family-prop")
let fontColor = document.querySelector(".font-color-prop")
let BGColor = document.querySelector(".BGcolor-prop")
let alignment = document.querySelectorAll(".alignment")
let leftAlign = alignment[0]
let centerAlign = alignment[1]
let rightAlign = alignment[2]


let activeColorProp = "#d1d8e0"
let inactiveColorProp = "#ecf0f1"


//Application of 2-way binding
//attach property listeners
bold.addEventListener("click", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.bold = !cellProp.bold    //storage modification
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"          //UI change(grid)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp   //UI change(property)
})
italic.addEventListener("click", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.italic = !cellProp.italic    //storage modification
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"          //UI change(grid)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp   //UI change(property)
})
underline.addEventListener("click", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.underline = !cellProp.underline    //storage modification
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"          //UI change(grid)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp   //UI change(property)
})
fontSize.addEventListener("change", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.fontSize = fontSize.value    //storage modification
    cell.style.fontSize = cellProp.fontSize + "px"        //UI change(grid)
    fontSize.value = cellProp.fontSize   //UI change(property)
})
fontFamily.addEventListener("change", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.fontFamily = fontFamily.value    //storage modification
    cell.style.fontFamily = cellProp.fontFamily        //UI change(grid)
    fontFamily.value = cellProp.fontFamily   //UI change(property)
})
fontColor.addEventListener("change", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.fontColor = fontColor.value    //storage modification
    cell.style.color = cellProp.fontColor        //UI change(grid)
    fontColor.value = cellProp.fontColor   //UI change(property)
})
BGColor.addEventListener("change", e => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //modification
    cellProp.BGColor = BGColor.value    //storage modification
    cell.style.backgroundColor = cellProp.BGColor        //UI change(grid)
    BGColor.value = cellProp.BGColor   //UI change(property)
})
alignment.forEach(alignElem => {
    alignElem.addEventListener("click", e => {
        let address = addressBar.value
        let [cell, cellProp] = activeCell(address)
        let alignValue = e.target.classList[0];
        //modification
        cellProp.alignment = alignValue  //storage modification
        cell.style.textAlign = cellProp.alignment  //UI change(grid)

        switch (alignValue) {     //UI change(property)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp
                centerAlign.style.backgroundColor = inactiveColorProp
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp
                centerAlign.style.backgroundColor = activeColorProp
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp
                centerAlign.style.backgroundColor = inactiveColorProp
                rightAlign.style.backgroundColor = activeColorProp
                break;
        }

    })
})


let allCells = document.querySelectorAll(".cell")
for(let i=0;i<allCells.length;i++){
    addListenerToAttachCellProperties(allCells[i])
}

function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click",e => {
        let address = addressBar.value
        let [rid,cid] = decodeRIDCIDFromAddress(address)
        let cellProp = sheetDB[rid][cid]

        //apply properties on cell using storage
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"          //UI change(grid)
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal"          //UI change(grid)
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"          //UI change(grid)
        cell.style.fontSize = cellProp.fontSize + "px"        //UI change(grid)
        cell.style.fontFamily = cellProp.fontFamily        //UI change(grid)
        cell.style.color = cellProp.fontColor        //UI change(grid)
        cell.style.backgroundColor = cellProp.BGColor === "#000000" ? "transparent": cellProp.BGColor         //UI change(grid)
        cell.style.textAlign = cellProp.alignment  //UI change(grid)

        // apply properties on property container using storage
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp   //UI change(property)
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp   //UI change(property)
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp   //UI change(property)
        fontSize.value = cellProp.fontSize   //UI change(property)
        fontFamily.value = cellProp.fontFamily   //UI change(property)
        fontColor.value = cellProp.fontColor   //UI change(property)
        BGColor.value = cellProp.BGColor //UI change(property)
        switch (cellProp.alignment) {     //UI change(property)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp
                centerAlign.style.backgroundColor = inactiveColorProp
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp
                centerAlign.style.backgroundColor = activeColorProp
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp
                centerAlign.style.backgroundColor = inactiveColorProp
                rightAlign.style.backgroundColor = activeColorProp
                break;
        }
    })
}



function activeCell(address) {
    // console.log(address);
    let [rid, cid] = decodeRIDCIDFromAddress(address)
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    let cellProp = sheetDB[rid][cid]
    return [cell, cellProp]
}

function decodeRIDCIDFromAddress(address) {
    let rid = Number(address.slice(1)) - 1
    let cid = Number(address.charCodeAt(0)) - 65
    return [rid, cid]
}