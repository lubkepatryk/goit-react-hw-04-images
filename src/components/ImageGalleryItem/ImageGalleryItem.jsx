import React from 'react';
import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImg} src={webformatURL} alt="" onClick={() => onClick(largeImageURL)}/>
    </li>
  );
};

export default ImageGalleryItem

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
}