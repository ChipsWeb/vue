import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import teacher from '../views/teacher.vue'
import plan from '../views/plan.vue'
import course from '../views/course.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path:"/teacher",
        name:'teacher',
        component:teacher
      },
      {
        path:"/plan",
        name:'plan',
        component:plan
      },
      {
        path:"/course",
        name:'course',
        component:course
      }
    ]
 
  }
]

const router = new VueRouter({
  routes
})

export default router
