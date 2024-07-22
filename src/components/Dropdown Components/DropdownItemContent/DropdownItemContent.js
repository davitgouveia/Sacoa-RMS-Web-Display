import './DropdownItemContent.css';

function DropdownItem({ text, iconComponent, showDropIcon }) {
  const showIcon = showDropIcon === undefined ? true : showDropIcon === true ? true : false;
  return (
    <div id="dropdown-item-container">
      {iconComponent && (
        <div id="icon-container" style={{ marginRight: text === undefined ? '0' : '0.5em' }}>
          {iconComponent}
        </div>
      )}
      {text && (
        <div id="text" style={{ marginRight: showIcon ? '0.5em' : '0' }}>
          {text}
        </div>
      )}
    </div>
  );
}

export default DropdownItem;
