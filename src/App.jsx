import { useEffect, useState } from 'react';
import css from './App.module.css';
import { getImages } from './services/unsplashApi';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const [modalUrl, setModalUrl] = useState('');
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const loadImages = async () => {
      try {
        if (!query) return;
        setLoading(true);
        setError(false);
        const [newImages, pages] = await getImages(query, currentPage, signal);
        if (currentPage === 1) {
          setTotalPages(pages);
        }
        if (newImages.length === 0) {
          setTotalPages(currentPage);
          toast.error('No results!');
        }
        setImages(prev => [...prev, ...newImages]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
    
    return () => controller.abort();
  }, [query, currentPage]);


  function handleQuery(query) {
    setImages([]);
    setCurrentPage(1);
    setQuery(query);
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleQuery} />
      
      {images.length > 0 && !error && (
        <ImageGallery images={images} setModal={setModalUrl} />
      )}
      
      {loading && <Loader />}
      {error && <ErrorMessage toast={toast} />}
      {currentPage < totalPages && !error && !loading && (
        <LoadMoreBtn loadMore={() => setCurrentPage(prev => prev + 1)} />
      )}
      {modalUrl !== '' && (
        <ImageModal modalUrl={modalUrl} setModal={setModalUrl} />
      )}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
