import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex'

// Khôi phục trạng thái từ localStorage (nếu có)
const savedState = JSON.parse(localStorage.getItem("store"));
if (savedState) {
  store.replaceState(savedState);
}

import './axios.js';
// Import CSS

import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'boxicons/css/boxicons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import Swal from 'sweetalert2';



// Create Vue app and register router
const app = createApp(App);
app.use(router).use(store);

// Register Swal in global properties
app.config.globalProperties.$swal = Swal;


// Mount app to element with id "app"
app.mount('#app');
