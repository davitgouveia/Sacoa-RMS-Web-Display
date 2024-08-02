import './ContentCard.css';
import React from 'react';
import Container from 'react-bootstrap/Container';

interface Props {
  classParams?: string;
  style?: object;
  onClick?: ()=>void,
  hover?: boolean
  disabled?: boolean,
  selected?: boolean,
  children: React.ReactNode;
}

const ContentCard: React.FC<Props> = ({ classParams='', style, selected, children, onClick, hover=false, disabled = false}) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Container fluid className={`content-card ${hover ? 'hover' : ''} ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''}  ${classParams}`} style={style} onClick={handleClick}>
        {children}
      </Container>
    </>
  );
}

export default ContentCard;
