<template>
    <el-card shadow="hover" class="card">
        <template #header>
            <el-row>
                <el-col :span="16">
                    <h2>{{ projectName }}</h2>
                </el-col>
                <el-col :span="8">
                    <h4>
                        Difficulty:
                    </h4>
                    <el-rate :model-value="stars" :max="5" disabled></el-rate>
           </el-col>
            </el-row>
        </template>
        <el-progress :text-inside="true" :percentage=progress :stroke-width="24" />
        <el-row class="author">
            uploaded by {{ author }}
        </el-row>
        <el-row>
            <el-col :span="10">
                <p>Start: {{ start }}</p>
            </el-col>
            <el-col :span="5"></el-col>
            <el-col :span="90">
                <p>End: {{ end }}</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <p>Description:&nbsp;&nbsp;&nbsp;{{ description }}</p>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
//import { onMounted, ref } from 'vue';


defineProps({
    stars: {
        type: Number,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    }

})



</script>

<style scoped>
.card {
    width: 450px;
}

.el-row {
    margin-top: 10px;
}

.author{
    color: #909399;
    font-size: 12px;
}
</style>