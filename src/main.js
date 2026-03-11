import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// استيراد JS من Bootstrap
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap; // 🔑 مهم لتعريفه عالمياً

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');