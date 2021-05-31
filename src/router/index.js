import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignIn from '../views/SignIn'
import ChairmanHomepage from '../views/ChairmanHomepage'
import TeacherHomepage from '../views/TeacherHomepage'
import CourseManage from '../views/CourseManage'
import StudentManage from '../views/StudentManage'
import TeacherManage from '../views/TeacherManage'
import Schedule from '../views/Schedule'
import UpLoad from '../views/UpLoad'
import AssignOrdinary from '../views/AssignOrdinary'
import AssignExperiment from '../views/AssignExperiment'
import AssignEnding from '../views/AssignEnding'
import MyAccount from '../views/MyAccount'
import FirstPage from '../views/FirstPage'
import CourseDegreeCompute from '../views/CourseDegreeCompute'
import CourseDegreeReport from '../views/CourseDegreeReport'
import ResultScoreCompute from '../views/ResultScoreCompute'
import Choice from '../views/choice'
import TeacherInHomepage from '../views/TeacherInHomepage'
import Submit from '../views/Submit'
import CourseUpdate from '../views/CourseUpdate'
import Email from '../views/Email'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/choice',
    name: 'Choice',
    component: Choice
  },
  {
    path: '/courseUpdate',
    name: 'CourseUpdate',
    component: CourseUpdate
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/courseDegreeCompute',
    name: 'CourseDegreeCompute',
    component: CourseDegreeCompute
  },
  {
    path: '/courseDegreeReport',
    name: 'CourseDegreeReport',
    component: CourseDegreeReport
  },
  {
    path: '/resultScoreCompute',
    name: 'ResultScoreCompute',
    component: ResultScoreCompute
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/chairmanHomepage',
    name: 'ChairmanHomepage',
    component: ChairmanHomepage,
    redirect: '/courseManage',
    children: [
      {
        path: '/courseManage',
        name: 'CourseManage',
        component: CourseManage
      },
      {
        path: '/teacherManage',
        name: 'TeacherManage',
        component: TeacherManage
      },
      {
        path: '/studentManage',
        name: 'StudentManage',
        component: StudentManage
      }
    ]
  },
  {
    path: '/teacherInHomepage',
    name: 'TeacherInHomepage',
    component: TeacherInHomepage,
    redirect: '/submit',
    children: [
      {
        path: '/submit',
        name: 'Submit',
        component: Submit
      },
      {
        path: '/upLoad',
        name: 'UpLoad',
        component: UpLoad
      },
      {
        path: '/assignOrdinary',
        name: 'AssignOrdinary',
        component: AssignOrdinary
      },
      {
        path: '/assignExperiment',
        name: 'AssignExperiment',
        component: AssignExperiment
      },
      {
        path: '/assignEnding',
        name: 'AssignEnding',
        component: AssignEnding
      }
    ]
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
        path: '/email',
        name: 'Email',
        component: Email
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
  }
]

const router = new VueRouter({
  routes
})

export default router
