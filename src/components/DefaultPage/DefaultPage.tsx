import React from 'react';

import Container from 'react-bootstrap/Container';
import Title from '../Title/Title.tsx';

import LanguageSelector from '../LanguageSelector/LanguageSelector';
import StoreSelector from '../StoreSelector/StoreSelector';

interface Props {
  title: string;
  subtitle?: string;
  fluid?: boolean;
  titleSuffixChip?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  selector?: 'language' | 'store' | '';
  children: React.ReactNode;
}

const DefaultPage: React.FC<Props> = 
({ title, subtitle, selector = '', fluid=false, children, titleSuffixChip, suffixComponent

}) => {

  const getSuffixComponent = () => {
    if (selector === 'language') {
      return <LanguageSelector />;
    } else if (selector === 'store') {
      return <StoreSelector />;
    } else {
      return suffixComponent;
    }
  };

  return (
    
      <Container fluid={fluid} style={{padding: `1em 2em 1em 2em`}}>
        <Title
        title={title}
        subTitle={subtitle}
        size={'xl'}
        suffixComponent={getSuffixComponent()} type="default" classParams='' prefixIcon={undefined} suffixChip={titleSuffixChip} />
        {children}
      </Container>
 
  );
}

export default DefaultPage;
