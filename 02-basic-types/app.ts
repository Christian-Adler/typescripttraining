const add = (n1: number, n2: number) => {
    return n1 + n2;
}

const printResult = (num: number) => {
    console.log('Result:' + num);
}

printResult(add(1, 2));

// let combineValues: Function;
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 5;
// combineValues = printResult;

console.log(combineValues(8, 8));
