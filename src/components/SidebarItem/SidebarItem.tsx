import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import './SidebarItem.css';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  icon: React.ReactNode;
  text: string;
  type: 'item' | 'sub-menu' | 'sub-item';
  navigateTo: string;
  onClick: () => void;
  active: boolean;
  collapsed: boolean;
  disabled: boolean;
  eventKey: string | undefined;
  callback?: (eventKey: string) => void | undefined;
}

const SidebarItem: React.FC<Props> = ({
  icon,
  text,
  type = 'item',
  navigateTo,
  onClick,
  collapsed,
  active,
  disabled,
  eventKey,
  callback,
}) => {
  const navigate = useNavigate();
  const PATH = navigateTo;

  // SUB-MENU
  const { activeEventKey } = useContext(AccordionContext);
  const isCurrentEventKey = activeEventKey === eventKey;

  const decoratedOnClick = useAccordionButton(eventKey || '', () => {
    if (callback && eventKey) {
      callback(eventKey);
    }
  });

  const handleClick = (event: React.SyntheticEvent) => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }
      if (type === 'sub-menu') {
        decoratedOnClick(event);
      } else {
        navigate(PATH);
      }
    }
  };

  return (
    <div
      className={`sidebar-item-component ${type} ${active ? 'active' : ''} ${collapsed ? 'collapsed' : 'open'}`}
      onClick={handleClick}
      {...(disabled ? { disabled: 'disabled' } : {})}
    >
      <div className='active-indicator' />
      <div id="icon-area">{icon}</div>
      <div id="text-area">
        <h1>{text}</h1>
      </div>
      {type === 'sub-menu' && !collapsed && (
        <div className='accordion-collapsable-icon'><ChevronRightIcon height={18} style={{ transform: isCurrentEventKey ? 'rotate(90deg)' : '' }} /></div>
      )}
    </div>
  );
};

export default SidebarItem;
