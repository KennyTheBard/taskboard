import Vue from 'vue';
import Home from '@/components/Home';
import Board from '@/components/Board';
import Card from '@/components/Card';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/board/:id',
    component: Board
  }, {
    path: '/card/:id',
    component: Card
  }],
  mode: 'history'
})
