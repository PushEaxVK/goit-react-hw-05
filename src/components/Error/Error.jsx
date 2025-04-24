import { useEffect } from 'react';
import toast from 'react-hot-toast';
import s from './Error.module.css';

const Error = ({ error }) => {
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return <div className={s.error}>Error: {error}</div>;
};

export default Error;
