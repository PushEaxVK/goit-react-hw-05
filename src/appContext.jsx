import { createContext, useContext, useEffect, useState } from 'react';
import {
  getConfig,
  cancelConfigRequest,
  getTrending,
  cancelTrendingRequest,
} from './services/api';
import { toast } from 'react-hot-toast';

const AppContext = createContext();

const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [trendings, setTrendings] = useState([]);

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

  useEffect(() => {
    const fetchTrendings = async () => {
      try {
        const trendigsData = await getTrending();
        const results = trendigsData?.results;
        if (results) {
          setTrendings(results);
        }
      } catch (error) {
        toast.error('Error when loading trendings!');
        // console.log(error);
      }
    };
    fetchTrendings();
    return () => cancelTrendingRequest();
  }, []);

  return (
    <AppContext.Provider value={{ config, trendings }}>
      {children}
    </AppContext.Provider>
  );
};

export { useApp, AppProvider };
