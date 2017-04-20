import Vue from 'vue';
import Electron from 'vue-electron';
import Router from 'vue-router';
import Axios from 'axios';

import App from './App';
import routes from 'core/routes';

window.Axios = Axios;

Vue.use(Electron);
Vue.use(Router);
Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

new Vue({
  router,
  ...App
}).$mount('#app');
