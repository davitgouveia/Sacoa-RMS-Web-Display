import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../../hooks/ConfigContext.js';

import './SessionCard.css';

import ContentCard from '../ContentCard/ContentCard.tsx';
import SubContentCard from '../SubContentCard/SubContentCardComponent.js';
import ListItem from '../ListItem/ListItem';
import Title from '../Title/Title.tsx';
import Text from '../Text/Text.tsx';

import { TicketIcon, ReceiptRefundIcon, CreditCardIcon, WalletIcon } from '@heroicons/react/24/outline';

function SessionCard({ session, mockConfig }) {
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

  const cardBalanceSession = {
    label: 'CARD BALANCE',
    icon: <WalletIcon />,
  };

  const sessionTypes = new Map([
    [1, redemptionSession],
    [2, refundSession],
    [3, ticketTransferSession],
    [4, cardBalanceSession],
  ]);
  const { config } = useContext(ConfigContext);
  const [usedConfig, setUsedConfig] = useState();

  useEffect(() => {
    if (mockConfig) {
      setUsedConfig(mockConfig);
    } else {
      setUsedConfig(config);
    }
  }, [mockConfig]);

  const [showCardBalance, setShowCardBalance] = useState(false);

  function checkShowCardBalance(usedConfig) {
    if (
      usedConfig.cardBalance.showTickets ||
      usedConfig.cardBalance.showCredits ||
      usedConfig.cardBalance.showBonus ||
      usedConfig.cardBalance.showCourtesy
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (usedConfig) {
      const status = checkShowCardBalance(usedConfig);
      setShowCardBalance(status);
    }
  }, [usedConfig]);

  if (usedConfig) {
    return (
      <ContentCard
        classParams={'session-card'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: `column`,
          overflow: 'hidden',
          height: `100%`,
          alignContent: `flex-start`,
        }}
      >
        <div
          className="session-card-header"
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1em',
            width: '100%',
            height: 'fit-content',
            flexShrink: 0,
          }}
        >
          <div
            className="color-indicator"
            style={{
              height: '55px',
              minWidth: '55px',
              marginRight: '0.5em',
              border: '2px solid var(--border-color)',
              backgroundColor: session.session_color,
              borderRadius: 'var(--default-border-radius)',
            }}
          />
          <Title
            size="lg"
            title={`${session.card_number}`}
            subTitle={`Tickets: ${session.card_tickets}`}
            noMargin
            suffixComponent={
              <div>
                <Text noMargin textAlign="end">
                  Total:
                  <span style={{ color: 'var(--title-color)', fontWeight: '600', marginLeft: '0.3em' }}>
                    {session.total_tickets_of_session}
                  </span>
                </Text>
                <Text noMargin textAlign="end" size="lg">
                  Balance:
                  <span
                    style={{
                      marginLeft: '0.3em',
                      color:
                        session.card_tickets + session.total_tickets_of_session < 0
                          ? 'var(--danger-text-color)'
                          : 'var(--success-text-color)',
                    }}
                  >
                    <b>{session.card_tickets + session.total_tickets_of_session}</b>
                  </span>
                </Text>
              </div>
            }
          />
        </div>
        <div className="session-card-label" style={{ width: '100%', height: 'fit-content', marginBottom: '1em' }}>
          {!showCardBalance && session.session_type === 4 ? (
            <Title size="lg" title={'READY TO OPERATE'} noMargin />
          ) : (
            <Title
              prefixIcon={sessionTypes.get(session.session_type).icon}
              size="lg"
              title={sessionTypes.get(session.session_type).label}
              noMargin
            />
          )}
        </div>

        <div className="session-card-data" style={{ width: '100%', flexGrow: 1, overflow: `auto`, height: `0px` }}>
          {session.session_type === 4 ? (
            showCardBalance ? (
              <SubContentCard style={{ padding: `0.5em` }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                  {usedConfig.cardBalance.showTickets && (
                    <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text size="sm" noMargin>
                        <span id="balance-label">Tickets</span>
                      </Text>{' '}
                      <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                        <span id="balance-value">{session.card_balance.tickets}</span>
                      </Text>
                    </div>
                  )}
                  {usedConfig.cardBalance.showCredits && (
                    <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text size="sm" noMargin>
                        <span id="balance-label">Credits</span>
                      </Text>{' '}
                      <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                        <span id="balance-value">{session.card_balance.credits}</span>
                      </Text>
                    </div>
                  )}

                  {usedConfig.cardBalance.showBonus && (
                    <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text size="sm" noMargin>
                        <span id="balance-label">Bonus</span>
                      </Text>{' '}
                      <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                        <span id="balance-value">{session.card_balance.bonus}</span>
                      </Text>
                    </div>
                  )}
                  {usedConfig.cardBalance.showCourtesy && (
                    <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text size="sm" noMargin>
                        <span id="balance-label">Courtesy</span>
                      </Text>{' '}
                      <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                        <span id="balance-value">{session.card_balance.courtesy}</span>
                      </Text>
                    </div>
                  )}
                </div>
              </SubContentCard>
            ) : null
          ) : session.data.length >= 1 ? (
            session.data.map((obj) =>
              session.session_type === 1 || session.session_type === 2 ? (
                <ListItem
                  key={obj.item_barcode}
                  text={`${obj.item_name}`}
                  subtext={obj.item_barcode}
                  type="subcard"
                  style={{ padding: `0.5em` }}
                  suffixComponent={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-color)' }}>
                        <Text fontWeight="600" size="lg" color={'var(--title-color)'} noMargin>
                          {obj.total_price}
                        </Text>
                        <TicketIcon width={24} style={{ marginLeft: '0.3em' }} />
                      </span>
                      <Text size="md" noMargin textAlign="end">
                        <span style={{ fontSize: '14px' }}>{obj.item_quantity}x</span>
                        {obj.item_price}
                      </Text>
                    </div>
                  }
                />
              ) : session.session_type === 3 ? (
                <ListItem
                  key={obj.donor_card_number}
                  text={`${obj.donor_card_number}`}
                  type="subcard"
                  suffixComponent={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-color)' }}>
                        <Text fontWeight="600" size="lg" color={'var(--title-color)'} noMargin>
                          {obj.tickets_to_transfer}
                        </Text>
                        <TicketIcon width={24} style={{ marginLeft: '0.3em' }} />
                      </span>
                    </div>
                  }
                />
              ) : null
            )
          ) : (
            <ListItem text={'Empty'} type="subcard" />
          )}
        </div>
      </ContentCard>
    );
  }
}

export default SessionCard;
