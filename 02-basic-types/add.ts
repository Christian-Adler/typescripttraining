let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Chris';

// userName = userInput; nicht erlaubt
if (typeof userInput === 'string') // Unknown has to be checked before. This why unknown is better than any
    userName = userInput;
