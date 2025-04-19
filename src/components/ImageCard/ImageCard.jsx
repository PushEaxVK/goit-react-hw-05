import s from './ImageCard.module.css';

const ImageCard = ({ image }) => {
  return (
    <div className={s.imageWrapper} style={{ backgroundColor: image.color }}>
      <img
        className={s.image}
        src={image.small}
        alt={image.alt}
        data-src={image.regular}
      />
    </div>
  );
};

export default ImageCard;
