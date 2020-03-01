import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

import Home from '../views/Home.vue';

import Article from '../views/Article.vue';
import Create from '../views/article/create.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/arti',
    name: 'article',
    component: Article
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
