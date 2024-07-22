import React from 'react';
import Form from 'react-bootstrap/Form';
import './FormSelect.css';

interface Props {
    id: string;
    label: string;
    value: string;
    selectList: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    required?: boolean;
}

const FormSelect: React.FC<Props> = ({
    id,
    label,
    value,
    selectList,
    onChange,
    disabled = false,
    required = true,
}) => {
    return (
        <>
            {label && (
                <div className="label-container">
                    <label htmlFor={id} className='label'>
                        {label}
                    </label>
                    {!required && <span className="optional">(optional)</span>}
                </div>
            )}
            <Form.Select
                id={id}
                className="custom-form-select"
                aria-label={label}
                value={value}
                disabled={disabled}
                onChange={onChange}
            >
                {selectList.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </Form.Select>
        </>
    );
};

export default FormSelect;
