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

// overload function (not really possible with arrow functions
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') // Type Guard
        return a.toString() + b.toString();
    return a + b;
}

console.log(add(1, 2));
const result = add(1, 5);
const result2 = add("a", "b");
const result3 = add("a", 1);

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


class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Truck driving');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo', amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();
    if ('loadCargo' in vehicle)
        vehicle.loadCargo(1000);
    // Better: with classes instanceof is possible (not with interfaces (they are not compiled to js))
    if (vehicle instanceof Truck)
        vehicle.loadCargo(500);
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions - working with object types

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    groundSpeed: number;
}

type Animal = Bird | Horse; // Discriminated union because of one common property which describes

const moveAnimal = (animal: Animal) => {
    // if (animal instanceof Bird) // not possible with interface
    // if ('flyingSpeed' in animal) // possible
    //     console.log('Moving with speed: ', animal.flyingSpeed);
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.groundSpeed;
    }
    console.log('Moving with speed: ', speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});


// const paragraph = document.querySelector('p');
// const paragraph = document.getElementById('message-output');

// TypeCast
// const userInput = <HTMLInputElement>document.getElementById('user-input')!;
// const userInput = document.getElementById('user-input')! as HTMLInputElement; // Better because no clash with react
const userInput = document.getElementById('user-input');
if (userInput)
    (userInput as HTMLInputElement).value = 'Hi there';

// Index Types
interface ErrorContainer { //{email:'not a valid email', username:'Must start with a char'}
    // id: string

    [prop: string]: string; // i don't know the name of the property, but it is a string, and it's value is as well a string
}

const errorBag: ErrorContainer = {
    email: 'not a valid email!',
    username: 'Must start with a capital character!'
};

