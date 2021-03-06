let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont")
let cellsCont = document.querySelector(".cells-cont")
let addressBar = document.querySelector(".address-bar")

for(let i=0;i<rows;i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0;i<cols;i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText = String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<rows;i++){
    let rowCont = document.createElement("div")
    rowCont.setAttribute("class","row-Cont")
    for(let j =0;j<cols;j++){
        let cell = document.createElement("div")
        cell.setAttribute("class","cell")
        cell.setAttribute("contenteditable","true")
        cell.setAttribute("spellcheck","false")
        //attribute for cell in grid and in storage linking
        cell.setAttribute("rid",i)
        cell.setAttribute("cid",j)
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont)
}

function addListenerForAddressBarDisplay(cell,i,j){
    let row = i+1;
    let col = String.fromCharCode(65+j);
    cell.addEventListener("click",e =>{
        addressBar.value = col+row
    })
}

//by default click on first cell using DOM
