import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount(){window.addEventListener('keydown',this.handleKeyModalClose)}
  componentWillUnmount(){window.removeEventListener('keydown',this.handleKeyModalClose)}
  handleKeyModalClose=(e)=>{
    console.log(e)
    if(e.code==='Escape'){this.props.togleModal()}
  }
  render() {
    const {togleModal, pictureData } = this.props;
    console.log(pictureData)
    return (
      <div className="Overlay" onClick={togleModal}>
        <div className="Modal">
          <img src={pictureData} alt='PO' />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  togleModal: PropTypes.func.isRequired,
  pictureData: PropTypes.string.isRequired,
};
