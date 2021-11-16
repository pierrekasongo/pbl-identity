import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import IdleVue from "idle-vue";
import store from '../store'
import Vuelidate from 'vuelidate';


Vue.config.productionTip = false
const eventsHub = new Vue();
Vue.use(Vuelidate)
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 600000, // 10 seconds
  startAtIdle: false
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
