// var self = this
var registers = []
var finishedList = []
var awaitingList = []
var executingRegister = new Register()
var isExecuting = false
var activeLot = false
var totalLots = 0



function isIdValid (id) {
    let isValid = false
    if (registers.length === 0){
        isValid = true
        return isValid
    }
    else{
        registers.forEach(elem => {
            isValid = elem.id !== id;
        })
        return isValid
    }
}

function getOperationsResult(a, b, x) {

    let result = 0
    if (x === 1){
        result = `Sum = ${add(a, b)}`
    }
    else if (x === 2){
        result = `Multiplication = ${multiply(a, b)}`
    }

    else if (x === 3){
        result = `Subtract = ${subtract(a, b)}`
    }

    else if (x === 4){
        if (b === 0) {
            alert("Division by 0 is not allowed")
        }
        else{
            result = `Division = ${divide(a, b) }`
        }
    }

    else if (x === 5){
        result = `Modulo: ${modulo(a, b)}`
    }

    else if (x === 6){
        result = `Power ${power(a, b)}`
    }
    return result
}

function totalForms() {
    let processes = parseInt(document.getElementById("processes").value )
    let a = parseInt(document.getElementById("a").value)
    let b = parseInt(document.getElementById("b").value)
    let x = parseInt(document.getElementById("operation").value)
    if (processes % 4  === 0){
        totalLots = processes/4
    }
    else{
        totalLots = parseInt((processes/4) +1)
    }
    if((x === 4 || x===5) && (a === 0 || b === 0)){
        alert("Division by 0 is not allowed")
        return
    }
    
    let id = parseInt(document.getElementById("regId").value)
    if (isIdValid(id) === true) {
        register = new Register ()
        register.id = id
        register.name = document.getElementById("name").value
        register.operation = getOperationsResult(a, b, x)
        register.max_ex_time = document.getElementById("max_ex_time").value
        registers.push(register)
        document.getElementById("register").reset()
        document.getElementById("processes").style.visibility = "hidden";
    }
    else {
        document.getElementById("regId").value = "Enter a valid Id"
    }
    
    if (registers.length === processes) {
        document.getElementById("register").style.display="none";
        document.getElementById("processDiv-p").style.display="none";
        calcOverallTime()
        document.getElementById("timer").style.visibility = "visible";
        document.getElementById("lots-total").style.visibility = "visible"
        document.getElementById("lots-total").innerHTML = `Total lots: ${totalLots}`
        document.getElementById("process-table").style.visibility="visible"
        let myInterval = setInterval(setTime, 1000)
        if (registers.length === 0 && awaitingList.length === 0 && !isExecuting){
            clearInterval(myInterval)
        }
    }
    
}


function updateTable (){    
    while(awaitingList.length <= 4 && registers.length > 0 &&  !activeLot){
        if (registers.length === 0 || awaitingList.length === 4){
            activeLot = true
            break
        }
        awaitingList.push(registers[0])
        registers.shift()
    }
    
    fillWaitRow(awaitingList)
    if(isExecuting != true){
        isExecuting = true
        executingRegister = awaitingList[0]
        awaitingList.shift()
        fillExecutionRow(executingRegister)
    }

    else{
        fillExecutionRow(executingRegister)
        if (executingRegister.max_ex_time === 0){
            isExecuting = false
            finishedList.push(executingRegister)
            fillExecutionRow(executingRegister)
            executingRegister = new Register ()
        }
    }

    if (finishedList.length>0) {
        fillFinishedRow(finishedList)
        fillExecutionRow(executingRegister)
    }

    if(awaitingList.length === 0 && isExecuting === false){
        activeLot = false
        totalLots -=1
        document.getElementById("lots-total").innerHTML = `Total lots: ${totalLots}`
    }


}

function fillWaitRow(awaitingList){
    let awaitingTable = ''
    for(let a = 0; a < awaitingList.length; a++){ 
        awaitingTable += `
        <td>Id: ${awaitingList[a].id} </td> 
       <br>
       <td>Name: ${awaitingList[a].name}</td>
       <br>
       <td>Maximum Execution time: ${awaitingList[a].max_ex_time}</td>
       <p>---------------------</p>
       <br>
       `
    }
    document.getElementById("Awaiting").innerHTML = awaitingTable
}

function fillExecutionRow(executingRegister){
    let executingTable = ''
    if(isExecuting) {
    executingTable += `
        <td>Id: ${executingRegister.id} </td> 
        <br>
        <td>Name: ${executingRegister.name}</td>
        <br>
        <td>Maximum Execution time: ${executingRegister.max_ex_time}</td>
        <br> `
    document.getElementById("Execution").innerHTML = executingTable
    }
    else{
        executingTable = ''
        document.getElementById("Execution").innerHTML = executingTable
    }
}


function fillFinishedRow(finishedList){
    let finishedTable = ''
    for(let a = 0; a<finishedList.length; a++){
        finishedTable += ` 
            <td>Id: ${finishedList[a].id} </td> 
            <br>
            <td>Name: ${finishedList[a].name}</td>
            <br>
            <td>Operation: ${finishedList[a].operation} </td>
            <br>
            <p>---------------------</p>`
    }

    document.getElementById("Finished").innerHTML = finishedTable
}

function clearTable() {
    document.getElementById("Awaiting").innerHTML = ''
    document.getElementById("Execution").innerHTML = ''
    document.getElementById("Finish").innerHTML = ''
}

function calcOverallTime() {
    let overallTime = 0
    registers.forEach((register) => {
        overallTime += parseInt(register.max_ex_time)
    })
    document.getElementById("Registers-Overalltime").innerHTML = `Overall time: ${overallTime}`
}


// Clock functions start
var minutesLabel = document.getElementById("timer-minutes")
var secondsLabel = document.getElementById("timer-seconds")
var totalSeconds = 0

function setTime() {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
    if (isExecuting) {
        executingRegister.max_ex_time --
    }
   updateTable()
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } 
    else {
      return valString;
    }
}
// -----------Time functions end------------//