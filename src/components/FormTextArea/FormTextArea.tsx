import React from 'react';
import './FormTextArea.css'

interface Props {
    id: string,
    label: string,
    name?: string,
    placeholder?: string,
    rows: number,
    cols: number,
    required?: boolean
    disabled?: boolean,
    resizable?: boolean,
}

const FormTextArea: React.FC<Props> = ({
    id,
    label,
    name,
    placeholder,
    rows,
    cols,
    required = true,
    resizable = true,
    disabled = false,
}) => {
    if (!name) {
        name = label;
      }

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
        <div id="textarea-container">
            <textarea
            className={`textarea ${!resizable ? 'resize-disabled' : ''}`}
              id={id}
              name={name}
              placeholder={placeholder}
              rows={rows}
              cols={cols}
              disabled={disabled}
            />
        </div>
          </>
    )
}

export default FormTextArea;