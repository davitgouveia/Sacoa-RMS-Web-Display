import { ChevronDownIcon } from '@heroicons/react/24/outline';

import './DropdownTitle.css';

function DropdownTitle({ text, iconComponent, showDropIcon }) {
  /* Default is to show drop icon*/
  const showDropIconStatus = showDropIcon === undefined ? true : showDropIcon === true ? true : false;

  return (
    <div id="dropdown-title-container">
      <div id="icon-text-container">
        {iconComponent && <div id="icon-container">{iconComponent}</div>}
        {text && (
          <div id="text" style={{ marginLeft: iconComponent ? '0.5em' : '' }}>
            {' '}
            {/* Text margin if theres Icon Prefix */}
            {text}
          </div>
        )}
      </div>
      {showDropIconStatus && (
        <div id="drop-icon" style={{ marginLeft: text ? '0.5em' : '' }}>
          {' '}
          {/* Drop Icon margin if theres text */}
          <ChevronDownIcon height={20} />
        </div>
      )}
    </div>
  );
}

export default DropdownTitle;
