import { createContext, useContext, useEffect } from 'react';
import { getConfig, getTrending } from './services/api';
import { toast } from 'react-hot-toast';
import { useFetchData } from './hooks/useFetchData';

const AppContext = createContext();

const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const {
    data: config,
    error: errorConfig,
    fetchData: fetchConfig,
    cancel: cancelConfig,
  } = useFetchData(getConfig);

  const {
    data: trendings,
    error: errorTrendings,
    fetchData: fetchTrendings,
    cancel: cancelTrendings,
  } = useFetchData(getTrending);

  useEffect(() => {
    fetchConfig();
    return () => cancelConfig();
  }, [fetchConfig, cancelConfig]);

  useEffect(() => {
    if (errorConfig) {
      toast.error('Error when load config!');
      console.log('Config error: ', errorConfig);
    }
  }, [errorConfig]);

  useEffect(() => {
    fetchTrendings();
    return () => cancelTrendings();
  }, [cancelTrendings, fetchTrendings]);

  useEffect(() => {
    if (errorTrendings) {
      toast.error('Error when loading trendings!');
      console.error('Trendings error: ', errorTrendings);
    }
  }, [errorTrendings]);

  return (
    <AppContext.Provider value={{ config, trendings }}>
      {children}
    </AppContext.Provider>
  );
};

export { useApp, AppProvider };
