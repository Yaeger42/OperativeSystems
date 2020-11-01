class Register {
    constructor(id, operation, max_ex_time, a=null, b=null, finishedTime = null, blockedTime = 7, 
        returnTime = null, responseTime = null, startTime = null, serviceTime,
        awaitingTime = null){
        this.id = id
        this.operation = operation
        this.max_ex_time = parseInt(max_ex_time)
        this.finishedTime = finishedTime
        this.blockedTime = blockedTime
        this.responseTime = responseTime
        this.startTime = startTime
        this.serviceTime = serviceTime
        this.returnTime = returnTime
        this.awaitingTime = awaitingTime
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
