import React from 'react';
import './FormCheckbox.css';

interface Props {
  id: string;
  name?: string;
  label: string;
  onChange?: () => void;
  checked?: boolean
  formText?: string
  required?: boolean
  disabled?: boolean
}

const FormCheckbox: React.FC<Props>=({
  id,
  name,
  label,
  onChange,
  checked,
  formText,
  required = true,
  disabled = false,
}) => {
  
  if (!name) {
    name = label;
  }
  return (
    <>
        <div
          className={`checkbox-container  ${disabled ? 'disabled' : ''}`}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5em' }}
        >
          <input
            className={`input-checkbox ${required ? 'required' : ''}`}
            type="checkbox"
            id={id}
            name={name}
            onChange={onChange}
            checked={checked}
          />
          <label htmlFor={id}>{label}</label> {!required && <span className="optional">(optional)</span>}
        </div>
        {formText && <p id="form-text">{formText}</p>} 
    </>
  );
}

export default FormCheckbox;
