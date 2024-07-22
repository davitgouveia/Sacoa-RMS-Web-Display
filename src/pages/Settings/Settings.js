import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { SquaresPlusIcon, PhotoIcon, TicketIcon } from '@heroicons/react/24/outline';

import DefaultPage from '../../components/DefaultPage/DefaultPage.tsx';
import Title from '../../components/Title/Title.tsx';
import Text from '../../components/Text/Text.tsx';
import Button from '../../components/Button/Button.tsx';

import FormControl from '../../components/FormControl/FormControl.tsx';
import FormInput from '../../components/FormInput/FormInput.tsx';
import FormSwitch from '../../components/FormSwitch/FormSwitch.tsx';

import ListItem from '../../components/ListItem/ListItem.js';
import ContentCard from '../../components/ContentCard/ContentCard.tsx';
import SubContentCard from '../../components/SubContentCard/SubContentCardComponent.js';

function Settings() {
  const [title, setTitle] = useState('Redemption Multi Sessions');

  const [titleColor, setTitleColor] = useState('#111927');
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('#F8FAFC');
  const [backgroundColor, setBackgroundColor] = useState('#F8FAFC');

  const [balanceShowCredits, setBalanceShowCredits] = useState(true);
  const [balanceShowTickets, setBalanceShowTickets] = useState(true);
  const [balanceShowBonus, setBalanceShowBonus] = useState(true);
  const [balanceShowCourtesy, setBalanceShowCourtesy] = useState(true);

  const navigate = useNavigate();

  return (
    <DefaultPage title="RMS Settings">
      <Button prefixIcon={<SquaresPlusIcon />} text="Back to RMS" type="outline" onClick={() => navigate('/')} />
      <ContentCard classParams="mt-3">
        <Title
          title={'General Styles'}
          size="lg"
          suffixComponent={
            <div className="d-flex">
              <Button text="Cancel" size="sm" type="light" disabled />
              <Button text="Save" size="sm" type="primary" style={{ marginLeft: '0.3em' }} disabled />
            </div>
          }
        />

        <Row>
          <Title title={'Page Title'} subTitle={'Customize the header text'} />
          <FormControl submitButton={false}>
            <FormInput
              classParams="mb-1"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Row>

        <Row className="mb-3">
          <Col className="px-0">
            <Title
              title={'Company Logo'}
              subTitle={'Customize your company logo to be displayed on the sessions page'}
            />
            <div
              style={{
                width: 'fit-content',
                backgroundColor: 'var(--main-background-color)',
                padding: '2em',
                marginBottom: '1em',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--default-border-radius)',
              }}
            >
              <img src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png" width={200} />
            </div>
            <Button text="Upload" size="sm" type="outline" prefixIcon={<PhotoIcon />} />
          </Col>
          <Col className="px-0">
            <Title title={'Colors'} subTitle={'Set the colors that match your brand'} />
            <div style={{ display: 'flex' }}>
              <input
                type="color"
                id="title-color"
                value={titleColor}
                onChange={(e) => setTitleColor(e.target.value)}
                style={{ maxWidth: '60px', marginRight: '0.5em' }}
              />
              <Text>Title</Text>
            </div>
            <div style={{ display: 'flex' }}>
              <input
                type="color"
                id="header-background-color"
                value={headerBackgroundColor}
                onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                style={{ maxWidth: '60px', marginRight: '0.5em' }}
              />
              <Text> Header Background</Text>
            </div>
            <div style={{ display: 'flex' }}>
              <input
                type="color"
                id="background-color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                style={{ maxWidth: '60px', marginRight: '0.5em' }}
              />
              <Text>Background</Text>
            </div>
          </Col>
        </Row>
        <Title title={'Preview'} subTitle={'Preview your changes on the fly'} />
        <div
          style={{
            backgroundColor: backgroundColor,
            height: '450px',
            border: '1px solid var(--card-border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: headerBackgroundColor,
              width: '100%',
              padding: '1em 2em 1em 2em',
              marginBottom: '1em',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 className="rms-title" style={{ color: titleColor }}>
                {title}
              </h1>
              <img src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png" width={200} />
            </div>
          </div>
          <ContentCard style={{ maxWidth: '550px', margin: '0.3em' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1em' }}>
              <div
                className="color-indicator"
                style={{
                  height: '55px',
                  minWidth: '55px',
                  marginRight: '0.5em',
                  border: '2px solid var(--border-color)',
                  backgroundColor: '#ff00ff',
                  borderRadius: 'var(--default-border-radius)',
                }}
              />
              <Title
                size="lg"
                title={`300000`}
                subTitle={`Tickets: 123456`}
                noMargin
                suffixComponent={
                  <div>
                    <Text noMargin textAlign="end">
                      Total:
                      <span style={{ color: 'var(--title-color)', fontWeight: '600', marginLeft: '0.3em' }}>
                        123456
                      </span>
                    </Text>
                    <Text noMargin textAlign="end" size="lg">
                      Balance:
                      <span
                        style={{
                          marginLeft: '0.3em',
                          color: 'var(--danger-text-color)',
                        }}
                      >
                        <b>-500</b>
                      </span>
                    </Text>
                  </div>
                }
              />
            </div>
            <Row>
              <>
                <Title prefixIcon={<TicketIcon />} size="lg" title={'REDEMPTION'} />
              </>

              <ListItem
                text={`Cherry Lollipops`}
                subtext="123456789"
                type="subcard"
                suffixComponent={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-color)' }}>
                      <Text fontWeight="600" size="lg" color={'var(--title-color)'} noMargin>
                        1500
                      </Text>
                      <TicketIcon width={24} style={{ marginLeft: '0.3em' }} />
                    </span>
                    <Text size="md" noMargin textAlign="end">
                      <span style={{ fontSize: `14px` }}>3x</span>
                      500
                    </Text>
                  </div>
                }
              />
            </Row>
          </ContentCard>
        </div>
        <Row className="mt-3">
          <Title title={'Card Balance'} />
          <Row>
            <Col md={7}>
              <ContentCard style={{ maxWidth: 'fit-content' }}>
                {!balanceShowCredits && !balanceShowTickets && !balanceShowBonus && !balanceShowCourtesy ? (
                  <Title size="lg" title={`Card: 123456`} noMargin />
                ) : (
                  <>
                    <Title size="lg" title={`Card: 123456`} />
                    <Row>
                      <SubContentCard>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                          {balanceShowTickets && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin>
                                Tickets
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                12345
                              </Text>
                            </div>
                          )}
                          {balanceShowCredits && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin>
                                Credits
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                12345
                              </Text>
                            </div>
                          )}
                          {balanceShowBonus && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin>
                                Bonus
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                12345
                              </Text>
                            </div>
                          )}
                          {balanceShowCourtesy && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin>
                                Courtesy
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin>
                                12345
                              </Text>
                            </div>
                          )}
                        </div>
                      </SubContentCard>
                    </Row>
                  </>
                )}
              </ContentCard>
            </Col>
            <Col className="px-0">
              <FormControl submitButton={false}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                  <FormSwitch
                    size="sm"
                    checked={balanceShowTickets}
                    onChange={() => setBalanceShowTickets(!balanceShowTickets)}
                  />
                  <Text noMargin>
                    <span style={{ marginLeft: '0.5em' }}>Tickets</span>
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                  <FormSwitch
                    size="sm"
                    checked={balanceShowCredits}
                    onChange={() => setBalanceShowCredits(!balanceShowCredits)}
                  />
                  <Text noMargin>
                    <span style={{ marginLeft: '0.5em' }}>Credits</span>
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                  <FormSwitch
                    size="sm"
                    checked={balanceShowBonus}
                    onChange={() => setBalanceShowBonus(!balanceShowBonus)}
                  />
                  <Text noMargin>
                    <span style={{ marginLeft: '0.5em' }}>Bonus</span>
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                  <FormSwitch
                    size="sm"
                    checked={balanceShowCourtesy}
                    onChange={() => setBalanceShowCourtesy(!balanceShowCourtesy)}
                  />
                  <Text noMargin>
                    <span style={{ marginLeft: '0.5em' }}>Courtesy</span>
                  </Text>
                </div>
              </FormControl>
            </Col>
          </Row>
        </Row>
        <div className="d-flex mt-3 w-100 justify-content-end">
          <Button text="Cancel" size="sm" type="light" disabled />
          <Button text="Save" size="sm" type="primary" style={{ marginLeft: '0.3em' }} disabled />
        </div>
      </ContentCard>
    </DefaultPage>
  );
}

export default Settings;
