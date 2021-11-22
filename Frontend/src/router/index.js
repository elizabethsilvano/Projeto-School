import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('../views/Students.vue')
  },
  {
    path: '/students/add',
    name: 'AddStudents',
    component: () => import('../views/Add-Students.vue')
  },
  {
    path: '/students/edit/:id',
    name: 'EditStudent',
    component: () => import('../views/Edit-Student.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
