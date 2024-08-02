import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './ActiveSessions.css';

import { ConfigContext } from '../../hooks/ConfigContext.js';

import ContentCard from '../../components/ContentCard/ContentCard.tsx';
import Title from '../../components/Title/Title.tsx';
import ContentNotFound from '../../components/ContentNotFound/ContentNotFound.tsx';
import SessionCard from '../../components/Session Card/SessionCard.js';

function ActiveSessions() {
  const { config } = useContext(ConfigContext);
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  //const [sessionTimeout, setSessionTimeout] = useState(60000);
  const [sessionBox1, setSessionBox1] = useState({});
  const [sessionBox2, setSessionBox2] = useState({});
  const [sessionBox3, setSessionBox3] = useState({});
  const [sessionBox4, setSessionBox4] = useState({});
  const [sessionBox5, setSessionBox5] = useState({});
  const [sessionBox6, setSessionBox6] = useState({});
  const [sessionBox7, setSessionBox7] = useState({});
  const [sessionBox8, setSessionBox8] = useState({});
  const [sessionBox9, setSessionBox9] = useState({});

  const [cardBalanceSessions, setCardBalanceSessions] = useState([]);
  //const [cardBalanceSessionTimeout, setCardBalanceSessionTimeout] = useState(60000);
  const [hasConnection, setHasConnection] = useState(true);

  useEffect(() => {
    async function getConfig() {
      try {
        const response = await fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/info`);
        const data = await response.json();
        console.log(data);
        //setSessionTimeout(data.sessionTimeout);
        //setCardBalanceSessionTimeout(data.cardBalanceTimeout);
        setHasConnection(true);
      } catch (error) {
        console.error(`Error connection to web service:`, error);
        setHasConnection(false);
      }
    }
    getConfig();
  }, []);

  async function getSessions() {
    try {
      const response = await fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/rms/sessions`);
      const data = await response.json();
      setSessions(data.map((session) => ({ ...session })));
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  async function getCardBalanceSessions() {
    try {
      const response = await fetch(`${process.env.REACT_APP_RWS_API_ADDRESS}/rms/cardBalanceSessions`);
      const data = await response.json();
      setCardBalanceSessions(data.map((session) => ({ ...session })));
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  useEffect(() => {
    if (hasConnection) {
      const interval = setInterval(() => {
        getSessions();
        getCardBalanceSessions();
      }, 200);
      return () => clearInterval(interval);
    }
  }, [hasConnection]);

  return (
    <div style={{ display: `flex`, flexDirection: `column`, height: '100vh' }}>
      <header className="sessions-header">
        <Title
          title={config.title}
          size="xl"
          suffixComponent={
            <img
              src="https://seeklogo.com/images/S/Sacoa-logo-C8B8C1B61A-seeklogo.com.png"
              alt="logo-preview"
              width={200}
              onClick={() => navigate('/settings')}
            />
          }
          noMargin
        />
      </header>

      {hasConnection ? (
        config.boxDistribution === 'fixed' ? (
          <div className={`grid-container ${config.fixedBoxSize} box-number-${config.showBoxNumber}`}>
            <div className="box" id="1">
              {Object.keys(sessionBox1).length > 0 ? (
                <SessionCard session={sessionBox1} />
              ) : (
                <div className="box-number">1</div>
              )}
            </div>
            <div className="box" id="2">
              {Object.keys(sessionBox2).length > 0 ? (
                <SessionCard session={sessionBox2} />
              ) : (
                <div className="box-number">2</div>
              )}
            </div>
            <div className="box" id="3">
              {Object.keys(sessionBox3).length > 0 ? (
                <SessionCard session={sessionBox3} />
              ) : (
                <div className="box-number">3</div>
              )}
            </div>
            <div className="box" id="4">
              {Object.keys(sessionBox4).length > 0 ? (
                <SessionCard session={sessionBox4} />
              ) : (
                <div className="box-number">4</div>
              )}
            </div>
            <div className="box" id="5">
              {Object.keys(sessionBox5).length > 0 ? (
                <SessionCard session={sessionBox5} />
              ) : (
                <div className="box-number">5</div>
              )}
            </div>
            <div className="box" id="6">
              {Object.keys(sessionBox6).length > 0 ? (
                <SessionCard session={sessionBox6} />
              ) : (
                <div className="box-number">6</div>
              )}
            </div>
            {config.fixedBoxSize === 'small' && (
              <>
                <div className="box" id="7">
                  {Object.keys(sessionBox7).length > 0 ? (
                    <SessionCard session={sessionBox7} />
                  ) : (
                    <div className="box-number">7</div>
                  )}
                </div>
                <div className="box" id="8">
                  {Object.keys(sessionBox8).length > 0 ? (
                    <SessionCard session={sessionBox8} />
                  ) : (
                    <div className="box-number">8</div>
                  )}
                </div>
                <div className="box" id="9">
                  {Object.keys(sessionBox9).length > 0 ? (
                    <SessionCard session={sessionBox9} />
                  ) : (
                    <div className="box-number">9</div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : config.boxDistribution === 'dynamic' ? (
          <>
            <div className="dynamic-sessions-container">
              <div className="d-flex justify-content-center flex-wrap">
                {sessions && sessions.length > 0 && (
                  <>
                    {sessions.map((session) => (
                      <SessionCard session={session} />
                    ))}
                  </>
                )}{' '}
              </div>
            </div>
          </>
        ) : null
      ) : (
        <ContentCard>
          <ContentNotFound
            type="warning"
            title="Failed to communicate with the service"
            text="An error occurred on the network"
            buttonText="Contact Support"
            buttonAction={() => console.log('contact support')}
          />
        </ContentCard>
      )}
    </div>
  );
}

export default ActiveSessions;
