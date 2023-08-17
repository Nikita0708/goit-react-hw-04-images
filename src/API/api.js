import axios from 'axios';

const API_KEY = '35060592-601e2314bab205b1976d9a818';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImgs = async (query, page) => {
  const url = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(url);
  return data;
};
