import s from './Loader.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Loader = () => {
  return (
    <div>
      <ClipLoader
        color="#36d7b7"
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Images..."
      />
    </div>
  );
};
export default Loader;
