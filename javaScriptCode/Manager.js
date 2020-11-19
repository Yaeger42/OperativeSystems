// var self = this
var registers = []
var finishedList = []
var awaitingList = []
var blockedList = []
var executingRegister = new Register()
var isExecuting = false
var activeLot = false
var totalLots = 0
var myInterval = null
var id = 1
var isBlocked = false
var globalSeconds = 0
var keys = {
    e: 69, // The running process will go to the queue
    w: 87, //Error - finish the process - error instead of result in finished column
    p: 80, //pause 
    c: 67, // continue
    n: 78,
    t: 84
}
var processes
var bcpActive = false // Flag to check BCP
var globalQuantum 
var quantumCounter

var globalId = 0

// ------------------------Object time calculations start here ------------------------ //
// Calculates de return time based on the formula:
//Return time: Finished time - Entry time
function returnTime(startTime, finishedTime) {
    rTime = null
    if(startTime != null && finishedTime != null){
        rTime = finishedTime - startTime
        return rTime
    }
    else{
        rTime = "Error"
        return rTime
    }
}

// Calculates de awaiting time based on the formula:
//Awaiting time: ReturnTime - Service Time
function awaitingTime(returnTime, serviceTime){
    awTime = null
    if(returnTime != null && serviceTime != null) {
        awTime = returnTime - serviceTime
        return awTime
    }

}

//When the process enters to ready list until it's attended for the first time

// ------------------------Object time calculations end here ------------------------ //

