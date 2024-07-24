import React from 'react';
import { useEffect, useState } from 'react';
import './FormInput.css';
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Props {
  id: string;
  name?: string;
  label: string;
  type: 'email' | 'password' | 'search' | 'text';
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearText?: ()=> void;
  placeholder?: string
  formText?: string
  required?: boolean
  hasPrefixIcon?: boolean
  hasSuffixIcon?: boolean
  autoComplete?: boolean
  disabled?: boolean
  classParams?: string
}

const FormInput: React.FC<Props>=({
  id,
  name,
  label,
  type,
  value,
  onChange,
  onClearText,
  placeholder,
  formText,
  required = true,
  hasPrefixIcon = false,
  hasSuffixIcon = false,
  autoComplete = false,
  disabled = false,
  classParams,
}) => {
  const INITIAL_TYPE = type;

  const [formType, setFormType] = useState(INITIAL_TYPE);
  const [inputValue, setInputValue] = useState('');
  const [showPass, setShowPass] = useState(false);

  if (!name) {
    name = label;
  }

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  if (formType === 'search') {
    // This disables the default clear text from search type
    setFormType('text');
  }

  function clearInputText() {
    setInputValue('');
  }

  function handleShowPass() {
    setShowPass(!showPass);
    setFormType(showPass ? 'password' : 'text');
  }

  return (   
        <>
          {label && (
            <div className="label-container">
              <label id="label" htmlFor={id}>
                {label}
              </label>
              {!required && <span className="optional">(optional)</span>}
            </div>
          )}
          <div id="input-container" className={`${classParams}`}>
            <input
              className={`input-${INITIAL_TYPE} ${hasPrefixIcon ? 'prefix' : ''} ${hasSuffixIcon ? 'suffix' : ''} ${required ? 'required' : ''} ${disabled ? 'disabled' : ''}`}
              type={formType}
              id={id}
              name={name}
              placeholder={placeholder}
              value={inputValue}
              onChange={onChange}
              disabled={disabled}
              autoComplete={autoComplete ? 'on' : 'off'}
            />
            {INITIAL_TYPE === 'email' && hasPrefixIcon && (
              <div id="prefix-icon">
                <UserIcon />
              </div>
            )}
            {INITIAL_TYPE === 'password' && (
              <>
                {hasPrefixIcon && (
                  <div id="prefix-icon">
                    <LockClosedIcon />
                  </div>
                )}

                {hasSuffixIcon && (
                  <div id="suffix-icon" onClick={handleShowPass}>
                    {showPass ? <EyeSlashIcon /> : <EyeIcon />}
                  </div>
                )}
              </>
            )}
            {INITIAL_TYPE === 'search' && (
              <>
                {hasPrefixIcon && (
                  <div id="prefix-icon">
                    <MagnifyingGlassIcon />
                  </div>
                )}

                {hasSuffixIcon && onClearText && inputValue !== '' && (
                  <div
                    id="suffix-icon"
                    onClick={() => {
                      clearInputText();
                      onClearText();
                    }}
                  >
                    <XMarkIcon />
                  </div>
                )}
              </>
            )}
            {formText && <p id="form-text">{formText}</p>}
          </div>
        </>
  );
}

export default FormInput;
