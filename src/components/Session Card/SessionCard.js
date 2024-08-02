import React from 'react';

import { Row } from 'react-bootstrap';

import ContentCard from '../ContentCard/ContentCard.tsx';
import ListItem from '../ListItem/ListItem';
import Title from '../Title/Title.tsx';
import Text from '../Text/Text.tsx';

import { TicketIcon, ReceiptRefundIcon, CreditCardIcon } from '@heroicons/react/24/outline';

function SessionCard({ session }) {
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

  return (
    <ContentCard style={{ maxWidth: '550px', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1em' }}>
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
      <Row>
        <Title
          prefixIcon={sessionTypes.get(session.session_type).icon}
          size="lg"
          title={sessionTypes.get(session.session_type).label}
        />
        {session.data.length >= 1 ? (
          session.data.map((obj) =>
            session.session_type === 1 || session.session_type === 2 ? (
              <ListItem
                key={obj.item_barcode}
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
      </Row>
    </ContentCard>
  );
}

export default SessionCard;
