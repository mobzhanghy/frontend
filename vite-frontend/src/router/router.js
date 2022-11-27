import { createRouter, createWebHistory } from 'vue-router'
import Add from '../components/Add.vue'
import All from '../components/All.vue'
import Search from '../components/Search.vue'

const routes = [
    {
        path: '/',
        component: All
    },
    {
        path: '/add',
        component: Add
    },
    {
        path: '/search',
        component: Search
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;