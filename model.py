class Register:
    
    def __init__(self, id:int, name, operation, max_ex_time:int, a:int = None, b:int = None ):
        self.id = id
        self.name = name
        self.operation = operation
        self.max_ex_time = int(max_ex_time)

def multiply(a, b):
    return a * b

def add(a, b):
    return a + b

def subtract(a, b):
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
        return int(a % b)
    except ZeroDivisionError:
        print("No division by 0 is allowed")