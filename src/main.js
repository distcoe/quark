// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iview from 'iview';
import lodash from 'lodash';
import axios from 'axios';
import App from './App';
import router from './router';

import registerComponent from './registerComponent';

require('es6-promise').polyfill();

Vue.use(iview);
Vue.config.productionTip = false;

registerComponent();

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });
Object.defineProperty(Vue.prototype, '$http', { value: axios });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
