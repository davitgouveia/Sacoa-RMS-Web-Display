import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import './SwaggerWrapper.css'
import SwaggerIU from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import Chip from '../Chip/Chip.tsx';
import Button from '../Button/Button.tsx';
import DefaultPage from '../DefaultPage/DefaultPage.tsx';

interface Props {
  spec: any;
}

const SwaggerWrapper: React.FC<Props> = 
({ spec

}) => {
const navigate = useNavigate();
  return (
    
    <DefaultPage
    title={spec.info.title}
    subtitle={spec.info.description}
    titleSuffixChip={ 
      <div className="d-flex">
        <Chip variant="neutral">{spec.info.version}</Chip>
        <Chip classParams={'mx-1'} variant="success">OAS {spec.openapi}</Chip>
      </div>
    }
  >
    <Row>
    <div className='px-0 mb-3'><Button type='outline' size='sm' text='Back to documents' prefixIcon={<ArrowLeftIcon/>} onClick={()=>navigate('/docs')}/></div>
    <SwaggerIU spec={spec} />
    </Row>
    
  </DefaultPage>
 
  );
}

export default SwaggerWrapper;
