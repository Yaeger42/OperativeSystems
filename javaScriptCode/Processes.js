class Register {
    constructor(id, name, operation, max_ex_time, a=null, b=null){
        this.id = id
        this.name = name
        this.operation = operation
        this.max_ex_time = max_ex_time
    }
}

function multiply(a, b){
        return this.a * this.b
    }

function add(a, b){
        return this.a + this.b
    }

function subtract(a, b){
        return this.a - this.b
    }

function divide(a, b){
        if(this.b === 0){
            console.log('Division by 0 is not allowed.')
            return null
        }
        else {
            return this.a / this.b
        }
    }

function modulo(a, b){
        if(this.b === 0){
            console.log('Division by 0 is not allowed.')
            return null
        }
        else {
            return this.a % this.b
        }
    }

function power(a, b) {
        return Math.pow(this.a, this.b)
    }
