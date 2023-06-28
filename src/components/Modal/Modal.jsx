import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    this.handleKeyDown = event => {
      if (event.code === 'Escape') {
        this.props.onClose();
      }
    };

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { imageURL, onClose } = this.props;

    return (
      <div className={css.Overlay} onClick={onClose}>
        <div className={css.Modal}>
          <img src={imageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
