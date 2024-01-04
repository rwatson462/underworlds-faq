import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes'
import { useAuthStore } from '@/stores/AuthStore'
import { track } from '@vercel/analytics'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
  const authStore = useAuthStore()

  await authStore.refreshUser()

  if (to.meta.requiresAuth === true && !authStore.isLoggedIn) {
    // not signed in to page that requires login

    // track these for attempts to hack in
    track('unauthorised_access', { to: to.path })

    // todo get page details of requested page so we can redirect to it after login
    return { name: 'login' }
  }

  if (to.meta.noAuth === true && authStore.isLoggedIn) {
    // signed in but trying to access a page that requires no user signed in
    return { name: 'home' }
  }
})
