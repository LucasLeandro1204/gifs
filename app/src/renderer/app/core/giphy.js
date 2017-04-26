import Axios from 'axios';
Axios.defaults.baseURL = 'http://api.giphy.com/v1/gifs/';

export default {
  search (query, offset = 0) {
    return new Promise((resolve, reject) => {
      Axios.get('search', {
        params: {
          q: query,
          offset: offset,
          limit: 30,
          api_key: 'dc6zaTOxFJmzC'
        }
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  }
};