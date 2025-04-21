import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export function useFetchData(apiFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = useCallback(
    async (...args) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await apiFn(...args, controller.signal);
        setData(result);
        return result;
      } catch (error) {
        if (
          !(
            axios.isCancel(error) ||
            error.name === 'AbortError' ||
            error.name === 'CanceledError'
          )
        ) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  const cancel = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }, []);

  const reset = () => {
    setData(null);
    setError(null);
  };

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return { data, loading, error, fetchData, cancel, reset };
}
