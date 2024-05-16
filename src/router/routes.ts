import HomePage from "@/pages/HomePage.vue";

export type RouteName = typeof routes[number]['name']

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue'),
        meta: {
            noAuth: true,
        }
    },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: () => import('../pages/RegisterPage.vue'),
    //     meta: {
    //         noAuth: true,
    //     }
    // },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../pages/ProfilePage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/questions',
        name: 'questions',
        component: () => import('../pages/QuestionsPage.vue')
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('../pages/ManagePage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
] as const
