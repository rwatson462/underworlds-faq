import HomePage from "@/pages/HomePage.vue";

export type RouteName = typeof routes[number]['name']

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../pages/AboutPage.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/RegisterPage.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../pages/ProfilePage.vue')
    }
] as const
