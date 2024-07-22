import React from 'react';
import { MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from '../Button/Button.tsx';
import './ContentNotFound.css';

interface Props {
  title: string;
  text: string;
  type: 'search'|'warning';
  buttonText?: string;
  buttonAction?: () => void;
}

const ContentNotFound: React.FC<Props> = ({
  title,
  text,
  type,
  buttonText,
  buttonAction,
}) => {
  return (
    <>
      <div id="content-not-found">
        <div id="content-not-found-icon-wrapper">
        {type === 'search' && <MagnifyingGlassIcon height={20} stroke-width="3" />}
        {type === 'warning' && <ExclamationTriangleIcon height={20} stroke-width="2" />}
        </div>
        <h1 id="content-not-found-title">{title}</h1>
        <p id="content-not-found-text">
          {text}
          <span id="content-not-found-please">
            <br />
            Please try again.
          </span>
        </p>
        {buttonText && <Button text={buttonText} type="outline" onClick={buttonAction} />}
      </div>
    </>
  );
}

export default ContentNotFound;
