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
    console.log(prevState.selectedPage, this.state.selectedPage);
    try {
      if (prevState.searchName !== this.state.searchName) {
        this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
        const imgArray = await getImages(this.state.searchName);
        this.setState({
          imgFromAPI: imgArray,
          selectedPage: 1,
          isLoading: false,
        });
      }
      if (

        prevState.selectedPage !== this.state.selectedPage &&
        this.state.selectedPage !== 1
      ) {debugger
        this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
        console.log('is working');
        const imgArray = await getImages(this.state.searchName, selectedPage);
        this.setState(prevState => ({
          imgFromAPI: [...prevState.imgFromAPI, ...imgArray],
          isLoading: false,
        }));
      }
    } catch {
      this.setState({ isError: true });
      this.setState({ isLoading: false });
    }
  }

  handleSearch = searchName => {

    this.setState({ searchName: searchName });
  };

  togleModal = URL => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      selectedPicture: URL,
    }));
  };
  // getActivePicture=()=>{return this.state.imgFromAPI.find(picture=>{return picture.id===this.state.selectedPicture})}

  addMorePictures = () => {
    this.setState(prevState => ({
      selectedPage: (prevState.selectedPage + 1),
    }));
  };

  render() {
    const { isError, isLoading, selectedPicture, imgFromAPI, isOpenModal } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmitSearch={this.handleSearch} />
        {isLoading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {isError && <ApiError />}
        <ImageGallery imgFromAPI={imgFromAPI} togleModal={this.togleModal} />
        {isOpenModal && (
          <Modal togleModal={this.togleModal} pictureData={selectedPicture} />
        )}
        {this.state.selectedPage > 0 && (
          <Button addMorePictures={this.addMorePictures} />
        )}{' '}
      </div>
    );
  }
}
