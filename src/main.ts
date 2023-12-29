import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/Products.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './style.css'

const routes = [
  { path: '/', component: Products },
  { path: '/product/:id', name: 'product', component: () => import('./views/ProductDetails.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
