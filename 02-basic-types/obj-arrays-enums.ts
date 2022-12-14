// const person: {
//     name: string, age: number,
// } =
// const person =  // type interference
//     {
//         name: 'Chris', age: 42,
//         hobbies: ['Sports', 'Cooking'],
//     };

// const person: {
//     name: string, age: number, hobbies: string[],
//     role: [number, string]  // tuple (special array with strict length and types
// } =
//     {
//         name: 'Chris', age: 42,
//         hobbies: ['Sports', 'Cooking'],
//         role: [2, 'author'] // explicit
//     };

//custom type by enum
enum Role {ADMIN = 5, READ_ONLY = 11, AUTHOR}

const person =
    {
        name: 'Chris', age: 42,
        hobbies: ['Sports', 'Cooking'],
        role: Role.AUTHOR
    };

console.log(person.name);

person.role = Role.ADMIN;

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // hobby.map() would be an error. map is no method on string :)
}
