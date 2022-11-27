<script setup>
import Nav from './components/Nav.vue'
</script>

<template>
    <div id="app">
        <Nav />
        <KeepAlive>
            <router-view />
        </KeepAlive>
    </div>
</template>

<style scoped>

</style>
