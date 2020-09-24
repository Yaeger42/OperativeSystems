// var self = this
var registers = []
var finishedList = []
var awaitingList = []


function isIdValid (id) {
    isValid = false
    if (registers.length === 0){
        isValid = true
        return isValid
    }
    else{
        registers.forEach(elem => {
            if(elem.id === id){
                isValid = false
            }
            else{
                isValid = true
            }
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


//procesos / 4 = lotes1
//procesos % 4 = lotes2
//lotesTotal = lotes1 + lotes2




function totalForms() {
    let processes = parseInt(document.getElementById("processes").value )
    let a = parseInt(document.getElementById("a").value)
    let b = parseInt(document.getElementById("b").value)
    let x = parseInt(document.getElementById("operation").value)
    let totalLots = 0
    if (processes % 4  == 0){
        totalLots = processes/4
    }
    else{
        totalLots = parseInt((processes/4) +1)
    }
    if((x === 4 || x===5) && (a === 0 || b === 0)){
        alert("Division by 0 is not allowed")
        return
    }
    
    id = parseInt(document.getElementById("regId").value)
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
        updateTable()
        calcOverallTime()
        document.getElementById("timer").style.visibility = "visible";
        document.getElementById("lots-total").style.visibility = "visible"
        document.getElementById("lots-total").innerHTML = `Total lots: ${totalLots}`
        document.getElementById("process-table").style.visibility="visible"
        setInterval(setTime, 1000)
    }
    
}
//3 en espera
//1 en ejecucion
/*
function showRegisters() {
    let result = ''
    let counter = 1
    let executionRegister = new Register()
    //document.getElementById("RemainingProcesses").innerHTML = result
   for(let i =0; i < registers.length; i++){
       result +=`
       <td>Id: ${registers[i].id} </td> 
       <br>
       <td>Name: ${registers[i].name}</td>
       <br>
       <td>Operation: ${registers[i].operation} </td>
       <br>
       <td>Maximum Execution time: ${registers[i].max_ex_time}</td>
       <p>---------------------</p>
       <br>`
   }

}
*/



function updateTable (){
    //var awaitingTable = ''
    var isExecuting = false;
    var executingTable = ''
    let executingRegister = new Register()
    
    while(awaitingList.length < 4 && registers.length > 0){
        awaitingList.push(registers[0])
        registers.shift()
    }
    
    fillWaitRow(awaitingList)

    //document.getElementById("Awaiting").innerHTML = awaitingTable
    if(isExecuting != true){
        isExecuting = true
        executingRegister = awaitingList[0]
        awaitingList.shift()
        let miPrimeraPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                    resolve(executingRegister.max_ex_time -= 1) // ¡Todo salió bien!
                }, 1000);
        });
        while(executingRegister.max_ex_time != 0){
            fillExecutionRow(executingRegister)
            executeProcess(executingRegister.max_ex_time)
            miPrimeraPromise.then(
                executingRegister.max_ex_time = executeProcess(executingRegister.max_ex_time)
            )
            .catch(
                (reason) => {
                    console.log('Manejar promesa rechazada (' + reason + ') aquí.')
                });
        }
    }

}

function executeProcess(time){
    return time-1
}

function fillWaitRow(awaitingList){
    let awaitingTable = ''
    for(let a = 0; a<awaitingList.length; a++){ 
        awaitingTable += `
        <td>Id: ${awaitingList[a].id} </td> 
       <br>
       <td>Name: ${awaitingList[a].name}</td>
       <br>
       <td>Operation: ${awaitingList[a].operation} </td>
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
    executingTable += `
        <td>Id: ${executingRegister.id} </td> 
        <br>
        <td>Name: ${executingRegister.name}</td>
        <br>
        <td>Operation: ${executingRegister.operation}</td>
        <br>
        <td>Maximum Execution time: ${executingRegister.max_ex_time}</td>
        <br> `
    document.getElementById("Execution").innerHTML = executingTable
}


function fillFinishedRow(finishedList){
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




// Clock functions start


function calcOverallTime() {
    let overallTime = 0
    registers.forEach((register) => {
        overallTime += parseInt(register.max_ex_time)
    })
    document.getElementById("Registers-Overalltime").innerHTML = `Overall time: ${overallTime}`
}

var minutesLabel = document.getElementById("timer-minutes")
var secondsLabel = document.getElementById("timer-seconds")
var totalSeconds = 0
function setTime() {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
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
