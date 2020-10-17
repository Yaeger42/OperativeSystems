// var self = this
var registers = []
var finishedList = []
var awaitingList = []
var lockedList = []
var executingRegister = new Register()
var isExecuting = false
var activeLot = false
var totalLots = 0
var myInterval = null
var id = 1
var keys = {
    e:69, // The running process will go to the queue
    w:87, //Error - finish the process - error instead of result in finished column
    p:80, //pause 
    c:67 // continue
}
var processes

let reg1 = new Register()
reg1.id = 1
reg1.a = 2
reg1.b = 3
reg1.operation = getOperationsResult(reg1.a, reg1.b, 1)
reg1.max_ex_time = getRandomExTime()
registers.push(reg1)

let reg2 = new Register()
reg2.id = 2
reg2.a = 3
reg2.b = 2
reg2.operation = getOperationsResult(reg2.a, reg2.b, 2)
reg2.max_ex_time = getRandomExTime()
registers.push(reg2)

let reg3 = new Register()
reg3.id = 3
reg3.a = 3
reg3.b = 4
reg3.operation = getOperationsResult(reg3.a, reg3.b, 3)
reg3.max_ex_time = getRandomExTime()
registers.push(reg3)

let reg4 = new Register()
reg4.id = 4
reg4.a = 5
reg4.b = 6
reg4.operation = getOperationsResult(reg4.a, reg4.b, 4)
reg4.max_ex_time = getRandomExTime()
registers.push(reg4)

let reg5 = new Register()
reg5.id = 5
reg5.a = 6
reg5.b = 7
reg5.operation = getOperationsResult(reg5.a, reg5.b, 5)
reg5.max_ex_time = getRandomExTime()
registers.push(reg5)

let reg6 = new Register()
reg6.id = 6
reg6.a = 7
reg6.b = 7
reg6.operation = getOperationsResult(reg6.a, reg6.b, 6)
reg6.max_ex_time = getRandomExTime()
registers.push(reg6)

let reg7 = new Register()
reg7.id = 7
reg7.a = 10
reg7.b = 13
reg7.operation = getOperationsResult(reg7.a, reg7.b, 1)
reg7.max_ex_time = getRandomExTime()
registers.push(reg7)

let reg8 = new Register()
reg8.id = 8
reg8.a = 135
reg8.b = 49
reg8.operation = getOperationsResult(reg8.a, reg8.b, 3)
reg8.max_ex_time = getRandomExTime()
registers.push(reg8)



function sendToAwaitingList() {
   awaitingList.push(executingRegister)
   executingRegister = awaitingList[0]
   awaitingList.shift()
   fillWaitRow(awaitingList)
   fillExecutionRow(executingRegister)
   isExecuting = true
   if (executingRegister.max_ex_time === 0){
        isExecuting = false
        finishedList.push(executingRegister)
        fillExecutionRow(executingRegister)
        executingRegister = new Register ()
    }  
}
// Also finishes the "execution"
function sendProcessToError(){

    if (awaitingList.length === 0 && isExecuting === true) {
        executingRegister.operation = "Error"
        executingRegister.max_ex_time = "Error"
        finishedList.push(executingRegister)
        isExecuting = false
        updateTable()
    }

    if(awaitingList.length > 0 && isExecuting == true){
        executingRegister.operation = "Error"
        executingRegister.max_ex_time = "Error"
        finishedList.push(executingRegister)
        executingRegister = awaitingList [0]
        awaitingList.shift()
        fillFinishedRow(finishedList)
        fillWaitRow(awaitingList)
        fillExecutionRow(executingRegister)
        isExecuting = true 
    }
    updateTable()
}

function getRandomExTime(min = 7, max = 16){
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getOperationsResult(a, b, option) {

    let result = 0
    if (option === 1){
        result = `Sum = ${add(a, b)}`
    }
    else if (option === 2){
        result = `Multiplication = ${multiply(a, b)}`
    }

    else if (option === 3){
        result = `Subtract = ${subtract(a, b)}`
    }

    else if (option === 4){
        if (b === 0) {
            alert("Division by 0 is not allowed")
        }
        else{
            result = `Division = ${divide(a, b) }`
        }
    }

    else if (option === 5){
        result = `Modulo: ${modulo(a, b)}`
    }

    else if (option === 6){
        result = `Power ${power(a, b)}`
    }
    return result
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
    if(isExecuting != true && awaitingList.length > 0){
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
        if(totalLots === 0){
            totalLots = 0
        }
        else{
            totalLots-=1
        }
        document.getElementById("lots-total").innerHTML = `Total lots: ${totalLots}`
        if(finishedList.length === processes) {
            clearInterval(myInterval)
        }
    }

}


// -----------Fill rows functions ----------- //
function fillWaitRow(awaitingList){
    let awaitingTable = ''
    for(let a = 0; a < awaitingList.length; a++){ 
        awaitingTable += `
        <td>Id: ${awaitingList[a].id} </td> 
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
            <td>Operation: ${finishedList[a].a}    ${finishedList[a].b} ${finishedList[a].operation}    </td>
            <br>
            <p>---------------------</p>` // Modified the way it showed the operations result to match requirement
    }

    document.getElementById("Finished").innerHTML = finishedTable
}

function clearTable() {
    document.getElementById("Awaiting").innerHTML = ''
    document.getElementById("Execution").innerHTML = ''
    document.getElementById("Finish").innerHTML = ''
}

// -----------Fill rows functions end ----------- //

function calcOverallTime() {
    let overallTime = 0
    registers.forEach((register) => {
        overallTime += parseInt(register.max_ex_time)
    })
    document.getElementById("Registers-Overalltime").innerHTML = `Overall time: ${overallTime}`
}


// -----------Clock functions start-----------//
var minutesLabel = document.getElementById("timer-minutes")
var secondsLabel = document.getElementById("timer-seconds")
var totalSeconds = 0
var timer_is_executing = false

function setTime() {
    timer_is_executing = true
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

function stopTimer() {
    if (timer_is_executing) {
        timer_is_executing = false
        clearInterval(myInterval)
        myInterval = null
    }
}

function continueTimer() {
    if(!timer_is_executing) {
        timer_is_executing = true
        myInterval = setInterval(setTime, 1000)
    }
}

// -----------Time functions end------------//

// -----------Main Function ----------- //
function totalForms() {

    processes = parseInt(document.getElementById("processes").value )

    if (processes % 4  === 0){
        totalLots = processes/4
    }
    else{
        totalLots = parseInt((processes/4) +1)
    }

    if (registers.length === processes) {
        document.getElementById("register").style.display="none";
        document.getElementById("processDiv-p").style.display="none";
        document.getElementById("processDiv").style.display = "none";
        calcOverallTime()
        document.getElementById("timer").style.visibility = "visible";
        document.getElementById("lots-total").style.visibility = "visible"
        document.getElementById("lots-total").innerHTML = `Total lots: ${totalLots}`
        document.getElementById("process-table").style.visibility="visible"
        myInterval = setInterval(setTime, 1000)
    }
    // Detecting key presses
    document.onkeypress = function (event) {
        event = event || window.event
        switch(event.keyCode){
    
            case keys.e:
                console.log("E was pressed - Process was send to the Queue")
                sendToAwaitingList()
                break
            
            case keys.w:
                console.log ("W was pressed - Process was send to error")
                sendProcessToError()
                break;
    
            case keys.p:
                console.log("P was pressed - Pause")
                stopTimer(myInterval)
                break
    
            case keys.c:
                console.log("C was pressed - Continue")
                continueTimer()
                break
        }
    }
    
}
// ----------- Main function End -----------//