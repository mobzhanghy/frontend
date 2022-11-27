<template>
    <el-card class="mypanel">
        <template #header>
            <span>
                <h2>Hello, {{ store.state.user }}!</h2>
            </span>
        </template>
        <el-row>
            <el-col :span="1">
            </el-col>
            <el-col :span="15">
                <p>Today is {{ date }},{{ weekday }}.</p>
                <p>Here are your tasks:</p>
                <br>
                <p>You have {{ today_ddl }} ddls on today</p>
                <p>{{ week_ddl }} ddls on this week</p>
                <br>
                <p>Have a nice day!</p>
                <br>
                <p>This is your personal qq agent —————————>>> try it out!</p>
            </el-col>
            <el-col :span="8">
                <img src="src\assets\qrcode.png" alt="qrcode" class="qrcode">
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
//this is to show your status, how many deadlines you have, how many of them should be done today,etc.
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
const store = useStore();
//get date,yyyy-mm-dd-weekday_in_english
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
//const date = year + "-" + month + "-" + day;
const date = year + "-" + month + "-" + day;
//weekday,string
const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });

defineProps(
    {
        today_ddl: {
            type: Number,
            default: 0
        },
        week_ddl: {
            type: Number,
            default: 0
        }
    }
)



</script>

<style scoped>
.mypanel {
    margin-bottom: 50px;
}

.context {
    margin-left: 30px;
}

.qrcode {
    width: 200px;
    height: 200px;
}
</style>