import 'assets/sass/app.scss';

import Vue from 'vue';
import Electron from 'vue-electron';
import Router from 'vue-router';

import Giphy from 'core/giphy';
window.Giphy = Giphy;

import Bus from 'core/bus';
window.Bus = new Bus(Vue);

import 'core/directives';
import 'core/components';

import App from './App';
import routes from 'core/routes';

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
