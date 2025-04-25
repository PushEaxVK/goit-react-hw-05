import { createContext, useContext, useEffect } from 'react';
import { getConfig } from './services/api';
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

  useEffect(() => {
    fetchConfig();
    return () => cancelConfig();
  }, [fetchConfig, cancelConfig]);

  useEffect(() => {
    if (errorConfig) {
      toast.error('Error when load config!');
    }
  }, [errorConfig]);

  return (
    <AppContext.Provider value={{ config }}>{children}</AppContext.Provider>
  );
};

export { useApp, AppProvider };
