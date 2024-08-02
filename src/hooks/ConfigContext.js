import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../styles/ThemeContext';

export const ConfigContext = createContext();

function getSavedConfig() {
  const config = {
    title: 'Redemption Multi Sessions',
    theme: 'light',
    showBoxNumber: false,
    boxDistribution: 'fixed',
    fixedBoxSize: 'large',
    cardBalance: {
      showTickets: true,
      showCredits: true,
      showBonus: true,
      showCourtesy: false,
    },
  };

  return config;
}

const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const { setColorTheme } = useContext(ThemeContext);

  useEffect(() => {
    //If theres a config saved to the browser, get the config saved, else, fetch config
    const fetchConfig = async () => {
      const savedConfig = JSON.parse(localStorage.getItem('config'));
      if (savedConfig) {
        setConfig(savedConfig);
        setColorTheme(savedConfig.theme);
      } else {
        const initialConfig = await getSavedConfig();
        setConfig(initialConfig);
        localStorage.setItem('config', JSON.stringify(initialConfig));
      }
    };

    fetchConfig();
  }, []);

  const refetchConfig = async () => {
    const savedConfig = await getSavedConfig();
    setConfig(savedConfig);
    localStorage.setItem('config', JSON.stringify(savedConfig));
  };

  const setNewConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('config', JSON.stringify(newConfig));
  };

  return (
    <ConfigContext.Provider value={{ config, setNewConfig, refetchConfig }}>
      {config ? children : <div>Loading...</div>}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
