import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const routes = [
  {
    // ↓路由地址
    path: '/',
    // ↓路由名称（唯一值），在路由跳转时能用到
    name: '',
    // ↓路由渲染组件
    redirect: {
      name: 'login'
    }
    // ↓首页
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    children: []
  },
  {
    path: '/patientInfo',
    name: 'patientInfo',
    component: () => import('@/pages/PatientInfo.vue')
  },
  {
    path: '/medicineInfo',
    name: 'medicineInfo',
    component: () => import('@/pages/MedicineInfo.vue')
  },
  {
    path: '/checkInfo',
    name: 'checkInfo',
    component: () => import('@/pages/Check.vue')
  },
  {
    path: '/dischargeInfo',
    name: 'dischargeInfo',
    component: () => import('@/pages/Discharge.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 登录或者注册才可以往下进行
    next()
  } else {
    // 获取 sessionStorage
    const token = sessionStorage.getItem('login-status')
    // token 不存在
    if (token === null || token === '') {
      ElMessage.error('您还没有登录，请先登录')
      next('/login')
    } else {
      next()
    }
  }
})

export default router
