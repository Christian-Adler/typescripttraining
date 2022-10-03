// function Logger(constructor: Function) { // class decorator runs when class is defined (not by instantiation)
//     console.log('Logging...');
//     console.log(constructor);
// }

// As factory Function
function Logger(logString: string) {
    return function (constructor: Function) {
        // console.log('Logging...');
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function (_: Function) { // Underscore _ tells TS that I know there is an argument - but I don't use it
        const hookEl = document.getElementById(hookId);
        if (hookEl) hookEl.innerHTML = template;
    };
}

// @Logger
// @Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Obj</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person obj...');
    }

}

const pers = new Person();

console.log(pers);
