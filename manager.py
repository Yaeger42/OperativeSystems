from model import Register
registers = []

def isIdValid(id):
    if not registers:
        return True
    else:
        for x in registers:
            if x.id == id:
                return False
            else: 
                return True

def lotSize(r = []):
    max_size = 4
    lot_size = len(r)
    new_lot = []
    if lot_size > max_size:
        new_lot_size = int(lot_size / max_size)


for i in range(1, 3):
    id = int(input("Enter the id: "))
    if isIdValid(id):
        name = input("Enter the name: ")
        operation = str(input("Enter the operation to do (+ * / ** %): "))
        max_ex_time = int(input("Enter the maxmimum operation time: "))
        register = Register(id=id, name=name, operation=operation, max_ex_time=max_ex_time)
        registers.append(register)
    else:
        print(f'Error: {id} already exists')


for x in registers:
    print(f'Id: {x.id}')
    print(f'Name: {x.name}') 
    print(f'Operation: {x.operation}')
    print(f'TME: {x.max_ex_time}')
    print("*" *5)