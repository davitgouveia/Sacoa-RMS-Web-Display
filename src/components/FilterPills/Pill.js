import { useEffect, useState } from 'react';

import './Pill.css';

function Pill({ description, isSelected, onSelect }) {
  const [filterDescription, setFilterDescription] = useState();

  useEffect(() => {
    setFilterDescription(description);
  }, [description]);

  const handleClick = () => {
    onSelect(description);
  };

  return (
    <>
      <div className={`filter-pill ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
        {filterDescription}
      </div>
    </>
  );
}

export default Pill;
