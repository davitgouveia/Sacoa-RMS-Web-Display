import React from 'react';
import './FormSwitch.css';

interface Props {
  size?: 'sm' | 'md' | 'lg',
  checked?: boolean,
  onChange?: () => void,
}

const FormSwitch: React.FC<Props> = ({
  size = 'md',
  checked,
  onChange,
}) => {

  return (
    <label className={`switch ${size}`} >
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <span className={`slider round ${size}`}></span>
    </label>
  );
}

export default FormSwitch;
