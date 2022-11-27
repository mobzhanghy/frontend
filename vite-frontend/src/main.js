import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router.js'
import App from './App.vue'
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createStore } from 'vuex'


const store = createStore({
    state(){
        return {
            isLogin: false,
            user: null,
            groups: []
        }
    },
    mutations:{
        login (state, user) {
            state.isLogin = true
            state.user = user.username
            //state.groups = user.group
            //user.group is an array of group names separated by comma, so we need to split it
            state.groups = user.group.split(',')
        },
        logout (state) {
            state.isLogin = false
            state.user = null
            state.groups = []
        }
    }
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')



//axios interceptors replace application/json with application/x-www-form-urlencoded for post requests

/* axios.interceptors.request.use(
    config => {
        if(config.method === 'post'){
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        return config
    }
) */

//axios interceptors add application/json for get requests with params

axios.interceptors.request.use(
    config => {
        if (config.method === 'get' && config.params) {
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    }
)