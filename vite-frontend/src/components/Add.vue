<template>
    <div class="addBody">
        <el-form :model="form" label-width="120px" v-if="!added">
            <el-form-item label="Activity name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Difficulty rate">
                <el-rate v-model="form.star"></el-rate>
            </el-form-item>

            <el-form-item label="class">
                <el-select multiple v-model="selected">
                    <el-option v-for="option in options" :key="option.value" :label="option.label"
                        :value="option.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="Start time">
                <el-col :span="11">
                    <el-date-picker v-model="form.start" value-format="YYYY-MM-DD" type="date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="End time">
                <el-col :span="11">
                    <el-date-picker v-model="form.end" value-format="YYYY-MM-DD" type="date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
        <!-- el-alert and button for re add -->
        <div v-else>
            <el-alert title="Activity added successfully" type="success"
                description="You can add another activity or go back to the homepage" show-icon
                style="margin-top: 20px">
            </el-alert>
            <!-- button link to /add -->
            <el-button type="primary" style="margin-top: 20px" @click="unadd">Add another activity</el-button>
            <el-button type="primary" style="margin-top: 20px">
                <router-link to="/">Back to homepage</router-link>
            </el-button>
        </div>
    </div>
</template>
  
<script  setup>
import { reactive, ref } from 'vue'
import services from '../DataServices/DataService'
import { useStore } from 'vuex';

const added = ref(false)
const store = useStore()

//use store.state.groups to create options for el-select, samev value and label
const options = ref([])
const selected = ref([])

options.value = store.state.groups.map((group) => {
    return {
        value: group,
        label: group
    }
})


const unadd = () => {
    added.value = false
    //reset form
    form.name = ''
    form.star = 0
    form.start = ''
    form.end = ''
    form.desc = ''
    form.groups = ''
}
// do not use same name with ref
const form = reactive({
    name: '',
    star: 0,
    start: '',
    end: '',
    groups: '',
    //type: [],
    //resource: '',
    desc: '',
    author: store.state.user
})


const onSubmit = () => {
    
    //stringify the selected groups with comma, and store in form.groups
    form.groups = selected.value.join(',')
    if(selected.value.length == 0){
        services.create(form)
    }else{
        services.createWithGroup(form)
    }

    if(store.state.isLogin){
        services.addCredit(store.state.user)
    }
    added.value = true;
}
</script>
  

<style scoped>
.addBody {
    width: 1000px;
    margin: 100px auto;
    font-weight: 900;
}
</style>