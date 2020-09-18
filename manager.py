from model import Register
from model import multiply, add, divide, multiply, power, residue, subtract
from time import sleep

registers = []


def time_calculation(remaining_time):
    global_time = remaining_time
    current_process_time = 0
    time.sleep(current_process_time) 
    



def isIdValid(id:int = 1):
    if not registers:
        return True
    else:
        for x in registers:
            if x.id == id:
                return False
            else: 
                return True


def operations_menu():
    print("1. Addition \n 2. Subtract \n 3. Multiply(*) \n 4. Divide(/) \n 5. Power(**) \n 6. Modulo(%)")
    option = int(input("Enter the number of operation you'd like to do: "))
    

    if option == 1:
        a = int(input("Enter the first number: "))
        b = int(input("Enter the second number: "))
        res = add(a, b)   
    elif option ==  2:
        a = int(input("Enter the first number: "))
        b = int(input("Enter the second number: "))
        res = subtract(a, b)
    elif option ==  3:
        a = int(input("Enter the first number: "))
        b = int(input("Enter the second number: "))
        res = multiply(a, b)
    elif option ==  4:
        a = int(input("Enter the first number: "))
        b = int(input("Enter the second number: "))
        res = divide(a, b)
    elif option ==  5:
        a = int(input("Enter the first number: "))
        b = int(input("Enter the second number: "))
        res = power(a, b)

    elif option ==  6:
        a = int(input("Enter the first number: "))
        b = int(input("Enter the second number: "))
        res = residue(a, b)
    
    return res

def register_menu():
    processes = int(input("Enter the number of processes: "))
    lot_number = processes/4
    remaining = residue(processes, 4)
    total_lots = int(lot_number + remaining)
    completed_lots = 0
    completed_processes = 0
    remaining_processes = processes
    id = isIdValid(1)
    while completed_lots != total_lots and remaining_processes != 0:
        for i in range(0, processes):
            id = int(input("Enter the id: "))
            if isIdValid(id):
                name = input("Enter the name: ")
                operation = operations_menu()
                max_ex_time = int(input("Enter the maxmimum operation time: "))
                register = Register(id=id, name=name, operation=operation, max_ex_time=max_ex_time)
                registers.append(register)
        remaining_processes -=1
        completed_processes +=1 
    if completed_processes == 4:
        completed_lots += 1
        completed_processes = 0
    
        for x in registers:
            print(f'Id: {x.id}')
            print(f'Name: {x.name}') 
            print(f'Operation: {x.operation}')
            print(f'TME: {x.max_ex_time}')
            print("*------*" *5)
        print(f"Initial processes: {processes}")
        print(f'Remaining processes: {remaining_processes}')
        print(f'Total lots: {total_lots}')
        print(f'Completed lots: {completed_lots}')
        print(f'Completed processes: {completed_processes}')

    if completed_lots == total_lots:
        break
    


register_menu()
