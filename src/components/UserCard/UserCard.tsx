import Image from 'react-bootstrap/esm/Image';
import React from 'react';

import './UserCard.css';

interface Props {
  imageSrc?: string | undefined;
  text: string | undefined;
  subtext: string | undefined;
  onClickAction: () => void;
  suffixComponent: React.ReactNode;
  collapsed: Boolean;
}

const UserCard: React.FC<Props> = ({ imageSrc, text, subtext, onClickAction, suffixComponent, collapsed }) => {
  return (
    <>
      <div className={`user-card-container ${collapsed && 'collapsed'}`} onClick={onClickAction}>
        <div className="image-section">
          <Image src={imageSrc} roundedCircle width={40} height={40} />
        </div>
        {!collapsed && (
          <>
            <div className="text-section">
              <h1 className="text">{text}</h1>
              <p className="subtext">{subtext}</p>
            </div>
            <div className="suffix-section">{suffixComponent && <span>{suffixComponent}</span>}</div>
          </>
        )}
      </div>
    </>
  );
}

export default UserCard;
