import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import React, { Component } from 'react';
import { getImages } from 'helpers/api';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import ApiError from './ApiError/ApiError';

export class App extends Component {
  state = {
    searchName: '',
    imgFromAPI: [],
    isOpenModal: false,
    selectedPicture: '',
    selectedPage: '',
    isLoading: false,
    isError: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { selectedPage } = this.state;
    try {
      if (
        prevState.selectedPage !== this.state.selectedPage &&
        this.state.selectedPage !== 1
      ) {
        this.setState({ isLoading: true });

        const imgArray = await getImages(this.state.searchName, selectedPage);
        this.setState(prevState => ({
          imgFromAPI: [...prevState.imgFromAPI, ...imgArray],
          isLoading: false,
        }));
      }
    } catch {
      this.setState({ isLoading: false });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = async e => {
    const { searchName } = this.state;
    e.preventDefault();
    const imgArray = await getImages(searchName);
    this.setState({
      imgFromAPI: imgArray,
      selectedPage: 1,
      isLoading: false,
    });
     };
  //  handleSubmit=e=>this.setState({searchName:e.target.value})

  togleModal = URL => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      selectedPicture: URL,
    }));
  };
  // getActivePicture=()=>{return this.state.imgFromAPI.find(picture=>{return picture.id===this.state.selectedPicture})}

  addMorePictures = () => {
    this.setState(prevState => ({
      selectedPage: (prevState.selectedPage += 1),
    }));
  };

  render() {
    const {
      isError,
      isLoading,
      selectedPicture,
      searchName,
      imgFromAPI,
      isOpenModal,
    } = this.state;
    return (
      <div className="App">
        <Searchbar
          onChange={this.handleChange}
          onSubmitSearch={this.handleSubmit}
          search={searchName}
        />
        {isError && <ApiError />}
        <ImageGallery
          imgFromAPI={imgFromAPI}
          togleModal={this.togleModal}
        />
        
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={this.state.isLoading}
          />
        
        {isOpenModal && (
          <Modal togleModal={this.togleModal} pictureData={selectedPicture} />
        )}
        {this.state.selectedPage > 0 && !isLoading && (
          <Button addMorePictures={this.addMorePictures} />
        )}{' '}
      </div>
    );
  }
}
