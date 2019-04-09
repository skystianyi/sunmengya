import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import List from "./views/List.vue";
import Detail from "./views/Detail.vue";
import Login from "./views/Login.vue";
import Reg from "./views/Reg.vue";
import ShopCart from "./views/ShopCart.vue";
import UserCenter from "./views/UserCenter.vue";
import Orders from "./views/Orders.vue";
import Sort from "./views/Sort.vue";
import Goods from "./views/Goods.vue";
import { isLogin } from "./utils/auth";
import Findpsw from "../src/views/Findpsw.vue";
import MyEg from "../src/views/MyEg.vue";
Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/list",
      name: "list",
      component: List
    },
    {
      path: "/list/:id",
      name: "detail",
      component: Detail
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/reg",
      name: "reg",
      component: Reg
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders
    },
    {
      path: "/shopcart",
      name: "shopcart",
      component: ShopCart,
     /* meta: {
        needLogin: true
      }*/
    },
    {
      path: "/sort",
      name: "sort",
      component: Sort
    },
    {
      path: "/goods",
      name: "goods",
      component: Goods
    },
    {
      path: "/usercenter",
      name: "usercenter",
      component: UserCenter,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/findpsw",
      name: "findpsw",
      component: Findpsw
    },
    {
      path: "/myeg",
      name: "myeg",
      component: MyEg
    }
  ]
});

router.beforeEach((to, from, next) => {
  /*if(from.name=='shopcart'){
    this.active=2;
  }*/
  if (to.meta.needLogin) {
    if (isLogin("username")) {
      next();
    } else {
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

export default router;
