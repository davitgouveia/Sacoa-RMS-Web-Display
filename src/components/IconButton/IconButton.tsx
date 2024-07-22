import React from 'react';
import './IconButton.css';

interface Props {
  icon: React.ReactNode;
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hasBorder?: boolean;
  hasBackgroundColor?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  style?: object;
}

const IconButton: React.FC<Props> = ({
  icon,
  text,
  size = 'md',
  hasBorder = true,
  hasBackgroundColor = false,
  onClick,
  disabled,
  style,
}) => {
  return (
    <div
      className={`button-icon ${size} ${hasBorder ? '' : 'border-disabled'} ${hasBackgroundColor ? 'background-color-fill' : ''} ${text ? 'text' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      style={style}
    >
      <div className='icon'>{icon}</div>
      {text && <span className='text-span'>{text}</span>}
    </div>
  );
};
export default IconButton;