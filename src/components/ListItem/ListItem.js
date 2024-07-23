import Image from 'react-bootstrap/esm/Image';

import './ListItem.css';

function ListItem({
  imageSrc,
  iconComponent,
  text,
  textColor,
  subtext,
  subtextColor,
  style,
  type = 'card',
  hover = false,
  onClickAction,
  suffixComponent,
  disabled,
}) {
  //type: card or subcard

  const handleClick = () => {
    if (onClickAction && !disabled) {
      onClickAction();
    }
  };

  return (
    <>
      <div
        className={`listitem-container ${type} ${onClickAction ? 'clickable' : ''} ${hover ? 'hover' : ''} `}
        onClick={handleClick}
        style={style}
        {...(disabled ? { disabled: 'disabled' } : {})}
      >
        {imageSrc ? (
          <div className="image-section">
            <Image src={imageSrc} width={40} height={40} />
          </div>
        ) : (
          iconComponent && <div className="icon-section">{iconComponent}</div>
        )}
        <div className="text-section">
          <h1 className="text" style={{ color: textColor ? textColor : '' }}>
            {text}
          </h1>
          <p className="subtext" style={{ color: subtextColor ? subtextColor : '' }}>
            {subtext}
          </p>
        </div>
        {suffixComponent && <div className="suffix-section">{suffixComponent && <span>{suffixComponent}</span>}</div>}
      </div>
    </>
  );
}

export default ListItem;
