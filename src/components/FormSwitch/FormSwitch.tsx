import React from 'react';
import './FormSwitch.css';

interface Props {
  size?: 'sm' | 'md' | 'lg',
  disabled?: boolean,
  checked?: boolean,
  onChange?: () => void,
}

const FormSwitch: React.FC<Props> = ({
  size = 'md',
  disabled = false,
  checked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange();
    }
  };

  return (
    <label className={`switch ${size} ${disabled ? 'disabled' : ''}`}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={handleChange} 
        disabled={disabled} 
      />
      <span className={`slider round ${size}`}></span>
    </label>
  );
}

export default FormSwitch;
