import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router';
// import * as L from './assets/leaflet/leaflet'
import * as L from 'leaflet';
// import * as bing from 'leaflet-bing-layer';

import './assets/style.css'
import '@vueform/multiselect/themes/default.css'
import './assets/leaflet/leaflet.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app')
