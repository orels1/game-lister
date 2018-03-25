import Vue from 'vue';
import Router from 'vue-router';
import Backlog from '@/components/Backlog';
import Dropped from '@/components/Dropped';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Backlog',
      component: Backlog,
    },
    {
      path: '/dropped',
      name: 'Dropped',
      component: Dropped,
    },
  ],
  mode: 'history',
});
