export const validateField = (field) => {
    let error = '';
    if (field.required && !field.value) {
        error = 'This field is required';
    } else if (field.minLength && field.value.length < field.minLength) {
        error = `Minimum length should be ${field.minLength}`;
    } else if (field.maxLength && field.value.length > field.maxLength) {
        error = `Maximum length should be ${field.maxLength}`;
    } else if (field.pattern && !new RegExp(field.pattern).test(field.value)) {
        console.log(field.value, 'come');
        
        error = 'Invalid format';
    } else if (field.type === 'file' && field.value) {
        const file = field.value;
        if (field.accept && !field.accept.split(',').includes(file.type)) {
            error = 'Invalid file type';
        } else if (file.size > 2 * 1024 * 1024) { // Example: 2MB limit
            error = 'File size exceeds limit';
        }
    }
    return error;
};

export const validateInputField = (field)=> {
    let error = '';
    if(!field.label?.trim()){
        error = 'Label is empty'
    }
    return error;
}