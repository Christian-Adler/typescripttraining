class Department {
    // private id: string;
    // private name: string;//name:string ='DEFAULT';
    private employees: string[] = [];

    // constructor(n: string) {
    //     this.name = n;
    // }
    // implicit constructor - fields are generated
    constructor(private readonly id: string, public name: string) {
    }

    describe(this: Department) {
        console.log(`Department (${this.id}) ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }
}

class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

const it = new ITDepartment('id', ['Admin']);
console.log(it);
const accounting = new AccountingDepartment('id', []);

accounting.addReport('Some test');
accounting.printReports();

console.log(accounting);

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
