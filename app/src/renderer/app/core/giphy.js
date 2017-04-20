import Axios from 'axios';
Axios.defaults.baseURL = 'http://api.giphy.com/v1/gifs/';

export default {
  search (query, page = 0) {
    return new Promise((resolve, reject) => {
      Axios.get('search', {
        params: {
          q: query,
          offset: this.page(page),
          api_key: 'dc6zaTOxFJmzC'
        }
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  },

  page (n) {
    return n * 25;
  }
};