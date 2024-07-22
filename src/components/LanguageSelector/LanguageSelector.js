import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LanguageSelector.css';

import Dropdown from 'react-bootstrap/Dropdown';

import DropdownTitle from './../Dropdown Components/DropdownTitle/DropdownTitle';
import DropdownItemContent from './../Dropdown Components/DropdownItemContent/DropdownItemContent';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import IconButton from '../IconButton/IconButton.tsx';

function LanguageSelector() {
  const [languageAvailable] = useState(['PT | BR', 'EN | US']);
  const [languageSelected, setLanguageSelected] = useState(
    localStorage.getItem('languagePreference') || languageAvailable[0]
  );

  const navigate = useNavigate();

  useEffect(() => {
    const storedLanguagePreference = localStorage.getItem('languagePreference');

    if (storedLanguagePreference) {
      setLanguageSelected(storedLanguagePreference);
    } else {
      setLanguageSelected(languageAvailable[0]);
    }
  }, [languageAvailable]);

  useEffect(() => {
    localStorage.setItem('languagePreference', languageSelected);
  }, [languageSelected]);

  return (
    <div className="d-flex align-items-center">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-text-button">
          <DropdownTitle text={`${languageSelected}`} />
        </Dropdown.Toggle>
        <Dropdown.Menu id="dropdown-custom-menu">
          {languageAvailable.map((language) => (
            <Dropdown.Item key={language} onClick={() => setLanguageSelected(language)}>
              <DropdownItemContent text={language} />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <IconButton
        icon={<Cog6ToothIcon height={30} />}
        hasBorder={false}
        style={{ margin: '0 0 0 0.3em' }}
        onClick={() => navigate('/settings')}
      />
    </div>
  );
}

export default LanguageSelector;
