import './Title.css';
import React from 'react'

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

interface Props {
  title: String,
  titleColor?: string;
  subTitle?: String
  subTitleColor?: string;
  type: 'default' | 'tablecard',
  size: 'sm' | 'md' | 'lg' | 'xl',
  prefixIcon?: React.ReactNode | undefined,
  suffixChip?: React.ReactNode | undefined,
  suffixComponent?: React.ReactNode | undefined,
  classParams?: String,
  noMargin? : boolean,
}

const Title: React.FC<Props> = ({ title, titleColor, type = 'default',  subTitle, subTitleColor, prefixIcon, suffixChip, suffixComponent, size, classParams = '', noMargin }) => {
  return (
    <>
      <Container fluid className={`title-container ${type}`}>
        <Row className={`title-component ${size || 'md'} ${noMargin ? 'no-margin' : ''} ${classParams}`}>
          {prefixIcon && <div id="prefix-area">{prefixIcon && <span className='icon' style={{color: titleColor ? titleColor : ''}} >{prefixIcon}</span>}</div>}
          <div id="text-area">
            <h1 id="title-text" style={{color: titleColor ? titleColor : ''}}>
              {title}
              {suffixChip && <span id="title-chip">{suffixChip}</span>}
            </h1>
            {subTitle && <p id="subtitle-text" style={{color: subTitleColor ? subTitleColor : ''}}>{subTitle}</p>}
          </div>
          <div id="suffix-area">{suffixComponent && <span>{suffixComponent}</span>}</div>
        </Row>
      </Container>
    </>
  );
}

export default Title;
