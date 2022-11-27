import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'helpers/api';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import ApiError from './ApiError/ApiError';
import { simplifyObj } from 'helpers/simplifyObj';
import { useEffect } from 'react';
import { useState } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [imgFromAPI, setImgFromAPI] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // state = {
  //   searchName: '',
  //   imgFromAPI: [],
  //   isOpenModal: false,
  //   selectedPicture: '',
  //   selectedPage: '',
  //   isLoading: false,
  //   isError: false,
  // };

  useEffect(() => {
    if(searchName.length || selectedPage>1){
      console.log(searchName);
    updateImgFromApi(searchName)}
    else{return};
  }, [searchName,selectedPage]);

  // useEffect(() => {
  //   if (!selectedPage <= 1) {
  //     updateImgFromApi(searchName, selectedPage);
  //   } else {
  //     return;
  //   }
  // }, [selectedPage]);

  const updateImgFromApi = async (searchName = '', selectedPage = 1) => {
    try {
      setIsLoading(true);
      const imgArray = simplifyObj(await fetchImages(searchName,selectedPage));
      setImgFromAPI([...imgFromAPI, ...imgArray]);
      setSelectedPage(1);
    } catch (e) {
      console.log(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   const {searchName, selectedPage } = this.state;
  //   try {
  //     if (prevState.searchName !== searchName) {
  //       this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  //       const imgArray =  simplifyObj(await getImages(searchName));
  //       this.setState({
  //         imgFromAPI: imgArray,
  //         selectedPage: 1,
  //         isLoading: false,
  //       });
  //     }
  //     if (
  //       prevState.selectedPage !== this.state.selectedPage &&
  //       this.state.selectedPage !== 1
  //     ) {
  //       this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  //       const imgArray =  simplifyObj(await getImages(this.state.searchName, selectedPage));
  //       this.setState(prevState => ({
  //         imgFromAPI: [...prevState.imgFromAPI, ...imgArray],
  //         isLoading: false,
  //       }));
  //     }
  //   } catch(e) {
  //     console.log(e);
  //     this.setState({ isError: true });
  //     this.setState({ isLoading: false });
  //   }
  // }

 const handleSearch = searchName => {
      setSearchName(searchName);
    };

  // handleSearch = searchName => {
  //   this.setState({ searchName: searchName });
  // };

   const togleModal = URL => {
    setIsOpenModal(!isOpenModal);
    setSelectedPicture(URL)
  };

  // togleModal = URL => {
  //   this.setState(prevState => ({
  //     isOpenModal: !prevState.isOpenModal,
  //     selectedPicture: URL,
  //   }));
  // };

   const addMorePictures = () => {
    setSelectedPage( selectedPage + 1)
  };

  // addMorePictures = () => {
  //   this.setState(prevState => ({
  //     selectedPage: prevState.selectedPage + 1,
  //   }));
  // };

  return (
    <div className="App">
      <Searchbar onSubmitSearch={handleSearch} />
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
      <ImageGallery imgFromAPI={imgFromAPI} togleModal={togleModal} />
      {isOpenModal && (
        <Modal togleModal={togleModal} pictureData={selectedPicture} />
      )}
      {selectedPage > 0 && (
        <Button addMorePictures={addMorePictures} />
      )}
    </div>
  );
};
