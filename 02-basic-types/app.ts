// const person: {
//     name: string, age: number,
// } =
const person =  // type interference
    {
        name: 'Chris', age: 42,
        hobbies: ['Sports', 'Cooking']
    };


console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // hobby.map() would be an error. map is no method on string :)
}
