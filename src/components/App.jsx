import React, { Component } from 'react';
import {ThreeDots} from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from '../index.css';

const API_KEY = '35057683-7f01c4961286491953c834e45';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      images: [],
      page: 1,
      isLoading: false,
      showModal: false,
      modalImageURL: '',
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = imageURL => {
    this.setState({
      modalImageURL: imageURL,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      modalImageURL: '',
    });
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    if (searchQuery === '') return;

    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          searchQuery
        )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      console.log('Error fetching images:', error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { images, isLoading, showModal, modalImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {isLoading ? (
          <ThreeDots type="ThreeDots" color="#000" height={80} width={80} />
        ) : (
          <>
            <ImageGallery images={images} onImageClick={this.handleImageClick} />

            {images.length > 0 && <Button onClick={this.handleLoadMore} />}
          </>
        )}

        {showModal && <Modal imageURL={modalImageURL} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
