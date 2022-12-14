// Custom Type / Type Alias
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

/**
 *
 * @param input1
 * @param input2
 * @param resultConversion literal type
 */
const combine = (input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) => {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number')
        result = input1 + input2;
    else
        result = input1.toString() + input2.toString();

    if (resultConversion === 'as-number')
        return +result; // = parseFloat

    return result.toString();
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('A', 'B', 'as-text');
console.log(combinedNames);
