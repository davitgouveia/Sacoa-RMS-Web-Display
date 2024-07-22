import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useContext } from 'react';

import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import './ContentAwareToggle.css';

interface Props {
  children: React.ReactNode;
  eventKey: string;
  callback?: (eventKey: string) => void;
  collapsed: boolean;
  disabled: boolean;
}

const ContextAwareToggle: React.FC<Props> = ({ children, eventKey, callback, collapsed, disabled }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));
  const isCurrentEventKey = activeEventKey === eventKey;

  const handleClick = (event: React.SyntheticEvent) => {
    if (!disabled) {
      decoratedOnClick(event);
    }
  };

  return (
    <div
      className={`context-aware-toggle ${collapsed ? 'collapsed' : ''}`}
      onClick={handleClick}
      {...(disabled && { disabled: 'disabled' })}
    >
      <span id="children">{children}</span>
      {!collapsed && (
        <ChevronRightIcon height={18} style={{ transform: isCurrentEventKey ? 'rotate(90deg)' : '' }} />
      )}
    </div>
  );
};

export default ContextAwareToggle;
