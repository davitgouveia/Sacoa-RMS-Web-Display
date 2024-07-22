import '../../sacoa-card-sales/pages/Dashboard/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Modal } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

import ContentCard from '../../components/ContentCard/ContentCard.tsx';
import Title from '../../components/Title/Title.tsx';
import DefaultPage from '../../components/DefaultPage/DefaultPage.tsx';
import SubContentCard from '../../components/SubContentCard/SubContentCardComponent.js';
import ListItem from '../../components/ListItem/ListItem.js';
import Button from '../../components/Button/Button.tsx';
import Chip from '../../components/Chip/Chip.tsx';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

async function fetchStatusData(year) {
  const response = await fetch(`${process.env.REACT_APP_CARD_SALES_API_ADDRESS}/EB/getDataStatus/${year}`);
  const reportData = await response.json();
  return reportData;
}

function getFullMonthName(monthIndex) {
  const date = new Date(2000, monthIndex - 1, 1);
  return date.toLocaleString('default', { month: 'long' });
}

function DataStatus() {
  const [dataStatus, setDataStatus] = useState();
  const [showModal, setShowModal] = useState();
  const [storeData, setStoreData] = useState();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  function getDataStatus(storeData, currentYear, currentMonth) {
    const result = [];

    //Past Year
    const pastYear = currentYear - 1;
    const pastYearArray = storeData.data[pastYear];
    const countPast = pastYearArray.filter((item) => item.has_data === true).length;
    result.push({
      year: pastYear,
      status:
        pastYearArray[pastYearArray.length - 1].has_data === false
          ? 'Outdated'
          : pastYearArray.length !== countPast
            ? 'Incomplete'
            : 'Up to date',
    });

    //MELHORAR URGENTEMENTE

    //Current Year
    const currentYearArray = storeData.data[currentYear].filter((item) => item.month <= currentMonth);
    const count = currentYearArray.filter((item) => item.has_data === true).length;
    result.push({
      year: currentYear,
      status:
        currentYearArray[currentYearArray.length - 1].has_data === false
          ? 'Outdated'
          : currentYearArray.length !== count
            ? 'Incomplete'
            : 'Up to date',
    });

    return result;
  }

  useEffect(
    function fetchInitalData() {
      fetchStatusData(currentYear).then((response) => setDataStatus(response));
    },
    [currentYear]
  );

  const handleCloseModal = () => setShowModal(false);
  function handleShowModal(store) {
    setStoreData(store);
    setShowModal(true);
  }

  const navigate = useNavigate();

  return (
    <>
      <DefaultPage title={'Data Status'} subtitle={'Analyze the credibility of stores data'}>
        <Row>
          <div className="px-0">
            <Button text="Back to Dashboard" type="outline" onClick={() => navigate('/dashboard/cardsales')} />
          </div>
        </Row>
        {dataStatus &&
          dataStatus.map((company) => (
            <>
              <Row>
                <ContentCard style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Title title={company.company_name} size="md" />
                  {company.stores.map((store) => (
                    <SubContentCard style={{ maxWidth: '400px', margin: '0.3em' }}>
                      <Title title={`${store.store_id} - ${store.store_name}`} size="sm" />
                      {getDataStatus(store, currentYear, currentMonth).map((yearData, index) => (
                        <div key={index} className="mb-2">
                          <Chip variant={yearData.status === 'Up to date' ? 'success' : 'danger'} size="sm">
                            {yearData.year} {yearData.status}
                          </Chip>
                        </div>
                      ))}
                      <Button
                        text="Details"
                        type="outline"
                        suffixIcon={<ArrowUpRightIcon />}
                        onClick={() => handleShowModal(store)}
                        size="sm"
                      />
                    </SubContentCard>
                  ))}
                </ContentCard>
              </Row>
            </>
          ))}
      </DefaultPage>
      <Modal show={showModal} onHide={handleCloseModal}>
        {storeData && (
          <Modal.Body className={'default-modal-body'} style={{ height: '500px', overflowY: 'scroll' }}>
            <Title title={`${storeData.store_id} - ${storeData.store_name}`} type="tablecard" />
            <div>
              {Object.keys(storeData.data)
                .sort((a, b) => b - a) //Year descending
                .map((year) => (
                  <div key={year} className="mb-4">
                    <Title title={year} size="sm" type="tablecard" />
                    {parseInt(year) === currentYear
                      ? storeData.data[year]
                          .filter((item) => item.month <= currentMonth)
                          .sort((a, b) => b.month - a.month) // Months descending
                          .map((month) => (
                            <ListItem
                              text={getFullMonthName(month.month)}
                              type="subcard"
                              suffixComponent={
                                month.has_data ? (
                                  <Chip variant="success" size="sm">
                                    Data logged
                                  </Chip>
                                ) : (
                                  <Chip variant="danger" size="sm">
                                    No data
                                  </Chip>
                                )
                              }
                            />
                          ))
                      : storeData.data[year]
                          .sort((a, b) => b.month - a.month) // Months descending
                          .map((month) => (
                            <ListItem
                              text={getFullMonthName(month.month)}
                              type="subcard"
                              suffixComponent={
                                month.has_data ? (
                                  <Chip variant="success" size="sm">
                                    Data logged
                                  </Chip>
                                ) : (
                                  <Chip variant="danger" size="sm">
                                    No data
                                  </Chip>
                                )
                              }
                            />
                          ))}
                  </div>
                ))}
            </div>
          </Modal.Body>
        )}

        <Modal.Footer className={'default-modal-footer'}>
          <Button text="Close" type="light" onClick={handleCloseModal} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DataStatus;
