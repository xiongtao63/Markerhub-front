import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Index from "@/views/Index.vue";
import User from "@/views/sys/User.vue";
import Role from "@/views/sys/Role.vue";
import Menu from "@/views/sys/Menu.vue";
import UserCenter from "@/views/UserCenter.vue";
import axios from "axios";
import store from "../store";


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: "首页"
        },
        component: Index
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        meta: {
          title: "个人中心"
        },
        component: UserCenter
      },
      // {
      // 	path: '/sys/users',
      // 	name: 'SysUser',
      // 	component: () => import(/* webpackChunkName: "about" */ '@/views/sys/User.vue')
      // },
      // {
      // 	path: '/sys/roles',
      // 	name: 'SysRole',
      // 	component: Role
      // },
      // {
      // 	path: '/sys/menus',
      // 	name: 'SysMenu',
      // 	component: Menu
      // },
    ]
  },

  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => { // 每次路由跳转前，检查是否登录

  let hasRoute = store.state.menus.hasRoutes

  let token = localStorage.getItem("token")
  if (to.path === '/login') {
    next()
  } else if (!token) {
    next({path: '/login'})
  } else if (token && !hasRoute) {
    axios.get("/sys/menu/nav", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data.data)
      // 拿到menuList
      store.commit("setMenuList", res.data.data.nav)

      // 拿到用户权限
      store.commit("setPermList", res.data.data.authoritys)
      console.log(store.state.menus.menuList)
      // 动态绑定路由
      let newRoutes = router.options.routes
      res.data.data.nav.forEach(item => {
        if (item.children) {
          item.children.forEach(e => {
            // 转成路由
            let route = menuToRoute(e)
            // 吧路由添加到路由管理中
            if (route) {
              console.log("============" + route.path)
              newRoutes[0].children.push(route)
            }
          })
        }


      })
      console.log("newRoutes")
      console.log(newRoutes)
      newRoutes.forEach(item => {
        router.addRoute(item)
      })
      hasRoute = true
      console.log(router)
      localStorage.setItem("tempRoutes", JSON.stringify(router.options.routes))
      store.commit("changeRouteStatus", hasRoute)
    })
  }


  next()
})

const menuToRoute = menu => {
  if (!menu.component) {
    return null
  }
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/' + menu.component + '.vue')
  }
  return route
}

export default router
