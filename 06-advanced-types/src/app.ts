type Admin = {
    name: string;
    privileges: string[];
};

type Employee = { name: string; startDate: Date };

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Chris',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

const add = (a: Combinable, b: Combinable) => {
    if (typeof a === 'string' || typeof b === 'string') // Type Guard
        return a.toString() + b.toString();
    return a + b;
}

type UnknownEmployee = Employee | Admin;

const printEmployeeInfo = (emp: UnknownEmployee) => {
    console.log('Name: ' + emp.name);

    if ('privileges' in emp)
        console.log('Privileges: ' + emp.privileges);

    if ('startDate' in emp)
        console.log('Start date: ' + emp.startDate);
}

printEmployeeInfo(e1);
printEmployeeInfo({name: 'Abc', startDate: new Date()});


