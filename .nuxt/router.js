import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _aeeaea9e = () => interopDefault(import('..\\pages\\add_blog.vue' /* webpackChunkName: "pages/add_blog" */))
const _35ff6153 = () => interopDefault(import('..\\pages\\blog.vue' /* webpackChunkName: "pages/blog" */))
const _3e46b1b5 = () => interopDefault(import('..\\pages\\blog_tags.vue' /* webpackChunkName: "pages/blog_tags" */))
const _2cd6f719 = () => interopDefault(import('..\\pages\\forgetPassword.vue' /* webpackChunkName: "pages/forgetPassword" */))
const _284caef0 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _573e7d08 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _79a2e628 = () => interopDefault(import('..\\pages\\questions.vue' /* webpackChunkName: "pages/questions" */))
const _5695a71c = () => interopDefault(import('..\\pages\\reset_pass.vue' /* webpackChunkName: "pages/reset_pass" */))
const _679bdfa7 = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages/users" */))
const _eeeebcf6 = () => interopDefault(import('..\\pages\\course\\add_course.vue' /* webpackChunkName: "pages/course/add_course" */))
const _0adfa734 = () => interopDefault(import('..\\pages\\course\\course_list.vue' /* webpackChunkName: "pages/course/course_list" */))
const _2ca9e844 = () => interopDefault(import('..\\pages\\course\\_id.vue' /* webpackChunkName: "pages/course/_id" */))
const _54fcfee2 = () => interopDefault(import('..\\pages\\edit\\_id.vue' /* webpackChunkName: "pages/edit/_id" */))
const _22320571 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/add_blog",
    component: _aeeaea9e,
    name: "add_blog"
  }, {
    path: "/blog",
    component: _35ff6153,
    name: "blog"
  }, {
    path: "/blog_tags",
    component: _3e46b1b5,
    name: "blog_tags"
  }, {
    path: "/forgetPassword",
    component: _2cd6f719,
    name: "forgetPassword"
  }, {
    path: "/login",
    component: _284caef0,
    name: "login"
  }, {
    path: "/profile",
    component: _573e7d08,
    name: "profile"
  }, {
    path: "/questions",
    component: _79a2e628,
    name: "questions"
  }, {
    path: "/reset_pass",
    component: _5695a71c,
    name: "reset_pass"
  }, {
    path: "/users",
    component: _679bdfa7,
    name: "users"
  }, {
    path: "/course/add_course",
    component: _eeeebcf6,
    name: "course-add_course"
  }, {
    path: "/course/course_list",
    component: _0adfa734,
    name: "course-course_list"
  }, {
    path: "/course/:id?",
    component: _2ca9e844,
    name: "course-id"
  }, {
    path: "/edit/:id?",
    component: _54fcfee2,
    name: "edit-id"
  }, {
    path: "/",
    component: _22320571,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
