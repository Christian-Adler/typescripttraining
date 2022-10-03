// function Logger(constructor: Function) { // class decorator runs when class is defined (not by instantiation)
//     console.log('Logging...');
//     console.log(constructor);
// }

// As factory Function
function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function (constructor: Function) {
        // console.log('Logging...');
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function (constructor: any) { // Underscore _ tells TS that I know there is an argument - but I don't use it
        console.log('Rendering template...');
        const p = new constructor();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    };
}

// @Logger
// Order of the decorators is important (bottom up)! See console
@WithTemplate('<h1>My Person Obj</h1>', 'app')
@Logger('LOGGING - PERSON')
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person obj...');
    }

}

const pers = new Person();

console.log(pers);
