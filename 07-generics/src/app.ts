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

function merge<T extends object, U extends object>(objA: T, objB: U) {
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

// const merged4 = merge({name: 'Max', someOther: 124}, 35); // 35 ist kein Objekt -> wird ignoriert
// console.log(merged4);


// interface PairObj {
//     [prop: string]: any;
// }
//
// const createPairObj = <T, U>(key1: string, t: T, key2: string, u: U) => {
//     const res: PairObj = {};
//     res[key1] = t;
//     res[key2] = u;
//     return res;
// }
//
// const paired = createPairObj('a', {b: 'b'}, 'c', 123);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let desc = 'Got no value';
    if (element.length === 1)
        desc = 'Got 1 element';
    else if (element.length > 0)
        desc = 'Got ' + element.length + ' elements';

    return [element, desc];
}

console.log(countAndDescribe('Hi there'));
console.log(countAndDescribe(['Hi there']));
console.log(countAndDescribe([]));
// console.log(countAndDescribe(123)); // number hat kein length
