import React from 'react';
import './FilterPills.css';
import Pill from './Pill';

interface Props {
  filterOptions: string[],
  selectedOption: string,
  onSelect: ()=>void,

}

const FilterPills: React.FC<Props> = ({
filterOptions,
selectedOption,
onSelect
}) => {
  return (
  <>
  <div className='filter-pills-component'>
    {filterOptions.length > 0 && filterOptions.map((option) => {
        return (
          <Pill
            key={option}
            description={option}
            isSelected={selectedOption === option}
            onSelect={onSelect}
          />
        );
    })}
  </div>
  
  </>
  );
}

export default FilterPills;
