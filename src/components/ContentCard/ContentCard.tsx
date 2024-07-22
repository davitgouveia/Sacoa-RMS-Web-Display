import './ContentCard.css';
import React from 'react';
import Container from 'react-bootstrap/Container';

interface Props {
  classParams?: string;
  style?: object;
  onClick?: ()=>void,
  hover?: boolean
  children: React.ReactNode;
}

const ContentCard: React.FC<Props> = ({ classParams='', style, children, onClick, hover=false}) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Container fluid className={`content-card ${hover ? 'hover' : ''} ${classParams}`} style={style} onClick={handleClick}>
        {children}
      </Container>
    </>
  );
}

export default ContentCard;
