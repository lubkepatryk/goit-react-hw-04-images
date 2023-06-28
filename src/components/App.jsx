import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from '../index.css';

const API_KEY = '35057683-7f01c4961286491953c834e45';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');

  useEffect(() => {
    fetchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageURL => {
    setModalImageURL(imageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };

  const fetchImages = async () => {
    if (searchQuery === '') return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          searchQuery
        )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();

      setImages(prevImages => [...prevImages, ...data.hits]);
    } catch (error) {
      console.log('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />

      {isLoading ? (
        <ThreeDots type="ThreeDots" color="#000" height={80} width={80} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />

          {images.length > 0 && <Button onClick={handleLoadMore} />}
        </>
      )}

      {showModal && <Modal imageURL={modalImageURL} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;