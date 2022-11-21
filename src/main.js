import Vue from 'vue'
import Embed from 'v-video-embed'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import store from './store';

Vue.use(Embed);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  moment,
  render: h => h(App)
}).$mount('#app')
