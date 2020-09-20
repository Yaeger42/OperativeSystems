import {Register} from '../javaScriptCode/Processes'

const doc = document.getElementById("processes")


register = new Register ()
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

let  result = document.getElementById("processes")
let b = document.getElementById("getProcess")
b.addEventListener("click")
result.innerHTML = `Hi ${result}` 