import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types'

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          onClick={onImageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery

ImageGallery.propTypes = {
  images: PropTypes.array,
}