import React, { useEffect, useState } from 'react';
import FormField from '../FormField/FormField';

import { styles } from './FormBuilderStyle';
import removeButton from '../../assets/remove.png'
import { validateField, validateInputField } from '../../utils';
import { useWindowDimension } from '../../CustomHooks/useWindowDimension';
const options = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'dropdown', label: 'Text' },
    { value: 'checkbox', label: 'Text' },
    { value: 'radio', label: 'Radio Button' },
    { value: 'file', label: 'File' },
]

const FormBuilder = () => {
    const [fields, setFields] = useState([]);
    const [optionsError, setOptionsError] = useState({})
    const [isFormConfigSaved, setIsFormConfigSaved] = useState(false);
    const [newField, setNewField] = useState({
        id: '',
        label: '',
        type: 'text',
        options: [],
        value: '',
        required: false,
        minLength: 0,
        maxLength: 100,
        pattern: '',
        accept: '',
        error: '',
        conditional: { fieldId: '', value: '' },
    });

    const [dimension] = useWindowDimension();


    useEffect(() => {
        setIsFormConfigSaved(!!localStorage.getItem('formConfig'))
    }, [isFormConfigSaved])

    const handleAddField = () => {
        const error = validateInputField(newField)

        if (error) {
            setNewField((prev) => ({ ...prev, error }))
            return;
        }

        const newErrors = {};

        newField.options?.forEach((option) => {
            if (!option['option']) {
                newErrors[option.id] = true;
            } else {
                newErrors[option.id] = false;
            }
        });
        const isError = Object.keys(newErrors).some((item) => newErrors[item] === true)
        setOptionsError(newErrors);
        if (isError) {
            return;
        }


        setFields([...fields, { ...newField, error: '', id: Date.now().toString() }]);
        setNewField({
            id: '',
            label: '',
            type: 'text',
            options: [],
            value: '',
            required: false,
            minLength: 0,
            maxLength: 100,
            pattern: '',
            accept: '',
            error: '',
            conditional: { fieldId: '', value: '' },
        });
    };

    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    const handleOptionFieldRemove = (id) => {
        setNewField((prev) => ({
            ...prev,
            options: prev.options.filter((field) => field.id !== id)
        }))
    }

    const handleUpdateField = (id, updatedField) => {
        setFields(fields.map((field) => (field.id === id ? updatedField : field)));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewField((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (e, index) => {
        const newOptions = [...newField.options];
        newOptions[index] = { ...newOptions[index], option: e.target.value };
        setNewField((prev) => ({ ...prev, options: newOptions }));
    };

    const handleAddOption = () => {
        setNewField((prev) => ({ ...prev, options: [...prev.options, { id: Date.now().toString(), option: '' }] }));
    };


    const handleSubmit = () => {
        const result = {};
        const updatedFields = fields.map((field) => {
            return {
                ...field,
                error: validateField(field),
            }
        });
        setFields(updatedFields);
        updatedFields.forEach((item)=> {
            result[item.label] = item.value;
        })

        const invalidFields = updatedFields.filter((field) => field.error);

        if (invalidFields.length === 0) {
            console.log('Result:', result);
        }
    };

    const handleSave = () => {
        localStorage.setItem('formConfig', JSON.stringify(fields));
        setIsFormConfigSaved(true);
    };

    const handleLoad = () => {
        const savedFields = JSON.parse(localStorage.getItem('formConfig'));
        if (savedFields) {
            setFields(savedFields);
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.gridContainer}>
                <h2 style={{ textAlign: 'center' }}>Form Builder</h2>
                <div style={{ ...styles.grid3, ...styles.m10, ...dimension < 550 && styles.grid1 }}>
                    <div >
                        <div style={styles.label}>
                            Form Label: <span>*</span>
                        </div>
                        <div>
                            <input style={styles.inputField} type="text" name="label" value={newField.label} onChange={handleChange} />
                        </div>
                        {(newField.error && !newField.label) && <span style={{ color: '#880a0a', fontSize: '14px', fontWeight: 'bold' }}>{newField.error}</span>}
                    </div>
                    <div>
                        <div style={styles.label}>
                            Form Type:<span>*</span>
                        </div>
                        <select style={styles.inputField} name="type" value={newField.type} onChange={handleChange}>
                            <option value="text">Text</option>
                            <option value="textarea">Text Area</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio Button</option>
                            <option value="file">File</option>
                        </select>
                    </div>
                    <div>
                        <div style={styles.label}>
                            Pattren:
                        </div>
                        <input
                            style={styles.inputField}
                            type="text"
                            name="pattern"
                            value={newField.pattern}
                            onChange={handleChange}
                            placeholder="e.g., ^[a-zA-Z0-9]+$"
                        />
                    </div>
                </div>
                {newField.type === 'dropdown' || newField.type === 'radio' ? (
                    <div style={styles.m10}>
                        {!!newField?.options?.length && <div>
                            <div style={styles.label}>
                                Options:
                            </div>
                        </div>}
                        <div style={styles.grid3}>
                            {newField.options.map((option, index) => (
                                <div>
                                    <div style={styles.optionForm}>
                                        <input
                                            style={styles.inputField}
                                            key={option.id}
                                            type="text"
                                            value={option.option}
                                            onChange={(e) => handleOptionChange(e, index)}
                                        />
                                        <img style={styles.optionRemove} width='20px' height='20px' onClick={() => handleOptionFieldRemove(option.id)} src={removeButton} alt='removeButton' />
                                    </div>
                                    {optionsError[option.id] && <div style={styles.error}>Field can not be empty</div>}
                                </div>
                            ))}
                        </div>
                        <button style={styles.addOption} onClick={handleAddOption}>Add Option</button>
                    </div>
                ) : null}

                {newField.type === 'file' ? (
                    <div>
                        <div>
                            <div style={styles.label}>
                                Accept:
                            </div>
                            <div style={styles.grid3}>
                                <input
                                    style={styles.inputField}
                                    type="text"
                                    name="accept"
                                    value={newField.accept}
                                    onChange={handleChange}
                                    placeholder="e.g., .jpg,.png"
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
                <div style={{ ...styles.grid3, ...styles.m10, ...dimension < 550 && styles.grid2 }}>
                    <div>
                        <div style={styles.label}>
                            Min Length:
                        </div>
                        <input
                            style={styles.inputField}
                            type="number"
                            name="minLength"
                            value={newField.minLength}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div style={styles.label}>
                            Max Length:
                        </div>
                        <input
                            style={styles.inputField}
                            type="number"
                            name="maxLength"
                            value={newField.maxLength}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <div style={styles.label}>
                            Conditional Field:
                        </div>
                        <select
                            style={styles.inputField}
                            name="conditionalFieldId"
                            value={newField.conditional.fieldId}
                            onChange={(e) =>
                                setNewField((prev) => ({
                                    ...prev,
                                    conditional: { ...prev.conditional, fieldId: e.target.value },
                                }))
                            }
                        >
                            <option value="">None</option>
                            {fields.map((field) => (
                                <option key={field.id} value={field.id}>
                                    {field.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div style={styles.label}>
                            Conditional Value:
                        </div>
                        <input
                            style={styles.inputField}
                            type="text"
                            name="conditionalValue"
                            value={newField.conditional.value}
                            onChange={(e) =>
                                setNewField((prev) => ({
                                    ...prev,
                                    conditional: { ...prev.conditional, value: e.target.value },
                                }))
                            }
                        />
                    </div>
                </div>
                <div style={styles.requiredField}>
                    <div style={styles.label}>
                        Required:
                    </div>
                    <input
                        style={styles.requiredInput}
                        type="checkbox"
                        name="required"
                        checked={newField.required}
                        onChange={(e) => setNewField((prev) => ({ ...prev, required: e.target.checked }))}
                    />
                </div>
                <button style={{ ...styles.m10, ...{ marginRight: '10px' } }} onClick={handleAddField}>Add Field</button>
                {isFormConfigSaved && <button style={styles.m10} onClick={handleLoad}>Load Saved configuration</button>}
            </div>

            {!!fields?.length && <div style={{ ...styles.formPreview, ...dimension < 650 && styles.w400, ...dimension < 500 && styles.w350 }}>
                {!!fields?.length && <h2 style={{ textAlign: 'center' }}>Form Preview</h2>}
                <div style={styles.grid1}>
                    {fields.map((field) => {
                        const conditionalField = fields.find((f) => f.id === field.conditional.fieldId);
                        if (
                            conditionalField &&
                            conditionalField.value !== field.conditional.value
                        ) {
                            return null;
                        }
                        return (
                            <div key={field.id} style={{ ...styles.outputField }}>
                                <FormField field={field} onChange={handleUpdateField} />
                                <img style={styles.removeIcon} width='20px' height='20px' onClick={() => handleRemoveField(field.id)} src={removeButton} alt='removeButton' />
                            </div>
                        );
                    })}
                </div>

                {!!fields?.length && <div style={styles.submitButtonContainer}>
                    <button onClick={handleSubmit}>Submit Form</button>
                    <button onClick={handleSave}>Save Form Configuration</button>
                </div>}
            </div>}
        </div>
    );
};

export default FormBuilder;