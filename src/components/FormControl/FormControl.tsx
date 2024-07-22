import Button from '../Button/Button.tsx';
import React from 'react';

interface Props {
  submitButton?: true | false,
  submitButtonText?: string,
  submitAction: ()=> void,
  width?: string,
  margin?: string,
  children: React.ReactNode,
}

const FormControl: React.FC<Props> = ({
  children,
  submitButton = true,
  submitButtonText = 'Submit',
  submitAction,
  width = '100%',
  margin = '0 0 1em 0',
}) => {
  return (
    <>
      <form style={{ display: 'flex', flexDirection: 'column', padding: 0, width: width, margin: margin }}>
        {children}
        {submitButton && (
          <Button text={submitButtonText} type="primary"  onClick={submitAction} />
        )}
      </form>
    </>
  );
}

export default FormControl;
