import { Button as BootstrapButton } from 'react-bootstrap';
import React from 'react';
import './Button.css';

interface Props {
  prefixIcon?: React.ReactNode;
  text: string;
  suffixIcon?: React.ReactNode;
  type: 'primary' | 'outline' | 'light'; // Define the possible types for the button
  size?: 'sm' | 'lg' | undefined; 
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  prefixIcon,
  text,
  suffixIcon,
  type,
  size,
  onClick,
  style,
  disabled,
}) => {
  return (
    <BootstrapButton
      className={`button button-${type}`}
      size={size}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {prefixIcon && <span className="prefixIcon">{prefixIcon}</span>}
      <span className="text">{text}</span>
      {suffixIcon && <span className="suffixIcon">{suffixIcon}</span>}
    </BootstrapButton>
  );
};

export default Button;