import { useEffect } from 'react';
import s from './ImageModal.module.css';
import Modal from 'react-modal';

const ImageModal = ({ modalUrl, setModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModal('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={s.modal}
      onClick={(event) => {
        if (event.target.nodeName !== 'IMG') {
          setModal('');
        }
      }}
    >
      <Modal
        isOpen={modalUrl !== ''}
        onRequestClose={() => setModal('')}
        contentLabel='Big image'
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 75%)',
          },
        }}
      >
        <div>
          <img src={modalUrl} />
        </div>
        <button onClick={() => setModal('')} type='button' style={{position: 'fixed', top: '1rem', right: '1rem'}}>Close</button>
      </Modal>
    </div>
  );
};

export default ImageModal;
