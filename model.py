class Register:
    
    def __init__(self, id:int, name, operation, max_ex_time:int ):
        self.id = id
        self.name = name
        self.operation = operation
        self.max_ex_time = int(max_ex_time)
        


def multiply(a, b):
    return a * b

def sum(a, b):
    return a + b

def substract(a, b):
    return a - b 

def power(a, b):
    return a ** b 

def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
            print("No division by 0 is allowed")

def residue(a, b):
    try:
        return a % b
    except ZeroDivisionError:
        print("No division by 0 is allowed")



#x = Register("Edgar", 15, 1)

#print(x.name)
#print(x.max_ex_time)