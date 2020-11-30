import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
import Home2 from "../components/Home-2.vue"
import Users from "../views/Users.vue"

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login'  // '/' 重定向成/login
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/login',
    components: {
      default: Login,
      Foo: Home2
    },
    children: [{
      path: 'home2',
      component: Home2
    }]
  }, {
    path: '/users/:id',
    name: 'user',
    component: Users,
  }]
});
export default router