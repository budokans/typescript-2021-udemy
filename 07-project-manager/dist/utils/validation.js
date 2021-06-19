export function validate(validatableInput) {
    const inputValue = validatableInput.value;
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && inputValue.toString().trim().length > 0;
    }
    if (validatableInput.minLength != null && typeof inputValue === "string") {
        isValid = isValid && inputValue.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof inputValue === "string") {
        isValid = isValid && inputValue.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof inputValue === "number") {
        isValid = isValid && inputValue >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof inputValue === "number") {
        isValid = isValid && inputValue <= validatableInput.max;
    }
    return isValid;
}
