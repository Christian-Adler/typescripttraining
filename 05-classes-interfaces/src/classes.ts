abstract class Department {
    // private id: string;
    // private name: string;//name:string ='DEFAULT';
    protected employees: string[] = [];

    // constructor(n: string) {
    //     this.name = n;
    // }
    // implicit constructor - fields are generated
    constructor(protected readonly id: string, public name: string) {
    }

    static createEmployee(name: string) {
        return {name};
    }

    abstract describe(this: Department): void;

//     {
//     // console.log(`Department (${this.id}) ${this.name}`);
// }

    addEmployee(employee
                    :
                    string
    ) {
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

    describe(): void {
        console.log(`IT-Department (${this.id}) ${this.name} ${this.admins}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error('no report found.')
    }

    set mostRecentReport(text: string) {
        if (!text) throw new Error('Please enter a valid report!')
        this.addReport(text);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance)
            return AccountingDepartment.instance;
        // Geht genauso: this in static ist die Klasse
        // if (this.instance)
        //     return this.instance;
        AccountingDepartment.instance = new AccountingDepartment('id2', []);
        return AccountingDepartment.instance;

    }

    describe() {
        console.log(`AccountingDepartment -ID (${this.id})`);
    }

    addEmployee(employee: string) {
        if (employee.length === 0) return;
        this.employees.push(employee); //
        super.addEmployee(employee); // if employees is private
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('And');
console.log(employee1);

const it = new ITDepartment('id', ['Admin']);
console.log(it);
it.describe();

const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = 'ABC';
accounting.addReport('Some test');
console.log(accounting.mostRecentReport);
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
