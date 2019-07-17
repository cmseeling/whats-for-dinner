import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/groceries',
      name: 'groceries',
      // route level code-splitting
      // this generates a separate chunk (grocerylist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groceries" */ './views/Groceries.vue'),
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import(/* webpackChunkName: "recipes" */ './views/Recipes.vue')
    },
    {
      path: '/recipes/item/:id?',
      name: 'recipeitem',
      component: () => import(/* webpackChunkName: "recipe" */ './views/Recipe.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
});
