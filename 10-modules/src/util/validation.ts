namespace App {

// Validation
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput: Validatable) {
        let isValid = true;
        let value = validatableInput.value;
        if (validatableInput.required) {
            isValid = isValid && value.toString().trim().length !== 0;
        }
        if (typeof value === "string") {
            value = value.trim();
            if (validatableInput.minLength && validatableInput.minLength >= 0)
                isValid = isValid && value.length >= validatableInput.minLength;
            if (validatableInput.maxLength && validatableInput.maxLength > 0)
                isValid = isValid && value.length <= validatableInput.maxLength;
        } else {
            // if(typeof value==='number'){
            if (typeof validatableInput.min === "number")
                isValid = isValid && value >= validatableInput.min;
            if (typeof validatableInput.max === "number")
                isValid = isValid && value <= validatableInput.max;
        }
        return isValid;
    }
}
