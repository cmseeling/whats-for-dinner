import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './state/store';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: 'fa',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
