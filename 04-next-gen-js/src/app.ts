const add = (...numbers: number[]) => {
    return numbers.reduce((curRes, curValue) => {
        return curRes + curValue;
    }, 0);
}

const addedNumbers = add(1, 2, 3, 5);
console.log(addedNumbers);
