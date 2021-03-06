import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'

import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-config.js'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_API_KEY,
    libraries: "places",
    region: "JP",
    language: "ja"
  }
})

Vue.config.productionTip = false

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };

new Vue({
  render: h => h(App),
}).$mount('#app')
