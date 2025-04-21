import { createContext, useContext, useEffect, useState } from 'react';
import { getConfig, cancelConfigRequest } from './services/api';
import { toast } from 'react-hot-toast';

const AppContext = createContext();

const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configData = await getConfig();
        setConfig(configData);
      } catch {
        toast.error('Error when load config!');
      }
    };
    fetchConfig();
    return () => cancelConfigRequest();
  }, []);

  return (
    <AppContext.Provider value={{ config }}>{children}</AppContext.Provider>
  );
};

export { useApp, AppProvider };
