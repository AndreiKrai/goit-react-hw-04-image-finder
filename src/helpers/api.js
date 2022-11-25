import axios from 'axios';
// axios.defaults.baseURL='https://pixabay.com/api'
// const API_KEY= '30131532-b39fadf9a6636e24080a2757a'

export const getImages = async (searchName,page=1) => {
  const { data } = await axios.get(
    // {params:{q:searchName,page:1,key:API_KEY,image_type:'photo',orientation:'horizontal',per_page:12}}
    `https://pixabay.com/api/?q=${searchName}&page=${page}&key=30131532-b39fadf9a6636e24080a2757a&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(data.hits);
  return data.hits


};
