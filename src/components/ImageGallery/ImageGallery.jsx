import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, setModal }) => {
  return (
    <div className={s.gallery}>
      {/* <h2>ImageGallery</h2> */}
      <ul
        className={s.imagesList}
        onClick={(e) => {
          e.target.nodeName === 'IMG' && setModal(e.target.dataset.src);
        }}
      >
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
