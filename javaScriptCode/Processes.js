class Register {
    constructor(id, name, operation, max_ex_time, a=null, b=null){
        this.id = id
        this.name = name
        this.operation = operation
        this.max_ex_time = parseInt(max_ex_time)
    }
}

function multiply(a, b){
        return a * b
}

function add(a, b){
        return a + b
}

function subtract(a, b){
        return a - b
}

function divide(a, b){
        if(b === 0){
            console.log('Division by 0 is not allowed.')
            return null
        }
        else {
            return a / b
        }
    }

function modulo(a, b){
    if(b === 0){
        console.log('Division by 0 is not allowed.')
        return null
    }
    else {
        return a % b
    }
}

function power(a, b) {
    return Math.pow(a, b)
}
