import { useState, useContext, useEffect } from 'react';
import { Row, Col, Modal, Placeholder } from 'react-bootstrap';

import { ThemeContext } from '../../styles/ThemeContext.js';
import { ConfigContext } from '../../hooks/ConfigContext.js';

import './settings.css';
import mockSessions from './MockingSessions.js';

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

import SessionCard from '../../components/Session Card/SessionCard.js';

function Settings() {
  const { theme, setColorTheme } = useContext(ThemeContext);
  const { config, setNewConfig } = useContext(ConfigContext);

  const [savedConfig, setSavedConfig] = useState({});
  const [currentConfig, setCurrentConfig] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      setSavedConfig(config);
      setCurrentConfig(config);

      setColorTheme(config.theme);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchConfig();
  }, [config]);

  useEffect(() => {
    setHasChanges(JSON.stringify(currentConfig) !== JSON.stringify(savedConfig));
  }, [currentConfig, savedConfig]);

  const navigate = useNavigate();

  const [enabledTitleConfig, setEnabledTitleConfig] = useState(false);
  const [enabledThemeConfig, setEnabledThemeConfig] = useState(false);
  const [enabledCardBalanceConfig, setEnabledCardBalanceConfig] = useState(false);
  const [enabledBoxDistributionConfig, setEnabledBoxDistributionConfig] = useState(false);
  const [enabledFixedBoxSizeConfig, setEnabledFixedBoxSizeConfig] = useState(false);
  const [enabledBoxNumbersConfig, setEnableBoxNumbersConfig] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [imagesPathsAvailable, setImagesPathsAvailable] = useState([]);

  async function getImagesPaths() {
    try {
      const response = await fetch('http://serverxx:1234/files/images/filenames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: 'rms-web-display/logo' }),
      });

      if (!response.ok) {
        console.error('Server error:', response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }

  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowImageModal = async () => {
    await getImagesPaths().then((paths) => setImagesPathsAvailable(paths));
    setShowImageModal(true);
  };

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

  const handleSaveConfig = () => {
    setEnabledTitleConfig(false);
    setEnabledThemeConfig(false);
    setEnabledCardBalanceConfig(false);
    setEnabledBoxDistributionConfig(false);
    setEnabledFixedBoxSizeConfig(false);
    setNewConfig(currentConfig);
  };

  return (
    <DefaultPage title="RMS Settings" subtitle="Station 1">
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
                  <Button
                    text="Save"
                    size="sm"
                    type="primary"
                    style={{ marginLeft: '0.3em' }}
                    onClick={() => handleSaveConfig()}
                  />
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
                  <img
                    src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png"
                    alt="logo"
                    width={200}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <Button text="Choose File" size="sm" type="outline" onClick={() => handleShowImageModal()} />
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
                height: '420px',
                border: '1px solid var(--card-border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'var(--main-background-color)',
              }}
            >
              <header className="sessions-header w-100">
                <Title
                  title={currentConfig.title}
                  size="xl"
                  suffixComponent={
                    <img
                      src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png"
                      alt="logo-preview"
                      width={200}
                    />
                  }
                  noMargin
                />
              </header>

              <div style={{ width: '550px', height: '260px', margin: '1em' }}>
                <SessionCard session={mockSessions[0]} />
              </div>
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
                            !enabledCardBalanceConfig
                              ? 'none'
                              : 'block',
                        }}
                      >
                        <IconButton
                          size="sm"
                          hasBorder={true}
                          icon={<ArrowUturnLeftIcon />}
                          onClick={() => {
                            setEnabledCardBalanceConfig(!enabledCardBalanceConfig);
                            setCurrentConfig({ ...currentConfig, cardBalance: { ...savedConfig.cardBalance } });
                          }}
                        />
                      </div>
                      <IconButton
                        size="sm"
                        hasBorder={true}
                        style={{ marginLeft: '0.3em' }}
                        icon={enabledCardBalanceConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                        onClick={() => setEnabledCardBalanceConfig(!enabledCardBalanceConfig)}
                      />
                    </div>
                  }
                />
                <FormControl submitButton={false}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                    <FormSwitch
                      size="sm"
                      checked={currentConfig.cardBalance.showTickets}
                      disabled={!enabledCardBalanceConfig}
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
                      disabled={!enabledCardBalanceConfig}
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
                      disabled={!enabledCardBalanceConfig}
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
                      disabled={!enabledCardBalanceConfig}
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

              <Col md={6} style={{ height: '260px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '550px', height: '250px', margin: '1em' }}>
                  <SessionCard session={mockSessions[1]} mockConfig={currentConfig} />
                </div>
              </Col>
            </Row>
            <Row>
              <Title
                title={'Box Distribution'}
                subTitle={'Choose how the sessions are displayed'}
                size="lg"
                suffixComponent={
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        display:
                          JSON.stringify(currentConfig.boxDistribution) ===
                            JSON.stringify(savedConfig.boxDistribution) || !enabledBoxDistributionConfig
                            ? 'none'
                            : 'block',
                      }}
                    >
                      <IconButton
                        size="sm"
                        hasBorder={true}
                        icon={<ArrowUturnLeftIcon />}
                        onClick={() => {
                          setEnabledBoxDistributionConfig(!enabledBoxDistributionConfig);
                          setCurrentConfig({ ...currentConfig, boxDistribution: savedConfig.boxDistribution });
                        }}
                      />
                    </div>
                    <IconButton
                      size="sm"
                      hasBorder={true}
                      style={{ marginLeft: '0.3em' }}
                      icon={enabledBoxDistributionConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                      onClick={() => setEnabledBoxDistributionConfig(!enabledBoxDistributionConfig)}
                    />
                  </div>
                }
              />
            </Row>
            <Row className="mb-4">
              <Col>
                <ContentCard
                  hover
                  selected={currentConfig.boxDistribution === 'fixed'}
                  disabled={!enabledBoxDistributionConfig}
                  onClick={() => setCurrentConfig({ ...currentConfig, boxDistribution: 'fixed' })}
                >
                  <Title title={'Fixed'} subTitle={'Fixed boxes, configurable sessions amount'} size="md" noMargin />
                </ContentCard>
              </Col>
              <Col>
                <ContentCard
                  hover
                  selected={currentConfig.boxDistribution === 'dynamic'}
                  disabled={!enabledBoxDistributionConfig}
                  onClick={() => setCurrentConfig({ ...currentConfig, boxDistribution: 'dynamic' })}
                >
                  <Title title={'Dynamic'} subTitle={'Varying size boxes, max of 6 sessions'} size="md" noMargin />
                </ContentCard>
              </Col>
            </Row>
            <div
              style={{
                display: currentConfig.boxDistribution === 'fixed' ? 'block' : 'none',
              }}
            >
              <Row>
                <Title
                  title={`Box Size`}
                  subTitle={'Choose how many sessions can be opened'}
                  size="md"
                  suffixComponent={
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '0.5em' }}>
                        <FormSwitch
                          size="sm"
                          checked={currentConfig.showBoxNumber}
                          disabled={!enabledFixedBoxSizeConfig}
                          onChange={() =>
                            setCurrentConfig({
                              ...currentConfig,
                              showBoxNumber: !currentConfig.showBoxNumber,
                            })
                          }
                        />
                        <Text noMargin>
                          <span style={{ marginLeft: '0.5em' }}>Show Box Numbers</span>
                        </Text>
                      </div>

                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            visibility:
                              (JSON.stringify(currentConfig.fixedBoxSize) ===
                                JSON.stringify(savedConfig.fixedBoxSize) &&
                                JSON.stringify(currentConfig.showBoxNumber) ===
                                  JSON.stringify(savedConfig.showBoxNumber)) ||
                              !enabledFixedBoxSizeConfig
                                ? 'hidden'
                                : 'visible',
                          }}
                        >
                          <IconButton
                            size="sm"
                            hasBorder={true}
                            icon={<ArrowUturnLeftIcon />}
                            onClick={() => {
                              setEnabledFixedBoxSizeConfig(!enabledFixedBoxSizeConfig);
                              setCurrentConfig({
                                ...currentConfig,
                                fixedBoxSize: savedConfig.fixedBoxSize,
                                showBoxNumber: savedConfig.showBoxNumber,
                              });
                            }}
                          />
                        </div>
                        <IconButton
                          size="sm"
                          hasBorder={true}
                          style={{ marginLeft: '0.3em' }}
                          icon={enabledFixedBoxSizeConfig ? <LockOpenIcon /> : <LockClosedIcon />}
                          onClick={() => setEnabledFixedBoxSizeConfig(!enabledFixedBoxSizeConfig)}
                        />
                      </div>
                    </div>
                  }
                />
              </Row>
              <Row className="mb-4">
                <Col md={4}>
                  <ContentCard
                    hover
                    selected={currentConfig.fixedBoxSize === 'small'}
                    disabled={!enabledFixedBoxSizeConfig}
                    style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column' }}
                    onClick={() => setCurrentConfig({ ...currentConfig, fixedBoxSize: 'small' })}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <Title title={'Small'} subTitle={'9 sessions available'} size="md" />
                    </div>
                    <div className={`grid-container example small box-number-${currentConfig.showBoxNumber}`}>
                      <div className="box" id="1">
                        <div className="example-box-number">1</div>
                      </div>
                      <div className="box" id="2">
                        <div className="example-box-number">2</div>
                      </div>
                      <div className="box" id="3">
                        <div className="example-box-number">3</div>
                      </div>
                      <div className="box" id="4">
                        <div className="example-box-number">4</div>
                      </div>
                      <div className="box" id="5">
                        <div className="example-box-number">5</div>
                      </div>
                      <div className="box" id="6">
                        <div className="example-box-number">6</div>
                      </div>
                      <div className="box" id="7">
                        <div className="example-box-number">7</div>
                      </div>
                      <div className="box" id="8">
                        <div className="example-box-number">8</div>
                      </div>
                      <div className="box" id="9">
                        <div className="example-box-number">9</div>
                      </div>
                    </div>
                  </ContentCard>
                </Col>
                <Col md={4}>
                  <ContentCard
                    hover
                    selected={currentConfig.fixedBoxSize === 'medium'}
                    disabled={!enabledFixedBoxSizeConfig}
                    style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column' }}
                    onClick={() => setCurrentConfig({ ...currentConfig, fixedBoxSize: 'medium' })}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <Title title={'Medium'} subTitle={'6 sessions available'} size="md" />
                    </div>
                    <div className={`grid-container example medium box-number-${currentConfig.showBoxNumber}`}>
                      <div className="box" id="1">
                        <div className="example-box-number">1</div>
                      </div>
                      <div className="box" id="2">
                        <div className="example-box-number">2</div>
                      </div>
                      <div className="box" id="3">
                        <div className="example-box-number">3</div>
                      </div>
                      <div className="box" id="4">
                        <div className="example-box-number">4</div>
                      </div>
                      <div className="box" id="5">
                        <div className="example-box-number">5</div>
                      </div>
                      <div className="box" id="6">
                        <div className="example-box-number">6</div>
                      </div>
                    </div>
                  </ContentCard>
                </Col>
                <Col md={4}>
                  <ContentCard
                    hover
                    selected={currentConfig.fixedBoxSize === 'large'}
                    disabled={!enabledFixedBoxSizeConfig}
                    style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column' }}
                    onClick={() => setCurrentConfig({ ...currentConfig, fixedBoxSize: 'large' })}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <Title title={'Large'} subTitle={'4 sessions available'} size="md" />
                    </div>
                    <div className={`grid-container example large box-number-${currentConfig.showBoxNumber}`}>
                      <div className="box" id="1">
                        <div className="example-box-number">1</div>
                      </div>
                      <div className="box" id="2">
                        <div className="example-box-number">2</div>
                      </div>
                      <div className="box" id="3">
                        <div className="example-box-number">3</div>
                      </div>
                      <div className="box" id="4">
                        <div className="example-box-number">4</div>
                      </div>
                    </div>
                  </ContentCard>
                </Col>
              </Row>
            </div>

            <Row>
              <Title title={'Administrative Tools'} />
              <Button
                text="Close All Sessions"
                type="outline"
                size="sm"
                style={{ width: '200px' }}
                onClick={() => fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/rms/closeAllSessions`)}
              />
            </Row>

            <Row>
              <div style={{ display: 'flex', justifyContent: `end`, visibility: hasChanges ? 'visible' : 'hidden' }}>
                <Button text="Cancel" size="sm" type="light" onClick={() => handleShowCancelModal()} />
                <Button
                  text="Save"
                  size="sm"
                  type="primary"
                  style={{ marginLeft: '0.3em' }}
                  onClick={() => handleSaveConfig()}
                />
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

      <Modal
        show={showImageModal}
        onHide={handleCloseImageModal}
        backdrop="static"
        size="xl"
        keyboard={false}
        scrollable
        dialogClassName="support-modal-dialog"
        contentClassName="default-modal-content"
      >
        <Modal.Header className={'default-modal-header'}>
          <Title title={`Change logo`} size="md" noMargin />
        </Modal.Header>

        <Modal.Body className={'default-modal-body'}>
          <div style={{ height: '700px' }}>
            <Title noMargin title={'Upload a new image'} />
            <SubContentCard
              classParams={'d-flex justify-content-center align-items-center'}
              style={{ height: '200px', margin: '1em 0 1em 0' }}
            >
              <Text size="lg" noMargin>
                Drag an Image here or
              </Text>
              <Button text="Upload a file" type="outline" style={{ marginLeft: '0.75em' }} size="sm" />
            </SubContentCard>
            <Title noMargin title={'Or select past images'} />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                overflowY: 'scroll',
                height: '380px',
                margin: '1em 0 0 0',
                border: `2px solid var(--border-color)`,
                borderRadius: `5px`,
              }}
            >
              {imagesPathsAvailable.length !== 0 &&
                imagesPathsAvailable.map((imagePath) => (
                  <div
                    style={{
                      height: 'fit-content',
                      maxWidth: '500px',
                      margin: '1em',
                      border: '1px solid black',
                    }}
                  >
                    <img
                      src={`http://serverxx:1234/files/images/rms-web-display/logo/${imagePath}`}
                      alt="previous-image"
                      style={{ height: 'auto', maxWidth: '100%' }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={'default-modal-footer'}>
          <div style={{ display: 'flex', justifyContent: `end` }}>
            <Button text="Cancel" size="sm" type="light" onClick={() => handleCloseImageModal()} />
            <Button
              text="Save"
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
