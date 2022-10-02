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
    outputName?: string; // might exist - optional
}

interface Greetable extends Named { // interfaces could inherit from multiple Interfaces!
    greet(phrase: string): void;
}

class Person implements Greetable {
    outputName?: string;

    constructor(public name: string, public age: number, outputName?: string) {
        this.outputName = outputName;
    }

    greet(phrase: string) {
        if (this.outputName)
            console.log(phrase + ' ' + this.outputName);
        else

            console.log(phrase + ' ' + this.name);
    }
}

let user1: Greetable;
let user2: Greetable;

user1 = new Person('Chris', 41);
// user1.name = 'a' // not allowed because of readonly
user2 = new Person('Chris2', 41, 'Aber Hallo');

user1.greet('Hi there - my name is');
user2.greet('Hi there - my name is');
