import { createRouter, createWebHistory } from 'vue-router'
import LandingPageIndex from '../pages/landing/Index.vue'
import TimelinePageIndex from '../pages/timeline/Index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPageIndex,
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: TimelinePageIndex
        },
    ],
})

export default router
