import axios from 'axios';
const API_KEY = '34210121-a02c7bbabd964d17c696b7478';

export async function getImages(query, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&page=${page}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}
