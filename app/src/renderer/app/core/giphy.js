import Axios from 'axios';
Axios.defaults.baseURL = 'http://api.giphy.com/v1/gifs/';

export default {
  search (query, page = 0) {
    return new Promise((resolve, reject) => {
      Axios.get('search', {
        params: {
          q: query,
          offset: this.page(page),
          api_key: 'dc6zaTOxFJmzC',
          onDownloadProgress (progressEvent) {
            console.log('kkk');
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
          }
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