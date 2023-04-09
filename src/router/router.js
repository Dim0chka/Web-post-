import Main from '@/pages/Main.vue'
import PostPage from '@/pages/PostPage.vue'
import PostIdPage from '@/pages/PostIdPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router 