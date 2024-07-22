import './TableCard.css';
import React from 'react';
import Container from 'react-bootstrap/Container';

interface Props {
  classParams?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const TableCard: React.FC<Props>=({ classParams, style, children }) => {
  return (
    <>
      <Container fluid className={`table-card ${classParams}`} style={style}>
        {children}
      </Container>
    </>
  );
}

export default TableCard;
