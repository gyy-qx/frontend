import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignIn from '../views/SignIn'
import ChairmanHomepage from '../views/ChairmanHomepage'
import TeacherHomepage from '../views/TeacherHomepage'
import test from '../views/test'
import Submit from '../components/Submit.vue'
import Assign from '../components/Assign.vue'
import Homepage from '../components/Homepage.vue'
import MyAccount from '../components/MyAccount.vue'
import FirstPage from '../components/FirstPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/chairmanHomepage',
    name: 'ChairmanHomepage',
    component: ChairmanHomepage
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/teacherHomepage',
    name: 'TeacherHomepage',
    component: TeacherHomepage,
    redirect: '/firstPage',
    children: [
      {
        path: '/firstPage',
        name: 'FirstPage',
        component: FirstPage
      },
      {
        path: '/submit',
        name: 'Submit',
        component: Submit
      },
      {
        path: '/assign',
        name: 'Assign',
        component: Assign
      },
      {
        path: '/myAccount',
        name: 'MyAccount',
        component: MyAccount
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: Homepage
  }
]

const router = new VueRouter({
  routes
})

export default router
