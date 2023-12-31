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
        component: () => import('../pages/AboutPage.vue')
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
        path: '/manage-questions',
        name: 'manage-questions',
        component: () => import('../pages/ManageQuestionsPage.vue'),
        meta: {
            requiresAuth: true,
        },
    }
] as const
