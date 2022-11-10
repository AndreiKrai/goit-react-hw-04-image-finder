import React, { Component } from 'react';
import PropTypes from 'prop-types';


 export default function ImageGalleryItem ({largeImageURL, tags, webformatURL ,togleModal,id })  {
    return (
      <li className="ImageGalleryItem" onClick={()=> togleModal(largeImageURL)} id={id}>
        <img className='ImageGalleryItem-image' src={webformatURL } alt={tags} loading="lazy" />
      </li>
    );
  }


ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,

  togleModal:PropTypes.func.isRequired,
  id: PropTypes.number,
};
