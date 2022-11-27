import PropTypes from 'prop-types';
import { useEffect } from 'react';

export function Modal({ togleModal, pictureData }) {
  useEffect(() => {
    const handleKeyModalClose = e => {
      if (e.code === 'Escape') {
        togleModal();
      }
    };
    window.addEventListener('keydown', handleKeyModalClose);
    return () => {
      window.removeEventListener('keydown', handleKeyModalClose);
    };
  }, [togleModal]);

  //   componentDidMount()
  //     {window.addEventListener('keydown',this.handleKeyModalClose)}
  //     componentWillUnmount(){window.removeEventListener('keydown',this.handleKeyModalClose)}
  //     handleKeyModalClose=(e)=>{
  //       console.log(e)
  //       if(e.code==='Escape'){this.props.togleModal()}
  //     }
  return (
    <div className="Overlay" onClick={togleModal}>
      <div className="Modal">
        <img src={pictureData} alt="ssss" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  togleModal: PropTypes.func.isRequired,
  pictureData: PropTypes.string.isRequired,
};
