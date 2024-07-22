import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';

import './StoreSelector.css';

import storeImage from '../../static/images/sacoa-logo.png';

import Title from '../Title/Title.tsx';
import StoreCard from '../StoreCard/StoreCard';
import FormInput from '../FormInput/FormInput.tsx';
import ListItem from '../ListItem/ListItem';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ContentNotFound from '../ContentNotFound/ContentNotFound.tsx';

import { ArrowsRightLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import Chip from '../Chip/Chip.tsx';
import FormControl from '../FormControl/FormControl.tsx';
import IconButton from '../IconButton/IconButton.tsx';

function fetchAvailableStores() {
  try {
    const availableStores = [
      {
        img_src: storeImage,
        store_id: 'DL',
        store_name: 'GameOn',
        company_name: 'GameOn Auckland',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'DO',
        store_name: 'Parque Dorado',
        company_name: 'Mundo E',
        hasHeatmapConfigured: true,
      },
      {
        img_src: storeImage,
        store_id: 'YL',
        store_name: 'Neo Geo Ibirapuera',
        company_name: 'Neo Geo',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: '2W',
        store_name: 'Nitro Park Port Elizabeth',
        company_name: 'Nitro Park',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'NL',
        store_name: 'Hasbro City',
        company_name: 'Hasbro',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'XQ',
        store_name: 'iPlay Africa',
        company_name: 'iPlay Africa',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'RB',
        store_name: 'RockNBowl Norte Shopping',
        company_name: 'RockNBowl',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'G9',
        store_name: 'Neo Geo Mooca',
        company_name: 'Neo Geo',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'SI',
        store_name: 'Neo Geo Guarulhos',
        company_name: 'Neo Geo',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: '1A',
        store_name: 'Zig Zag Uberaba',
        company_name: 'Zig Zag',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'C4',
        store_name: 'Zig Zag Penha',
        company_name: 'Zig Zag',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'A4',
        store_name: 'Zig Zag Palmas',
        company_name: 'Zig Zag',
        hasHeatmapConfigured: false,
      },
      {
        img_src: storeImage,
        store_id: 'XS',
        store_name: 'Peter Pan',
        company_name: 'DSR Games',
        hasHeatmapConfigured: false,
      },
    ];
    return availableStores.sort((a, b) => {
      return b.hasHeatmapConfigured - a.hasHeatmapConfigured;
    });
  } catch (error) {
    console.error('Error: ' + error);
  }
}

function StoreSelector() {
  const [availableStores, setAvailableStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState();
  const [storeSearch, setStoreSearch] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(function getAvailableStores() {
    const response = fetchAvailableStores();
    setAvailableStores(response);
    setSelectedStores(response[0]); //For now, select the first available store
  }, []);

  useEffect(
    function filterStores() {
      setFilteredStores(
        availableStores.filter(
          (s) =>
            s.store_name.toLowerCase().includes(storeSearch.toLowerCase()) ||
            s.company_name.toLowerCase().includes(storeSearch.toLowerCase()) ||
            s.store_id.toLowerCase().includes(storeSearch.toLowerCase())
        )
      );
    },
    [availableStores, storeSearch]
  );

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {selectedStores && (
          <StoreCard imageSrc={selectedStores.img_src} text={selectedStores.store_name} subtext={'Selected'} />
        )}
        <IconButton
          icon={<ChevronLeftIcon />}
          hasBorder={false}
          onClick={handleShow}
          style={{ margin: '0 1em 0 1em' }}
        />
      </div>

      <Offcanvas className={`off-canvas-store-selector`} show={show} placement={'end'} onHide={handleClose}>
        <div className="d-flex">
          <div style={{ margin: '0 1.5em 0 1em' }}>
            <ArrowsRightLeftIcon width={30} />
          </div>
          <div style={{ flexGrow: '1' }}>
            <Title title={'Choose Store'} subTitle={'Store to be analyzed'} size={'md'} />
          </div>
          <div style={{ width: '12em' }}>
            {selectedStores && (
              <StoreCard imageSrc={selectedStores.img_src} text={selectedStores.store_name} subtext={'Selected'} />
            )}
          </div>
          <div>
            <IconButton
              icon={<ChevronRightIcon />}
              hasBorder={false}
              onClick={handleClose}
              style={{ margin: '0 1em 0 1em' }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <FormControl submitButton={false} margin="0">
              <FormInput
                classParams={'mx-3'}
                id={'search-store'}
                name={'search-store'}
                placeholder={'Search for...'}
                type={'search'}
                hasPrefixIcon={true}
                hasSuffixIcon={true}
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
                onClearText={() => setStoreSearch('')}
              />
            </FormControl>
          </div>
        </div>
        <hr style={{ padding: 0, margin: 0 }} />
        <Offcanvas.Body>
          <div className="offcanvas-body">
            <div className="store-list">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <ListItem
                    key={store.store_id}
                    imageSrc={store.img_src}
                    text={store.store_name}
                    subtext={store.company_name}
                    type="subcard"
                    hover={true}
                    onClickAction={() => setSelectedStores(store)}
                    disabled={!store.hasHeatmapConfigured}
                    suffixComponent={
                      store.hasHeatmapConfigured ? (
                        selectedStores &&
                        selectedStores.store_id === store.store_id && (
                          <Chip variant={'success'} size={'sm'}>
                            Selected
                          </Chip>
                        )
                      ) : (
                        <Chip variant={'danger'} size={'sm'}>
                          Not Configured
                        </Chip>
                      )
                    }
                  ></ListItem>
                ))
              ) : (
                <ContentNotFound
                  type="search"
                  title={'Store Not Found'}
                  text={'Search for Company name, Store name or Store ID.'}
                  buttonText={'Clear Search'}
                  buttonAction={() => setStoreSearch('')}
                />
              )}
            </div>
            <div className="language-settings">
              <LanguageSelector />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default StoreSelector;
