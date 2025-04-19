import { useEffect, useRef } from 'react';
import s from './ErrorMessage.module.css';

const ErrorMessage = ({ toast }) => {
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    toast.error('Network error!');
  }, [toast]);
  return <div>Error when serach images!</div>;
};

export default ErrorMessage;
