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

function getOperationsResult(){
    let a = parseInt(document.getElementById("a").value)
    let b = parseInt(document.getElementById("b").value)
    let x = parseInt(document.getElementById("operation").value)
    let result = 0
    if (x === 1){
        result = add(a, b)
    }
    else if (x === 2){
        result = multiply(a, b)
    }

    else if (x === 3){
        result = subtract(a, b)
    }

    else if (x === 4){
        result = divide(a, b) 
    }

    else if (x === 5){
        result = modulo(a, b)
    }

    else if (x === 6){
        result = power(a, b)
    }
    return result
}




function totalForms () {
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
        showRegisters()
    }
    
}

function showRegisters (){
    registers.forEach(elem => {
        p = document.getElementById("RegistersForms")
        p.innerHtml + elem.id
        p.innerHtml += elem.name 
    })
}

