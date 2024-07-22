import './Chip.css';
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'success' | 'neutral' | 'danger';
  valueStatus?: 'increase' | 'neutral' | 'decrease';
  classParams?: string;
  children?: React.ReactNode;
}

const Chip: React.FC<Props> = ({ size, variant, valueStatus, classParams, children}) => {
  const classParameters = `${size || 'md'} ${variant || 'neutral'}`;
  return (
      <div className={`chip ${classParameters} ${classParams ? classParams : ''}`}>
        {valueStatus && (
          <div id="chip-icon-wrapper">
            {valueStatus === 'increase' ? (
              <ArrowUpIcon strokeWidth="3" />
            ) : valueStatus === 'decrease' ? (
              <ArrowDownIcon strokeWidth="3" />
            ) : (
              valueStatus === 'neutral' && <CheckIcon strokeWidth="3" />
            )}
          </div>
        )}

        <p className="m-0">{children}</p>
      </div>
  );
}

export default Chip;
