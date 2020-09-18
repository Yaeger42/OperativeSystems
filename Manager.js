import {Register} from './javaScriptCode/Processes'
import {multiply, add, subtract, divide, modulo, power} from './javaScriptCode/Processes'
const doc = document.getElementById("processes")


register = Register
registers = []

function isIdValid(id = 1){
    if (registers == null){
        return True
    }
    else{
        for(x = 0; x < registers.length; x++){
            if (x.id == id) {
                return False
            }
            else{
                return True
            }
        }
    }
}


function operationsMenu(){
    let processes = parseInt(doc.value)
    document.write("Hi ")
}