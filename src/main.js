import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-config.js';

Vue.config.productionTip = false

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };

new Vue({
  render: h => h(App),
}).$mount('#app')
