class Department {
    name: string;//name:string ='DEFAULT';

    constructor(n: string) {
        this.name = n;
    }
}

const accounting = new Department('Accounting');

console.log(accounting);
