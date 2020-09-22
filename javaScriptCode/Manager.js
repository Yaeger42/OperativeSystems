// var self = this
var registers = []
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

function getOperationsResult() {
    let a = parseInt(document.getElementById("a").value)
    let b = parseInt(document.getElementById("b").value)
    let x = parseInt(document.getElementById("operation").value)
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
        result = `Division = ${divide(a, b) }`
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
    register = new Register ()
    id = parseInt(document.getElementById("regId").value)
    if (isIdValid(id) === true) {
        register.id = id
        register.name = document.getElementById("name").value
        register.operation = getOperationsResult()
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
        showRegisters()
        calcOverallTime()
        document.getElementById("timer").style.visibility = "visible";
        setInterval(setTime, 1000)
    }
    
}

function showRegisters() {
    let result = ''
    let counter = 1
    registers.forEach(function(register){
        result += `
        <p>Program counter: ${counter}</p>
        <li>Id: ${register.id} </li> 
        <li>Name: ${register.name}</li>
        <li>Operation: ${register.operation} </li>
        <li>Maximum Execution time: ${register.max_ex_time}</li>
        <br>`
        counter ++
    })
    document.getElementById("Registers-List").innerHTML = result
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