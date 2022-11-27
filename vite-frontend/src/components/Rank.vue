<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h4>Contribution Rank</h4>
            </div>
        </template>
        <el-row>
            <el-col :span="20">
                username </el-col>
            <el-col :span="4">
                credit </el-col>
        </el-row>
        <br />
        <div v-for="single in rank" class="text item">
            <el-row>
                <el-col :span="20">
                    {{ single.username }}</el-col>
                <el-col :span="4">
                    {{ single.credit }}</el-col>
            </el-row>
        </div>
        <h4>Thank you all guys!</h4>
    </el-card>
</template>

<script setup>

defineProps({
    rank: {
        type: Array,
        default: []
    }
})

</script>
  
<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 300px;
    margin-left: 30px;
}
</style>
  