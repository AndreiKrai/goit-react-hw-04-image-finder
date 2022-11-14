import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  render() {
    const {togleModal, pictureData } = this.props;
    // console.log(pictureData.largeImageURL)
    return (
      <div className="Overlay" onClick={togleModal}>
        <div className="Modal">
          <img src={pictureData} alt='ssss' />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  togleModal: PropTypes.func.isRequired,
  pictureData: PropTypes.string.isRequired,
};
