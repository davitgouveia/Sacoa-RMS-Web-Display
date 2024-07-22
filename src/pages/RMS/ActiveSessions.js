import { useEffect, useState } from 'react';

import './ActiveSessions.css';

import { Row, ProgressBar, Table } from 'react-bootstrap';

import DefaultPage from '../../components/DefaultPage/DefaultPage.tsx';
import ContentCard from '../../components/ContentCard/ContentCard.tsx';
import SubContentCard from '../../components/SubContentCard/SubContentCardComponent.js';
import Title from '../../components/Title/Title.tsx';
import ListItem from '../../components/ListItem/ListItem.js';

import { TicketIcon, ReceiptRefundIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import ContentNotFound from '../../components/ContentNotFound/ContentNotFound.tsx';
import Text from '../../components/Text/Text.tsx';

function ActiveSessions() {
  const [sessions, setSessions] = useState([]);
  const [sessionTimeout, setSessionTimeout] = useState(60000);

  const [cardBalanceSessions, setCardBalanceSessions] = useState([]);
  const [cardBalanceSessionTimeout, setCardBalanceSessionTimeout] = useState(60000);
  const [hasConnection, setHasConnection] = useState(true);

  const redemptionSession = {
    label: 'REDEMPTION',
    icon: <TicketIcon />,
  };

  const refundSession = {
    label: 'REFUND',
    icon: <ReceiptRefundIcon />,
  };

  const ticketTransferSession = {
    label: 'TICKET TRANSFER',
    icon: <CreditCardIcon />,
  };

  const sessionTypes = new Map([
    [1, redemptionSession],
    [2, refundSession],
    [3, ticketTransferSession],
  ]);

  function calculateTimeOutProgress(currentRemaining) {
    const percentage = (currentRemaining * 100) / sessionTimeout;
    return percentage;
  }

  useEffect(() => {
    async function getConfig() {
      try {
        const response = await fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/info`);
        const data = await response.json();
        setSessionTimeout(data.sessionTimeout);
        setCardBalanceSessionTimeout(data.cardBalanceTimeout);
        setHasConnection(true);
      } catch (error) {
        console.error(`Error connection to web service:`, error);
        setHasConnection(false);
      }
    }
    getConfig();
  }, []);

  async function getSessions() {
    try {
      const response = await fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/rms/sessions`);
      const data = await response.json();
      setSessions(data.map((session) => ({ ...session })));
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  async function getCardBalanceSessions() {
    try {
      const response = await fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/rms/cardBalanceSessions`);
      const data = await response.json();
      setCardBalanceSessions(data.map((session) => ({ ...session })));
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  useEffect(() => {
    if (hasConnection) {
      const interval = setInterval(() => {
        getSessions();
        getCardBalanceSessions();
      }, 200);
      return () => clearInterval(interval);
    }
  }, [hasConnection]);

  return (
    <DefaultPage
      fluid
      title="Redemption Multi Sessions"
      suffixComponent={<img src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png" width={200} />}
    >
      {hasConnection ? (
        <>
          <div className="redemption-sessions-container">
            <div className="d-flex justify-content-center flex-wrap">
              {sessions && sessions.length > 0 && (
                <>
                  {sessions.map(
                    ({ card_number, card_tickets, session_color, data, total_tickets_of_session, session_type }) => (
                      <ContentCard style={{ maxWidth: '550px', margin: '0.3em' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1em' }}>
                          <div
                            className="color-indicator"
                            style={{
                              height: '55px',
                              minWidth: '55px',
                              marginRight: '0.5em',
                              border: '2px solid var(--border-color)',
                              backgroundColor: session_color,
                              borderRadius: 'var(--default-border-radius)',
                            }}
                          />
                          <Title
                            size="lg"
                            title={`${card_number}`}
                            subTitle={`Tickets: ${card_tickets}`}
                            noMargin
                            suffixComponent={
                              <div>
                                <Text noMargin textAlign="end">
                                  Total:
                                  <span style={{ color: 'var(--title-color)', fontWeight: '600', marginLeft: '0.3em' }}>
                                    {total_tickets_of_session}
                                  </span>
                                </Text>
                                <Text noMargin textAlign="end" size="lg">
                                  Balance:
                                  <span
                                    style={{
                                      marginLeft: '0.3em',
                                      color:
                                        card_tickets + total_tickets_of_session < 0
                                          ? 'var(--danger-text-color)'
                                          : 'var(--success-text-color)',
                                    }}
                                  >
                                    <b>{card_tickets + total_tickets_of_session}</b>
                                  </span>
                                </Text>
                              </div>
                            }
                          />
                        </div>
                        <Row>
                          <>
                            <Title
                              prefixIcon={sessionTypes.get(session_type).icon}
                              size="lg"
                              title={sessionTypes.get(session_type).label}
                            />
                          </>

                          {data.length >= 1 ? (
                            data.map((obj) => (
                              <ListItem
                                text={`${obj.item_name}`}
                                subtext={obj.item_barcode}
                                type="subcard"
                                suffixComponent={
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-color)' }}>
                                      <Text fontWeight="600" size="lg" color={'var(--title-color)'} noMargin>
                                        {obj.total_price}
                                      </Text>
                                      <TicketIcon width={24} style={{ marginLeft: '0.3em' }} />
                                    </span>
                                    <Text size="md" noMargin textAlign="end">
                                      <span style={{ fontSize: `14px` }}>{obj.item_quantity}x</span>
                                      {obj.item_price}
                                    </Text>
                                  </div>
                                }
                              />
                            ))
                          ) : (
                            <ListItem text={'Empty'} type="subcard" />
                          )}
                        </Row>
                      </ContentCard>
                    )
                  )}
                </>
              )}{' '}
            </div>
          </div>
          <div className="card-balance-sessions-container">
            {cardBalanceSessions && cardBalanceSessions.length > 0 && (
              <>
                <hr />
                <Title title={`Card Balance`} size="lg" />
                <div className="d-flex justify-content-center flex-wrap">
                  {cardBalanceSessions.map(({ card_number, credits, bonus, courtesy, tickets }) => (
                    <ContentCard style={{ maxWidth: 'fit-content', margin: '0.3em' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1em' }}>
                        <Title size="lg" title={`Card: ${card_number}`} subTitle={`Balance`} noMargin />
                      </div>
                      <Row>
                        <SubContentCard>
                          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1.5em' }}>
                              <Text size="sm" noMargin>
                                Tickets
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                {tickets}
                              </Text>
                            </div>{' '}
                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1.5em' }}>
                              <Text size="sm" noMargin>
                                Credits
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                {credits}
                              </Text>
                            </div>{' '}
                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1.5em' }}>
                              <Text size="sm" noMargin>
                                Bonus
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                {bonus}
                              </Text>
                            </div>{' '}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin>
                                Courtesy
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                {courtesy}
                              </Text>
                            </div>
                          </div>
                        </SubContentCard>
                      </Row>
                    </ContentCard>
                  ))}
                </div>
              </>
            )}{' '}
          </div>
        </>
      ) : (
        <ContentCard>
          <ContentNotFound
            type="warning"
            title="Failed to communicate with the service"
            text="An error occured on the network"
            buttonText="Contact Support"
            buttonAction={() => console.log('contact support')}
          />
        </ContentCard>
      )}
    </DefaultPage>
  );
}

export default ActiveSessions;