//Generates a Random Operation number to choose between 6 options
function generateRandomOperation(min = 1, max = 6){
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Generates a randomNumber to fill reg.a and reg.b values
function generateRandomNumber(min = 5, max = 15){
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Generates random registers based on user input number of registers
function generateRegisters(registersNumber) {
    for(let i = 1; i <= registersNumber; i++) {
        reg = new Register()
        reg.id = i
        globalId +=1  
        reg.a = generateRandomOperation()
        reg.b = generateRandomNumber()
        reg.operation = getOperationsResult(reg.a, reg.b, generateRandomOperation())
        reg.max_ex_time = getRandomExTime()
        reg.serviceTime = reg.max_ex_time
        registers.push(reg)
    }
}


function generateRegister() {
    globalId += 1
    let i = awaitingList.length - 1
    var reg = new Register()
    reg.id = globalId
    reg.a = generateRandomOperation()
    reg.b = generateRandomNumber()
    reg.operation = getOperationsResult(reg.a, reg.b, generateRandomOperation()) 
    reg.max_ex_time = getRandomExTime()
    reg.serviceTime = reg.max_ex_time
    registers.push(reg)
    processes +=1
}

function showBcp () {
    let awaitingTable  = ''
    let executingTable = ''
    if(!bcpActive) {
        bcpActive = true
        stopTimer()
        if(awaitingList.length > 0){
            for(let i = 0; i < awaitingList.length; i++){
            awaitingTable += ` 
                <td>Id: ${awaitingList[i].id} </td> 
                <br>
                <td>Operation: ${awaitingList[i].a}    ${awaitingList[i].b} ${awaitingList[i].operation}    </td>
                <br>
                <td>Start Time: ${awaitingList[i].startTime} </td>
                <br>
                <td>Service Time: ${awaitingList[i].serviceTime} </td>
                <br>
                <p>---------------------</p>`
            } 
        document.getElementById("Awaiting").innerHTML = awaitingTable
        }
        if(isExecuting) {
            executingTable = `
                <td>Id: ${executingRegister.id} </td>
                <br>
                <td>Operation: ${executingRegister.a}  ${executingRegister.b} ${executingRegister.operation}</td>
                <br>
                <td>Service time: ${executingRegister.serviceTime} </td>
                <br>
                <td>Start time: ${executingRegister.startTime} </td>
                <br>
                <td>Remaining time: ${executingRegister.max_ex_time}
                <p>---------------------</p>`

            document.getElementById("Execution").innerHTML = executingTable
        }
    }
}


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

function sendToAwaitingFromBlocked(blockedElement) {
    blockedElement.blockedTime = 7
    awaitingList.push(blockedElement)
    blockedList.shift()      
}


function sendToBlockedList() {
    isBlocked = true
    blockedList.push(executingRegister)
    if(awaitingList.length > 0){
        executingRegister = awaitingList[0]
        awaitingList.shift()
    }
    else{
        isExecuting = false
        executingRegister = null
    }
    updateTable()
}



// Also finishes the "execution"
function sendProcessToError() {

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
        executingRegister.finishedTime = "Error"
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

// -----------Fill rows functions ----------- //
function fillWaitRow(awaitingList){
    let awaitingTable = ''
    for(let a = 0; a < awaitingList.length; a++){
        // If the start time is null, assign globalSeconds value to startTime
        if(awaitingList[a].startTime == null){
            awaitingList[a].startTime = globalSeconds
        }
        awaitingTable += `
        <td>Id: ${awaitingList[a].id} </td> 
        <br>
        <td>Maximum Execution time: ${awaitingList[a].max_ex_time}</td>
        <br>
        <td>Start Time: ${awaitingList[a].startTime}</td>
        <p>---------------------</p>
        <br> `
    }
    document.getElementById("Awaiting").innerHTML = awaitingTable
}

function fillExecutionRow(executingRegister){
    let executingTable = ''
    if(isExecuting) {
        if(executingRegister.responseTime == null){
            executingRegister.responseTime = executingRegister.startTime + globalSeconds
        }
        executingTable += `
        <td>Id: ${executingRegister.id} </td> 
        <br>
        <td>Maximum Execution time: ${executingRegister.max_ex_time}</td>
        <br> 
        <td>Response time:${executingRegister.responseTime}`
        document.getElementById("Execution").innerHTML = executingTable
    }
    else{
        executingTable = ''
        document.getElementById("Execution").innerHTML = executingTable
    }
}

//<td>Finished time: ${finishedList[a].finishedTime = finishedTime(myInterval)}

function fillFinishedRow(finishedList){
    let finishedTable = ''
    for(let a = 0; a<finishedList.length; a++){
        // If the finished time is null, assign globalSeconds value to finishedTime
        if(finishedList[a].finishedTime == null){
            finishedList[a].finishedTime = globalSeconds
        }
        if (finishedList[a].max_ex_time != 'Error'){
        finishedTable += ` 
            <td>Id: ${finishedList[a].id} </td> 
            <br>
            <td>Operation: ${finishedList[a].a}    ${finishedList[a].b} ${finishedList[a].operation}    </td>
            <br>
            <td>Service Time: ${finishedList[a].serviceTime} </td>
            <br>
            <td>Start Time: ${finishedList[a].startTime} </td>
            <br>
            <td>Finished Time: ${finishedList[a].finishedTime} </td>
            <br>
            <td>Return Time: ${finishedList[a].returnTime = returnTime(finishedList[a].startTime, finishedList[a].finishedTime)}</td>
            <br>
            <td>Awaiting Time: ${finishedList[a].awaitingTime = awaitingTime(finishedList[a].returnTime, finishedList[a].serviceTime)}</td>
            <br>
            <td>Response Time: ${finishedList[a].responseTime} </td>
            <br>
            <p>---------------------</p>` // Modified the way it showed the operations result to match requirement
        }
        else{
            finishedTable += ` 
            <td>Id: ${finishedList[a].id} </td> 
            <br>
            <td>Operation: ${finishedList[a].a}    ${finishedList[a].b} ${finishedList[a].operation}    </td>
            <br>
            <td>Start time: ${finishedList[a].startTime} </td>
            <td>Finished time: ${finishedList[a].finishedTime} </td>
            <p>---------------------</p>` // Modified the way it showed the operations result to match requirement
        }
    document.getElementById("Finished").innerHTML = finishedTable
    }
}

function fillBlockedList(blockedList) {
    let blockedTable = ''
    if(isBlocked){
        for(let a = 0; a < blockedList.length; a ++) {
            blockedTable += `
            <td>Id: ${blockedList[a].id}</td>
            <br>
            <td>Maximum Execution time: ${blockedList[a].max_ex_time}
            <td>Blocked time: ${blockedList[a].blockedTime}
            <p>---------------------</p>
            <br>`
        }
        document.getElementById("Blocked").innerHTML = blockedTable
    }
    else{
        document.getElementById("Blocked").innerHTML = blockedTable
    }
}



function clearTable() {
    document.getElementById("Awaiting").innerHTML = ''
    document.getElementById("Execution").innerHTML = ''
    document.getElementById("Finish").innerHTML = ''
}

// -----------Fill rows functions end ----------- //

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
        if(isExecuting === true ){
            if (executingRegister.max_ex_time === 0){
                isExecuting = false
                finishedList.push(executingRegister)
                fillExecutionRow(executingRegister)
                executingRegister = null
                new Register ()
            }
        }
    }

    if (finishedList.length>0) {
        fillFinishedRow(finishedList)
        fillExecutionRow(executingRegister)
    }

    if(blockedList.length > 0) {
        fillBlockedList(blockedList)
    }
    else{
        fillBlockedList(blockedList)
    }

    if(awaitingList.length === 0 && isExecuting === false){
        if(finishedList.length === processes) {
            clearInterval(myInterval)
        }
        activeLot = false
        if(totalLots === 0){
            totalLots = 0
        }
        else{
            totalLots-=1
        }
        //document.getElementById("lots-total").innerHTML = `Total lots: ${totalLots}`

    }

}


function calcOverallTime() {
    let overallTime = 0
    registers.forEach((register) => {
        overallTime += parseInt(register.max_ex_time)
    })
    document.getElementById("Registers-Overalltime").innerHTML = `Overall time: ${overallTime}`
}

function calculateQuantum(quantum) {
    quantumCounter --
    document.getElementById("Quantum-p-counter").innerHTML = `Current quantum: ${quantumCounter}`
    if(quantumCounter === 0) {
        awaitingList.push(executingRegister);
        executingRegister = awaitingList[0]
        awaitingList.shift()
        quantumCounter = globalQuantum
        updateTable()
    }
}




// -----------Clock functions start-----------//
var minutesLabel = document.getElementById("timer-minutes")
var secondsLabel = document.getElementById("timer-seconds")
var totalSeconds = 0
var timer_is_executing = false

function setTime() {
    timer_is_executing = true
    ++totalSeconds
    ++globalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
    if (isExecuting) {
        executingRegister.max_ex_time --
        calculateQuantum(quantumCounter)
    }
    if(isBlocked) {
        for(let i = 0; i < blockedList.length; i++) {
            blockedList[i].blockedTime --
            if(blockedList[i].blockedTime === 0){
                sendToAwaitingFromBlocked(blockedList[i])
            }
        }
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
        bcpActive = false
        myInterval = setInterval(setTime, 1000)
    }
}

// -----------Time functions end------------//

// -----------Main Function ----------- //
function totalForms() {

    processes = parseInt(document.getElementById("processes").value )
    globalQuantum = parseInt(document.getElementById("quantums").value)
    quantumCounter = globalQuantum
    document.getElementById("Quantum-P-value").innerHTML = `Quantum value: ${globalQuantum}`
    calculateQuantum(quantumCounter)
    

    if (processes % 4  === 0){
        totalLots = processes/4
    }
    else{
        totalLots = parseInt((processes/4) +1)
    }
    generateRegisters(processes)

    if (registers.length === processes) {
        document.getElementById("register").style.display="none"
        document.getElementById("processDiv-p").style.display="none"
        document.getElementById("processDiv").style.display = "none"
        document.getElementById("quantumsDiv").style.display = "none"
        calcOverallTime()
        document.getElementById("timer").style.visibility = "visible"
        document.getElementById("process-table").style.visibility="visible"
        document.getElementById("quantumDisplay").style.visibility="visible"
        myInterval = setInterval(setTime, 1000)
    }
    // Detecting key presses
    document.onkeypress = function (event) {
        event = event || window.event
        switch(event.keyCode){
    
            case keys.e:
                console.log("E was pressed - Process was send to the blocked queue")
                sendToBlockedList()
                break
            
            case keys.w:
                console.log ("W was pressed - Process was send to finished processes due to an error")
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
            
            case keys.n:
                console.log("N was pressed - New register added")
                generateRegister()
                break

            case keys.t:
                console.log("T was pressed - Showing BCPs")
                showBcp()
                break
        }
    }
    
}