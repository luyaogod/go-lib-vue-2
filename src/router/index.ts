import { createRouter, createWebHistory } from 'vue-router'
import UserHome from '@/views/User/UserHome.vue'
import UserCookie from '@/views/User/UserCookie.vue'
import { useUUIDStore } from '@/stores/userInfo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/User/UserLogin.vue')
    },
    {
      path: '/home',
      name: 'userHome',
      component: UserHome,
      meta: { requireAuth: true },
      children: [
        {
          path: '/submit',
          name: 'userCookie',
          component: UserCookie
        }
      ]
    },
    {
      path: '/seat',
      name: 'userSeat',
      meta: { requireAuth: true },
      component: () => import('@/views/User/UserSeats.vue')
    },
    {
      path: '/morning',
      name: 'morningTask',
      meta: { requireAuth: true },
      component: () => import('@/views/User/UserMorning.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/User/UserTest.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/User/UserHelp.vue')
    },
    /////////////////////////////////////////////////////////////////
    {
      path: '/admin',
      name: 'adminLogin',
      component: () => import('@/views/Admin/AdminLogin.vue')
    },
    {
      path: '/admin/home',
      name: 'adminHome',
      meta: { requireAuth: true },
      component: () => import('@/views/Admin/AdminHome.vue')
    },
    {
      path: '/admin/users',
      name: 'userMangement',
      meta: { requireAuth: true },
      component: () => import('@/views/Admin/AdminUserManage.vue')
    },
    {
      path: '/admin/tasks',
      name: 'tasks',
      meta: { requireAuth: true },
      component: () => import('@/views/Admin/AdminTaskList.vue')
    },
    {
      path: '/admin/taskRets',
      name: 'taskRets',
      meta: { requireAuth: true },
      component: () => import('@/views/Admin/AdminTaskRet.vue')
    },
    {
      path: '/admin/morning/tasks',
      name: 'morningTasks',
      meta: { requireAuth: true },
      component: () => import('@/views/Admin/AdminTaskListMorning.vue')
    },
    {
      path: '/admin/morning/taskRets',
      name: 'morningRets',
      meta: { requireAuth: true },
      component: () => import('@/views/Admin/AdminTaskRetMorning.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/Error/ErrorPage.vue')
    },
    {
      path: '/:xxx(.*)*',
      name: 'errorPage',
      component: () => import('@/views/Error/ErrorPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const store = useUUIDStore()
    const uuid = store.getUUID
    if (uuid !== '' && uuid !== undefined) {
      next()
    } else {
      next({ name: '/', query: { redirect: to.fullPath } })
    }
  } else next()
})

export default router
