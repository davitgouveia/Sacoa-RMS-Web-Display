import './Title.css';
import React from 'react'

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

interface Props {
  title: String,
  subTitle?: String
  type: 'default' | 'tablecard',
  size: 'sm' | 'md' | 'lg' | 'xl',
  prefixIcon?: React.ReactNode | undefined,
  suffixChip?: React.ReactNode | undefined,
  suffixComponent?: React.ReactNode | undefined,
  classParams?: String,
  noMargin? : boolean,
}

const Title: React.FC<Props> = ({ title, type = 'default', subTitle, prefixIcon, suffixChip, suffixComponent, size, classParams = '', noMargin }) => {
  return (
    <>
      <Container fluid className={`title-container ${type}`}>
        <Row className={`title-component ${size || 'md'} ${noMargin ? 'no-margin' : ''} ${classParams}`}>
          {prefixIcon && <div id="prefix-area">{prefixIcon && <span className='icon'>{prefixIcon}</span>}</div>}
          <div id="text-area">
            <h1 id="title-text">
              {title}
              {suffixChip && <span id="title-chip">{suffixChip}</span>}
            </h1>
            {subTitle && <p id="subtitle-text">{subTitle}</p>}
          </div>
          <div id="suffix-area">{suffixComponent && <span>{suffixComponent}</span>}</div>
        </Row>
      </Container>
    </>
  );
}

export default Title;
