class Department {
    name: string;//name:string ='DEFAULT';
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log('Department: ' + this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting = new Department('Accounting');

// console.log(accounting);

accounting.addEmployee("Chris");
accounting.addEmployee("Max2");

// no longer allowed because of private
// console.log(accounting.employees);
// accounting.employees.push('Test');
// accounting.employees[2] = 'Test2';

accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = {describe: accounting.describe};
// accountingCopy.describe(); // prints undefinded  - because "this" is the accountingCopy Object which has no name property
// By adding this: Pseudoparameter an error is enforced
