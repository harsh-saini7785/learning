import React from 'react';
import { styles } from './FormFieldStyle';

const FormField = ({ field, onChange }) => {
    
    const handleChange = (e) => {
        const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
        onChange(field.id, { ...field, value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onChange(field.id, { ...field, value: file });
    };

    const renderField = () => {
        switch (field.type) {
            case 'text':
                return <input style={styles.inputField} type="text" value={field.value} onChange={handleChange} />;
            case 'textarea':
                return <textarea style={styles.inputField} value={field.value} onChange={handleChange} />;
            case 'dropdown':
                return (
                    <select style={styles.inputField} value={field.value} onChange={handleChange}>
                        {field.options.map((option) => (
                            <option key={option.id} value={option.option}>
                                {option.option}
                            </option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return <input type="checkbox" checked={field.value} onChange={handleChange} />;
            case 'radio':
                return <div style={styles.radioContainer}>
                    {field.options.map((option) => (
                        <>
                            <input
                                style={{ cursor: 'pointer' }}
                                type="radio"
                                value={option.option}
                                checked={field.value === option.option}
                                onChange={handleChange}
                            />
                            <label key={option.id} style={{ fontSize: '17px', fontWeight: 500 }}>
                                {option.option}
                            </label>
                        </>
                    ))}
                </div>
            case 'file':
                return <input style={styles.inputField} type="file" accept={field.accept} onChange={handleFileChange} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <div style={styles.label}>{field.label}{field.required && <span>*</span>}:</div >
            {renderField()}
            {field.error && <span style={{ color: 'red',fontSize: '14px' }}>{field.error}</span>}
        </div>
    );
};

export default FormField;