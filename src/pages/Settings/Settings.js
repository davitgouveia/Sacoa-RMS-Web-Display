import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import './settings.css';
import DEFAULT_SETTINGS from './defaultSettings.js';

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

  const [cardTitleColor, setCardTitleColor] = useState('#111927');
  const [cardSubtitleColor, setCardSubtitleColor] = useState('#525863');
  const [cardTextColor, setCardTextColor] = useState('#545963');
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#ffffff');
  const [cardSecondaryBackgroundColor, setCardSecondaryBackgroundColor] = useState('#F8FAFC');
  const [cardPositiveTextColor, setCardPositiveTextColor] = useState('#3A740A');
  const [cardNegativeTextColor, setCardNegativeTextColor] = useState('#6927DA');

  const [balanceShowCredits, setBalanceShowCredits] = useState(true);
  const [balanceShowTickets, setBalanceShowTickets] = useState(true);
  const [balanceShowBonus, setBalanceShowBonus] = useState(true);
  const [balanceShowCourtesy, setBalanceShowCourtesy] = useState(true);

  const showColorConfig = false;

  const setTheme = ({ theme }) => {
    const selectedTheme = DEFAULT_SETTINGS[theme];
    setTitleColor(selectedTheme.titleColor);
    setHeaderBackgroundColor(selectedTheme.headerBackgroundColor);
    setBackgroundColor(selectedTheme.backgroundColor);
    setCardTitleColor(selectedTheme.cardTitleColor);
    setCardSubtitleColor(selectedTheme.cardSubtitleColor);
    setCardTextColor(selectedTheme.cardTextColor);
    setCardBackgroundColor(selectedTheme.cardBackgroundColor);
    setCardSecondaryBackgroundColor(selectedTheme.cardSecondaryBackgroundColor);
    setCardPositiveTextColor(selectedTheme.cardPositiveTextColor);
    setCardNegativeTextColor(selectedTheme.cardNegativeTextColor);
  };

  const navigate = useNavigate();

  return (
    <DefaultPage title="RMS Settings">
      <Button prefixIcon={<SquaresPlusIcon />} text="Back to RMS" type="outline" onClick={() => navigate('/')} />
      <ContentCard classParams="mt-3">
        <Title
          title={'Customizable Styles'}
          size="lg"
          suffixComponent={
            <div className="d-flex">
              <Button text="Cancel" size="sm" type="light" disabled />
              <Button text="Save" size="sm" type="primary" style={{ marginLeft: '0.3em' }} disabled />
            </div>
          }
        />

        <Row>
          <Col className="px-0" md={5}>
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
            <div className="d-flex justify-content-center">
              <Button
                text="Reset to default"
                type="light"
                size="sm"
                onClick={() => setTitle('Redemption Multi Sessions')}
              />
            </div>
          </Col>
          <Col md={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ borderLeft: '1px solid var(--border-color)', height: 'auto' }} />
          </Col>
          <Col className="px-0" md={5}>
            <Title
              title={'Company Logo'}
              subTitle={'Customize your company logo to be displayed on the sessions page'}
            />
            <div
              style={{
                display: `flex`,
                justifyContent: `end`,
                width: '100%',
                backgroundColor: 'var(--main-background-color)',
                padding: '2em',
                marginBottom: '1em',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--default-border-radius)',
              }}
            >
              <img src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png" width={200} />
            </div>
            <div className="d-flex justify-content-end">
              <Button text="Choose File" size="sm" type="outline" />
              <Button text="Upload" size="sm" type="outline" style={{ marginLeft: '0.3em' }} />
            </div>
            <form
              style={{ display: `none` }}
              action="http://localhost:1234/files/images/rms/upload/logo"
              method="POST"
              enctype="multipart/form-data"
            >
              <input type="file" name="file" required />
              <button type="submit">Upload</button>
            </form>
          </Col>
        </Row>

        <Row className="mb-3">
          <Title title={'Themes'} subTitle={'Set the color theme of your desire'} />
          <div className="d-flex">
            <Button text="Light Theme" size="sm" type="light" onClick={() => setTheme(`DEFAULT_THEME`)} />
            <Button
              text="Dark Theme"
              size="sm"
              type="primary"
              onClick={() => setTheme(`DARK_THEME`)}
              style={{ marginLeft: '0.3em' }}
            />
          </div>
          {showColorConfig && (
            <Row>
              <Title title={'Colors'} subTitle={'Set the colors to match your brand'} />
              <Col className="px-0" md={5}>
                <Title title={'Page'} size="sm" />
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
              <Col md={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ borderLeft: '1px solid var(--border-color)', height: 'auto' }} />
              </Col>
              <Col className="px-0" md={5}>
                <Title title={'Cards'} size="sm" />
                <Row>
                  <Col className="px-0">
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-title-color"
                        value={cardTitleColor}
                        onChange={(e) => setCardTitleColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Title</Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-subtitle-color"
                        value={cardSubtitleColor}
                        onChange={(e) => setCardSubtitleColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Subtitle</Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-background-color"
                        value={cardBackgroundColor}
                        onChange={(e) => setCardBackgroundColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Background</Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-secondary-background-color"
                        value={cardSecondaryBackgroundColor}
                        onChange={(e) => setCardSecondaryBackgroundColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Secondary Background</Text>
                    </div>
                  </Col>
                  <Col className="px-0">
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-text-color"
                        value={cardTextColor}
                        onChange={(e) => setCardTextColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Text</Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-positive-text-color"
                        value={cardPositiveTextColor}
                        onChange={(e) => setCardPositiveTextColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Positive Text</Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="color"
                        id="card-negative-text-color"
                        value={cardNegativeTextColor}
                        onChange={(e) => setCardNegativeTextColor(e.target.value)}
                        style={{ maxWidth: '60px', marginRight: '0.5em' }}
                      />
                      <Text>Negative Text</Text>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
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
          <ContentCard style={{ maxWidth: '550px', margin: '0.3em', backgroundColor: cardBackgroundColor }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1em' }}>
              <div
                className="color-indicator"
                style={{
                  height: '55px',
                  minWidth: '55px',
                  marginRight: '0.5em',
                  border: '2px solid var(--border-color)',
                  backgroundColor: '#ff0000',
                  borderRadius: 'var(--default-border-radius)',
                }}
              />
              <Title
                size="lg"
                title={`300000`}
                subTitle={`Tickets: 123456`}
                titleColor={cardTitleColor}
                subTitleColor={cardSubtitleColor}
                noMargin
                suffixComponent={
                  <div>
                    <Text noMargin textAlign="end" color={cardTextColor}>
                      Total:
                      <span style={{ color: cardTitleColor, fontWeight: '600', marginLeft: '0.3em' }}>123456</span>
                    </Text>
                    <Text noMargin textAlign="end" size="lg" color={cardTextColor}>
                      Balance:
                      <span
                        style={{
                          marginLeft: '0.3em',
                          color: cardNegativeTextColor,
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
                <Title prefixIcon={<TicketIcon />} titleColor={cardTitleColor} size="lg" title={'REDEMPTION'} />
              </>

              <ListItem
                text={`Cherry Lollipops`}
                subtext="123456789"
                type="subcard"
                textColor={cardTitleColor}
                subtextColor={cardSubtitleColor}
                style={{ backgroundColor: cardSecondaryBackgroundColor }}
                suffixComponent={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: cardTitleColor }}>
                      <Text fontWeight="600" size="lg" color={cardTitleColor} noMargin>
                        1500
                      </Text>
                      <TicketIcon width={24} style={{ marginLeft: '0.3em' }} />
                    </span>
                    <Text size="md" noMargin textAlign="end" color={cardTextColor}>
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
          <Title title={'Card Balance'} subTitle={'Choose what will be displayed'} />
          <Row>
            <Col className="px-0" md={2}>
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
            <Col md={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ borderLeft: '1px solid var(--border-color)', height: 'auto' }} />
            </Col>
            <Col md={5} style={{ height: '210px' }}>
              <ContentCard style={{ maxWidth: 'fit-content', backgroundColor: cardBackgroundColor }}>
                {!balanceShowCredits && !balanceShowTickets && !balanceShowBonus && !balanceShowCourtesy ? (
                  <Title size="lg" title={`Card: 123456`} titleColor={cardTitleColor} noMargin />
                ) : (
                  <>
                    <Title size="lg" title={`Card: 123456`} titleColor={cardTitleColor} />
                    <Row>
                      <SubContentCard style={{ backgroundColor: cardSecondaryBackgroundColor }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                          {balanceShowTickets && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin color={cardTextColor}>
                                Tickets
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin color={cardTextColor}>
                                12345
                              </Text>
                            </div>
                          )}
                          {balanceShowCredits && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin color={cardTextColor}>
                                Credits
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin color={cardTextColor}>
                                12345
                              </Text>
                            </div>
                          )}
                          {balanceShowBonus && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin color={cardTextColor}>
                                Bonus
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin color={cardTextColor}>
                                12345
                              </Text>
                            </div>
                          )}
                          {balanceShowCourtesy && (
                            <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                              <Text size="sm" noMargin color={cardTextColor}>
                                Courtesy
                              </Text>{' '}
                              <Text size="lg" fontWeight="600" noMargin color={cardTextColor}>
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
