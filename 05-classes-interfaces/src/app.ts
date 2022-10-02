// custom Function type
// type AddFn = (a: number, b: number) => number;

// with interface the same as Function Type
interface AddFn {
    (a: number, b: number): number; // anonymous function def
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};

interface Named {
    readonly name: string;
}

interface Greetable extends Named { // interfaces could inherit from multiple Interfaces!
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(public name: string, public age: number) {
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}

let user1: Greetable;

user1 = new Person('Chris', 41);
// user1.name = 'a' // not allowed because of readonly

user1.greet('Hi there - my name is');
