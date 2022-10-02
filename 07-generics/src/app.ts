// const names=['max','chris'];
// const names: string[] = [];
const names: Array<string> = [];

console.log(names);

const promise: Promise<string> = new Promise((resolve /*, reject*/) => {
    setTimeout(() => {
        resolve('this is done');
    }, 1000);
});

promise.then(data => {
    data.split(' ')
})
