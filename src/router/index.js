import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Chart from "../views/Chart.vue";
import Ring from "../views/Ring.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: "timer",
    component: Home,
  },
  {
    path: '/list',
    name: "list",
    component: List,
  },
  {
    path: '/chart',
    name: "chart",
    component: Chart,
  },
  {
    path: '/ring',
    name: "ring",
    component: Ring,
  },
  {
    path: '/bomb',
    name: "bomb",
    component: Home,
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
