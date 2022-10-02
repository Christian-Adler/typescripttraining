// // const names=['max','chris'];
// // const names: string[] = [];
// const names: Array<string> = [];
//
// console.log(names);
//
// const promise: Promise<string> = new Promise((resolve /*, reject*/) => {
//     setTimeout(() => {
//         resolve('this is done');
//     }, 1000);
// });
//
// promise.then(data => {
//     data.split(' ')
// })

function merge<T, U>(objA: T, objB: U) {
    return Object.assign({}, objA, objB);
}

// console.log(merge({name: 'Max'}, {age: 25}));
const merged = merge({name: 'Max'}, {age: 25});
console.log(merged.age);
const merged2 = merge({name: 'Max', someOther: 124}, {age: 25});
console.log(merged2.someOther);
// Lange schreibweise -Typescript inferred that
const merged3 = merge<{ name: string, someOther: number }, { age: number }>({name: 'Max', someOther: 124}, {age: 25});
console.log(merged2.someOther);
// const merged3 = merge<string, number>({name: 'Max', someOther: 124}, {age: 25}); // Fehler
// console.log(merged2.someOther);
