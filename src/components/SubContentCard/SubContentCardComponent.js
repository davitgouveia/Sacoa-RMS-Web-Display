import './SubContentCard.css';

import Container from 'react-bootstrap/Container';

function SubContentCard({ classParams, style, children }) {
  return (
    <>
      <Container fluid id="sub-content-card" className={`${classParams}`} style={style}>
        {children}
      </Container>
    </>
  );
}

export default SubContentCard;
