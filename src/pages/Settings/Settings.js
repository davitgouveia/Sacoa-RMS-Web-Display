import { useState, useContext, useEffect } from 'react';
import { Row, Col, Modal, Placeholder } from 'react-bootstrap';

import { ThemeContext } from '../../styles/ThemeContext.js';
import './settings.css';
import DEFAULT_SETTINGS from './defaultSettings.js';

import { useNavigate } from 'react-router-dom';
import {
  SquaresPlusIcon,
  TicketIcon,
  LockOpenIcon,
  LockClosedIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';

import DefaultPage from '../../components/DefaultPage/DefaultPage.tsx';
import Title from '../../components/Title/Title.tsx';
import Text from '../../components/Text/Text.tsx';
import Button from '../../components/Button/Button.tsx';
import IconButton from '../../components/IconButton/IconButton.tsx';

import FormControl from '../../components/FormControl/FormControl.tsx';
import FormInput from '../../components/FormInput/FormInput.tsx';
import FormSwitch from '../../components/FormSwitch/FormSwitch.tsx';

import ListItem from '../../components/ListItem/ListItem.js';
import ContentCard from '../../components/ContentCard/ContentCard.tsx';
import SubContentCard from '../../components/SubContentCard/SubContentCardComponent.js';

function getSavedConfig() {
  const config = {
    title: 'Redemption Multi Sessions',
    theme: 'light',
    cardBalance: {
      showTickets: true,
      showCredits: true,
      showBonus: true,
      showCourtesy: false,
    },
  };

  return config;
}

function Settings() {
  const [savedConfig, setSavedConfig] = useState({});
  const [currentConfig, setCurrentConfig] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const { theme, setColorTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getSavedConfig();

      setSavedConfig(config);
      setCurrentConfig(config);

      setColorTheme(config.theme);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    setHasChanges(JSON.stringify(currentConfig) !== JSON.stringify(savedConfig));
  }, [currentConfig, savedConfig]);

  const navigate = useNavigate();

  const [enabledTitleConfig, setEnabledTitleConfig] = useState(false);
  const [enabledThemeConfig, setEnabledThemeConfig] = useState(false);
  const [enableCardBalanceConfig, setEnabledCardBalanceConfig] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleCloseCancelModal = () => setShowCancelModal(false);
  const handleShowCancelModal = () => setShowCancelModal(true);

  const handleResetSettings = () => {
    setCurrentConfig(savedConfig);
    setColorTheme(savedConfig.theme);

    setEnabledThemeConfig(false);
    setEnabledTitleConfig(false);
    setEnabledCardBalanceConfig(false);

    handleCloseCancelModal();
  };

  return (
    <DefaultPage title="RMS Settings">
      <Button prefixIcon={<SquaresPlusIcon />} text="Back to RMS" type="outline" onClick={() => navigate('/')} />
      <ContentCard classParams="mt-3">
        {!isLoading ? (
          <>
            <Title
              title={'Customizable Styles'}
              size="lg"
              suffixComponent={
                <div style={{ display: 'flex', visibility: hasChanges ? 'visible' : 'hidden' }}>
                  <Button text="Cancel" size="sm" type="light" onClick={() => handleShowCancelModal()} />
                  <Button text="Save" size="sm" type="primary" style={{ marginLeft: '0.3em' }} />
                </div>
              }
            />

            <Row>
              <Col md={6}>
                <Title
                  title={'Page Title'}
                  subTitle={'Customize the header text'}
                  suffixComponent={
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          display: currentConfig.title === savedConfig.title || !enabledTitleConfig ? 'none' : 'block',
                        }}
                      >
                        <IconButton
                          size="sm"
                          hasBorder={true}
                          icon={<ArrowUturnLeftIcon />}
                          onClick={() => {
                            setEnabledTitleConfig(!enabledTitleConfig);
                            setCurrentConfig({ ...currentConfig, title: savedConfig.title });
                          }}
                        />
                      </div>
                      <IconButton
                        size="sm"
                        hasBorder={true}
                        style={{ marginLeft: '0.3em' }}
                        icon={enabledTitleConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                        onClick={() => setEnabledTitleConfig(!enabledTitleConfig)}
                      />
                    </div>
                  }
                />
                <FormControl submitButton={false}>
                  <FormInput
                    classParams="mb-1"
                    id="title"
                    type="text"
                    value={currentConfig.title}
                    disabled={!enabledTitleConfig}
                    onChange={(e) => setCurrentConfig({ ...currentConfig, title: e.target.value })}
                  />
                </FormControl>
              </Col>

              <Col md={6}>
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

            <Row className="mb-5">
              <Col md={6}>
                <Title
                  title={'Themes'}
                  subTitle={'Set the color theme of your desire'}
                  suffixComponent={
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: theme === savedConfig.theme || !enabledThemeConfig ? 'none' : 'block' }}>
                        <IconButton
                          size="sm"
                          hasBorder={true}
                          icon={<ArrowUturnLeftIcon />}
                          onClick={() => {
                            setEnabledThemeConfig(!enabledThemeConfig);
                            setCurrentConfig({ ...currentConfig, theme: savedConfig.theme });
                            setColorTheme(savedConfig.theme);
                          }}
                        />
                      </div>

                      <IconButton
                        size="sm"
                        hasBorder={true}
                        style={{ marginLeft: '0.3em' }}
                        icon={enabledThemeConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                        onClick={() => setEnabledThemeConfig(!enabledThemeConfig)}
                      />
                    </div>
                  }
                />
                <div className="d-flex">
                  <Button
                    text="Light Theme"
                    size="sm"
                    type={theme === 'dark' ? 'primary' : 'light'}
                    disabled={theme === 'light' || !enabledThemeConfig}
                    onClick={() => {
                      setColorTheme(`light`);
                      setCurrentConfig({ ...currentConfig, theme: 'light' });
                    }}
                  />
                  <Button
                    text="Dark Theme"
                    size="sm"
                    type={theme === 'light' ? 'primary' : 'light'}
                    disabled={theme === 'dark' || !enabledThemeConfig}
                    onClick={() => {
                      setColorTheme(`dark`);
                      setCurrentConfig({ ...currentConfig, theme: 'dark' });
                    }}
                    style={{ marginLeft: '0.3em' }}
                  />
                </div>
              </Col>

              <Col></Col>
            </Row>
            <Title title={'Preview'} size="lg" subTitle={'Preview your changes on the fly'} />
            <div
              style={{
                height: '450px',
                border: '1px solid var(--card-border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'var(--main-background-color)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '1em 2em 1em 2em',
                  marginBottom: '1em',
                }}
              >
                <Title
                  title={currentConfig.title}
                  size="xl"
                  suffixComponent={
                    <img src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png" width={200} />
                  }
                  noMargin
                />
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
                      backgroundColor: '#ff0000',
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
                          <span style={{ fontWeight: '600', marginLeft: '0.3em', color: 'var(--title-color)' }}>
                            123456
                          </span>
                        </Text>
                        <Text noMargin textAlign="end" size="lg" color="var(--title-color)">
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
                        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--title-color)' }}>
                          <Text fontWeight="600" size="lg" color="var(--title-color)" noMargin>
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

            <Row className="mb-4 mt-4">
              <Col md={6}>
                <Title
                  title={'Card Balance'}
                  subTitle={'Choose what will be displayed'}
                  suffixComponent={
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          display:
                            JSON.stringify(currentConfig.cardBalance) === JSON.stringify(savedConfig.cardBalance) ||
                            !enableCardBalanceConfig
                              ? 'none'
                              : 'block',
                        }}
                      >
                        <IconButton
                          size="sm"
                          hasBorder={true}
                          icon={<ArrowUturnLeftIcon />}
                          onClick={() => {
                            setEnabledCardBalanceConfig(!enableCardBalanceConfig);
                            setCurrentConfig({ ...currentConfig, cardBalance: { ...savedConfig.cardBalance } });
                          }}
                        />
                      </div>
                      <IconButton
                        size="sm"
                        hasBorder={true}
                        style={{ marginLeft: '0.3em' }}
                        icon={enableCardBalanceConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                        onClick={() => setEnabledCardBalanceConfig(!enableCardBalanceConfig)}
                      />
                    </div>
                  }
                />
                <FormControl submitButton={false}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                    <FormSwitch
                      size="sm"
                      checked={currentConfig.cardBalance.showTickets}
                      disabled={!enableCardBalanceConfig}
                      onChange={() =>
                        setCurrentConfig({
                          ...currentConfig,
                          cardBalance: {
                            ...currentConfig.cardBalance,
                            showTickets: !currentConfig.cardBalance.showTickets,
                          },
                        })
                      }
                    />
                    <Text noMargin>
                      <span style={{ marginLeft: '0.5em' }}>Tickets</span>
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                    <FormSwitch
                      size="sm"
                      checked={currentConfig.cardBalance.showCredits}
                      disabled={!enableCardBalanceConfig}
                      onChange={() =>
                        setCurrentConfig({
                          ...currentConfig,
                          cardBalance: {
                            ...currentConfig.cardBalance,
                            showCredits: !currentConfig.cardBalance.showCredits,
                          },
                        })
                      }
                    />
                    <Text noMargin>
                      <span style={{ marginLeft: '0.5em' }}>Credits</span>
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                    <FormSwitch
                      size="sm"
                      checked={currentConfig.cardBalance.showBonus}
                      disabled={!enableCardBalanceConfig}
                      onChange={() =>
                        setCurrentConfig({
                          ...currentConfig,
                          cardBalance: {
                            ...currentConfig.cardBalance,
                            showBonus: !currentConfig.cardBalance.showBonus,
                          },
                        })
                      }
                    />
                    <Text noMargin>
                      <span style={{ marginLeft: '0.5em' }}>Bonus</span>
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                    <FormSwitch
                      size="sm"
                      checked={currentConfig.cardBalance.showCourtesy}
                      disabled={!enableCardBalanceConfig}
                      onChange={() =>
                        setCurrentConfig({
                          ...currentConfig,
                          cardBalance: {
                            ...currentConfig.cardBalance,
                            showCourtesy: !currentConfig.cardBalance.showCourtesy,
                          },
                        })
                      }
                    />
                    <Text noMargin>
                      <span style={{ marginLeft: '0.5em' }}>Courtesy</span>
                    </Text>
                  </div>
                </FormControl>
              </Col>

              <Col md={6} style={{ height: '210px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ContentCard style={{ maxWidth: 'fit-content' }}>
                  {!currentConfig.cardBalance.showTickets &&
                  !currentConfig.cardBalance.showCredits &&
                  !currentConfig.cardBalance.showBonus &&
                  !currentConfig.cardBalance.showCourtesy ? (
                    <Title size="lg" title={`Card: 123456`} noMargin />
                  ) : (
                    <>
                      <Title size="lg" title={`Card: 123456`} />
                      <Row>
                        <SubContentCard>
                          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            {currentConfig.cardBalance.showTickets && (
                              <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text size="sm" noMargin>
                                  Tickets
                                </Text>{' '}
                                <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                                  12345
                                </Text>
                              </div>
                            )}
                            {currentConfig.cardBalance.showCredits && (
                              <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text size="sm" noMargin>
                                  Credits
                                </Text>{' '}
                                <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                                  12345
                                </Text>
                              </div>
                            )}
                            {currentConfig.cardBalance.showBonus && (
                              <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text size="sm" noMargin>
                                  Bonus
                                </Text>{' '}
                                <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
                                  12345
                                </Text>
                              </div>
                            )}
                            {currentConfig.cardBalance.showCourtesy && (
                              <div className="mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text size="sm" noMargin>
                                  Courtesy
                                </Text>{' '}
                                <Text size="lg" fontWeight="600" noMargin color="var(--title-color)">
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
            <Row>
              <Title title={`Cards Orientation`} subTitle={'Choose the flow of the cards structure'} size="lg" />
            </Row>
            <Row className="mb-4">
              <Title
                title={`Vertical Flow`}
                size="md"
                suffixComponent={
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        display:
                          JSON.stringify(currentConfig.cardBalance) === JSON.stringify(savedConfig.cardBalance) ||
                          !enableCardBalanceConfig
                            ? 'none'
                            : 'block',
                      }}
                    >
                      <IconButton
                        size="sm"
                        hasBorder={true}
                        icon={<ArrowUturnLeftIcon />}
                        onClick={() => {
                          setEnabledCardBalanceConfig(!enableCardBalanceConfig);
                          setCurrentConfig({ ...currentConfig, cardBalance: { ...savedConfig.cardBalance } });
                        }}
                      />
                    </div>
                    <IconButton
                      size="sm"
                      hasBorder={true}
                      style={{ marginLeft: '0.3em' }}
                      icon={enableCardBalanceConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                      onClick={() => setEnabledCardBalanceConfig(!enableCardBalanceConfig)}
                    />
                  </div>
                }
              />
              <Col>
                <ContentCard hover style={{ height: '200px', width: '370px' }}>
                  <Title title={'Ascending'} size="md" />
                </ContentCard>
              </Col>
              <Col>
                <ContentCard hover selected style={{ height: '200px', width: '370px' }}>
                  <Title title={'Descending'} size="md" />
                </ContentCard>
              </Col>
            </Row>
            <Row>
              <Title
                title={`Horizontal Flow`}
                size="md"
                suffixComponent={
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        display:
                          JSON.stringify(currentConfig.cardBalance) === JSON.stringify(savedConfig.cardBalance) ||
                          !enableCardBalanceConfig
                            ? 'none'
                            : 'block',
                      }}
                    >
                      <IconButton
                        size="sm"
                        hasBorder={true}
                        icon={<ArrowUturnLeftIcon />}
                        onClick={() => {
                          setEnabledCardBalanceConfig(!enableCardBalanceConfig);
                          setCurrentConfig({ ...currentConfig, cardBalance: { ...savedConfig.cardBalance } });
                        }}
                      />
                    </div>
                    <IconButton
                      size="sm"
                      hasBorder={true}
                      style={{ marginLeft: '0.3em' }}
                      icon={enableCardBalanceConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                      onClick={() => setEnabledCardBalanceConfig(!enableCardBalanceConfig)}
                    />
                  </div>
                }
              />
              <Col>
                <ContentCard hover style={{ height: '200px', width: '370px' }}>
                  <Title title={'Left to Right'} size="md" />
                </ContentCard>
              </Col>
              <Col>
                <ContentCard hover selected style={{ height: '200px', width: '370px' }}>
                  <Title title={'Middle'} size="md" />
                </ContentCard>
              </Col>
              <Col>
                <ContentCard hover style={{ height: '200px', width: '370px' }}>
                  <Title title={'Right to Left'} size="md" />
                </ContentCard>
              </Col>
            </Row>
            <Row>
              <div style={{ display: 'flex', justifyContent: `end`, visibility: hasChanges ? 'visible' : 'hidden' }}>
                <Button text="Cancel" size="sm" type="light" onClick={() => handleShowCancelModal()} />
                <Button text="Save" size="sm" type="primary" style={{ marginLeft: '0.3em' }} />
              </div>
            </Row>
          </>
        ) : (
          <>
            <Placeholder as="h1" animation="glow" className="custom-placeholder mb-5">
              <Placeholder xs={6} />
            </Placeholder>

            <Row>
              <Col md={6}>
                <Placeholder as="h3" animation="glow" className="custom-placeholder">
                  <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="h3" animation="glow" className="custom-placeholder">
                  <Placeholder xs={9} />
                </Placeholder>
              </Col>

              <Col md={6}>
                <Placeholder as="h3" animation="glow" className="custom-placeholder">
                  <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="h3" animation="glow" className="custom-placeholder">
                  <Placeholder xs={9} />
                </Placeholder>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Placeholder as="h3" animation="glow" className="custom-placeholder mb-5">
                  <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="h3" animation="glow" className="custom-placeholder mb-5">
                  <Placeholder xs={9} />
                  <Placeholder xs={5} />
                </Placeholder>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Placeholder as="h3" animation="glow" className="custom-placeholder mb-4">
                  <Placeholder xs={4} />
                  <Placeholder xs={5} />
                  <Placeholder xs={6} />
                </Placeholder>
              </Col>
            </Row>
            <Row>
              <div
                style={{
                  height: '450px',
                  border: '1px solid var(--card-border-color)',
                  marginBottom: '1em',
                  backgroundColor: 'var(--main-background-color)',
                }}
              />
            </Row>
            <Row>
              <Placeholder as="h3" animation="glow" className="custom-placeholder mb-5">
                <Placeholder xs={4} />
              </Placeholder>
              <Placeholder as="h3" animation="glow" className="custom-placeholder mb-5">
                <Placeholder xs={6} />
                <Placeholder xs={5} />
                <Placeholder xs={4} />
                <Placeholder xs={4} />
              </Placeholder>
            </Row>
          </>
        )}
      </ContentCard>
      <Modal
        show={showCancelModal}
        onHide={handleCloseCancelModal}
        backdrop="static"
        keyboard={false}
        scrollable
        dialogClassName="support-modal-dialog"
        contentClassName="default-modal-content"
      >
        <Modal.Header className={'default-modal-header'}>
          <Title title={`Reset Settings`} size="md" noMargin />
        </Modal.Header>

        <Modal.Body className={'default-modal-body'}>
          <Text noMargin>Are you sure you want to cancel your changes?</Text>
        </Modal.Body>
        <Modal.Footer className={'default-modal-footer'}>
          <div style={{ display: 'flex', justifyContent: `end` }}>
            <Button text="No" size="sm" type="light" onClick={() => handleCloseCancelModal(false)} />
            <Button
              text="Yes"
              size="sm"
              type="primary"
              style={{ marginLeft: '0.3em' }}
              onClick={() => handleResetSettings()}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </DefaultPage>
  );
}

export default Settings;
