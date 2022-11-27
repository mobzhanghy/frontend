<template>
    <!-- <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"> -->
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" >
        <el-menu-item index="0">
            <h2>
                <el-icon><BellFilled/></el-icon>Deadline Bird
            </h2>
        </el-menu-item>
        <el-menu-item index="1">
            <router-link to="/">
                <h4><el-icon><List/></el-icon>All</h4>
            </router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/add">
                <h4><el-icon><Edit/></el-icon>Add</h4>
            </router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link to="/search">
                <h4><el-icon><Search/></el-icon>Search</h4>
            </router-link>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item @click="showLogin" v-if="!store.state.isLogin">
            <h4><el-icon><Avatar/></el-icon> Login</h4>
        </el-menu-item>
        <el-menu-item v-else @click="logoutComfirm">
            <h4><el-icon><SwitchButton /></el-icon>{{store.state.user}}</h4>
        </el-menu-item>
    </el-menu>

    <el-dialog v-model="dialogVisible" title="Login" center width="900px" :lock-scroll="false">
        <el-form>
            <el-form-item label="Username">
                <el-input v-model="user.username" />
            </el-form-item>
            <el-form-item label="Password&nbsp;">
                <el-input v-model="user.password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="login">Login</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="displayLogout" title="Logout" center width="900px" :lock-scroll="false">
        <el-form>
            <el-form-item label="Are you sure to logout?">
                <el-input v-model="store.state.user" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="displayLogout = false">Cancel</el-button>
            <el-button type="primary" @click="logout">Logout</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { Avatar, BellFilled, Edit, List, Search, SwitchButton} from '@element-plus/icons-vue';
import { ref, computed } from 'vue'
import services from '../DataServices/DataService.js'
import {useStore} from 'vuex'
const activeIndex = ref('1');
const dialogVisible = ref(false);
const user = ref({ username: '', password: '' });
const showLogin = () => {
    dialogVisible.value = true;
}
const store = useStore();

const login = async () => {
    const res = await services.login(user.value);
    if (res.data[0]) {
        store.commit('login', res.data[0]);
        dialogVisible.value = false;
        console.log(res.data[0]);
    }
}

const displayLogout = ref(false);
const logout = () => {
    store.commit('logout');
    displayLogout.value = false;
}
const logoutComfirm = () => {
    displayLogout.value = true;
}

/* const handleSelect = (index) => {
    activeIndex.value = index;
} */

/* const login = () => {
    services.login(user.value).then(res => {
        console.log(res);
    })
} */ //登录不好做 有时间再做


</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>