import './Text.css';
import React from 'react';


interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  ellipsis?: boolean;
  noMargin?: boolean;
  children: React.ReactNode;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

const Text: React.FC<Props> = ({ size, noMargin = false, fontWeight = '400', color = 'var(--text-color)', ellipsis=false, textAlign, children}) => {
  const classParameters = `${size || 'md'} ${ellipsis ? 'ellipsis' : ''}`;
  return (
        <p className={`text ${classParameters}`} style={{margin: noMargin ? '0' : '', color: color, fontWeight: fontWeight, textAlign: textAlign}}>{children}</p>
  );
}

export default Text;
