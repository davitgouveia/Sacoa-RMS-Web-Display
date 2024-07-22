import Image from 'react-bootstrap/esm/Image';

import './StoreCard.css';

function StoreCard({ imageSrc, text, subtext, OnClickAction, suffixComponent, collapsed }) {
  return (
    <>
      <div className={`store-card-container ${collapsed && 'collapsed'}`}>
        {imageSrc && (
          <div className="image-section">
            <Image src={imageSrc} rounded width={40} height={40} />
          </div>
        )}

        {!collapsed && (
          <>
            <div className="text-section">
              <h1 className="text">{text}</h1>
              {subtext && <p className="subtext">{subtext}</p>}
            </div>
            <div className="suffix-section">{suffixComponent && <span>{suffixComponent}</span>}</div>
          </>
        )}
      </div>
    </>
  );
}

export default StoreCard;
