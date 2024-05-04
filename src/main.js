import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router';

// import * as L from './assets/leaflet/leaflet.js';
import * as L from 'leaflet';
// import * as bing from 'leaflet-bing-layer';

import './assets/style.css'
import '@vueform/multiselect/themes/default.css'
import './assets/leaflet/leaflet.css'



const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');
