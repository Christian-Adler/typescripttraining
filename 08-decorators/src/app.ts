// function Logger(constructor: Function) { // class decorator runs when class is defined (not by instantiation)
//     console.log('Logging...');
//     console.log(constructor);
// }

// As factory Function
function Logger() {
    return function (constructor: Function) {
        console.log('Logging...');
        console.log(constructor);
    }
}

// @Logger
@Logger()
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person obj...');
    }

}

const pers = new Person();

console.log(pers);
