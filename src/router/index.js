import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/admin/home',
    redirect: '/admin/blog'
  },
  {
    path: '/home',
    name: 'UserHome',
    // 按需加载
    component: () => import('../views/user/index.vue')
  },
  {
    path: '/category',
    name: 'UserCategory',
    component: () => import('../views/user/category.vue')
  },
  {
    path: '/about',
    name: 'UserAbout',
    component: () => import('../views/user/about.vue')
  },
  {
    path: '/articleDetail',
    name: 'UserArticleDetail',
    component: () => import('../views/user/detail.vue')
  },
  {
    path: '/admin/blog',
    name: 'AdminBlog',
    // 按需加载
    component: () => import('../views/admin/blog.vue')
  },
  {
    path: '/admin/category',
    name: 'AdminCategory',
    // 按需加载
    component: () => import('../views/admin/category.vue')
  },
  {
    path: '/admin/about',
    name: 'AdminAbout',
    // 按需加载
    component: () => import('../views/admin/about.vue')
  },
  // {
  // path: '/homepage',
  // name: 'HomePage',
  // component: () => import('../views/homepage/index.vue'),
  // children: [{
  //   path: 'courses',
  //   name: 'Course',
  //   component: () => import('../views/homepage/course-manager/index.vue')
  // },
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
