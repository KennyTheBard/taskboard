import Vue from 'vue';
import Home from '@/components/Home';
import Board from '@/components/Board';
import NewCard from '@/components/NewCard';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/board/:boardId/list/:listId/new-card',
    name: 'NewCard',
    component: NewCard,
    props(route) {
      return {
        boardId: route.params.boardId,
        listId: route.params.listId
      }
    }
  }, {
    path: '/board/:id',
    name: 'Board',
    component: Board,
    props(route) {
      return {
        boardId: route.params.id,
      }
    }
  }],
  mode: 'history'
})
