import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery=({imgFromAPI,togleModal})=>{


    return (
      <ul className="ImageGallery">
        {imgFromAPI.map(image => (
          <ImageGalleryItem
          webformatURL={image.webformatURL}
            tags={image.tags}
            key={image.id}
            id={image.id}
            togleModal={togleModal}
            largeImageURL={image.largeImageURL}
          />
        ))}
      </ul>
    );
  }


ImageGallery.propTypes = {
  imgFromAPI: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  togleModal:PropTypes.func.isRequired
};
