import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={s.loadMore}>
      <button type="button" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};
export default LoadMoreBtn;
