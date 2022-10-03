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

// --

// Property decorator
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

// Accessor decorator
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Method decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

class Product {
    @Log
    private readonly _title: string;
    private _price: number

    get title() {
        return this._title;
    }

    @Log2
    set price(val: number) {
        if (val > 0)
            this._price = val;
        else throw new Error('Invalid price!')
    }

    constructor(title: string, price: number) {
        this._title = title;
        this._price = price;
    }

    @Log3
    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}
