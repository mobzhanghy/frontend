<template>
    <div class="allBody">
        <MyPanel :today_ddl="today_ddl" :week_ddl="week_ddl"></MyPanel>
        <el-tabs v-model="activeName" @click="handleClick" type="card">
            <el-tab-pane label="default" name="0">
                <el-row>
                    <el-col :span="12" v-for="card in defaultCards">
                        <Card :stars=card.star :projectName=card.name :start=card.start :end=card.end
                            :description=card.desc :progress=card.progress :author="card.author" class=card />
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane v-for="(cardGroup, index) in cardGroups" :label=store.state.groups[index]>
                <el-row>
                    <el-col :span="12" v-for="card in cardGroup">
                        <Card :stars=card.star :projectName=card.name :start=card.start :end=card.end
                            :description=card.desc :progress=card.progress :author="card.author" class=card />
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
    <el-affix :offset="50" position="bottom">
        <Rank :rank="usersCreditRank" />
    </el-affix>
</template>

<script setup>
import Card from './Card.vue'
import services from '../DataServices/DataService.js'
import { onMounted, ref, watch } from 'vue';
import Rank from './Rank.vue'
import { useStore } from 'vuex';
import MyPanel from './MyPanel.vue'

const handleClick = (tab, event) => {
    console.log(tab, event);
}

const activeName = ref("0");

const cardGroups = ref([]);//array of array of cards
const groups = ref([])//store.state.groups, name of groups
const defaultCards = ref([]);

const store = useStore()

const today_ddl = ref(0)
const week_ddl = ref(0)

const getAll = () => {
    services.getAll().then(res => {
        defaultCards.value = res.data;
    })
}




const calculateProgress = (card) => {
    let start = new Date(card.start)
    let end = new Date(card.end)
    let now = new Date()
    //let progress = (now - start) / (end - start) * 100 progress should be int and 100 is the max
    let progress = Math.floor((now - start) / (end - start) * 100)
    //100 is the max
    if (progress > 100) {
        progress = 100
    }
    if (progress < 0) {
        progress = 0
    }
    card.progress = progress
}


watch(store.state, () => {
    if (store.state.isLogin) {

        groups.value = store.state.groups
        for (let i = 0; i < groups.value.length; i++) {
            services.getGroup(groups.value[i]).then(res => {
                cardGroups.value[i] = res.data//cardGroups.value[i] is an array
                setTimeout(() => {
                    for (let j = 0; j < cardGroups.value[i].length; j++) {
                        calculateProgress(cardGroups.value[i][j])
                    }
                }, 500)
            })
        }

        today_ddl.value = getTodayDDL()
        week_ddl.value = getWeekDDL()
        getRank()


    }
})

const usersCreditRank = ref([])

const getRank = () => {
    services.getRank().then(res => {
        usersCreditRank.value = res.data
    })
}

//get today_ddl by searching in defaultCards and each cardGroup
const getTodayDDL = () => {
    let ddl_count = 0
    //defaultCards[].end is yyyy-mm-dd, date should be yyyy-mm-dd
    let today = new Date()
    let today_str = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    for (let i = 0; i < defaultCards.value.length; i++) {
        if (defaultCards.value[i].end == today_str) {
            ddl_count++
        }
    }
    for (let i = 0; i < cardGroups.value.length; i++) {
        for (let j = 0; j < cardGroups.value[i].length; j++) {
            if (cardGroups.value[i][j].end == today_str) {
                ddl_count++
            }
        }
    }
    return ddl_count

}

//get week_ddl by searching in defaultCards and each cardGroup

const getWeekDDL = () => {
    let ddl_count = 0
    //defaultCards[].end is yyyy-mm-dd, date should be yyyy-mm-dd
    let today = new Date()
    let today_str = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    let week_str = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate() + 7)
    for (let i = 0; i < defaultCards.value.length; i++) {
        if (defaultCards.value[i].end >= today_str && defaultCards.value[i].end <= week_str) {
            ddl_count++
        }
    }
    for (let i = 0; i < cardGroups.value.length; i++) {
        for (let j = 0; j < cardGroups.value[i].length; j++) {
            if (cardGroups.value[i][j].end >= today_str && cardGroups.value[i][j].end <= week_str) {
                ddl_count++
            }
        }
    }
    return ddl_count

}

onMounted(() => {
    getAll()
    setTimeout(() => {
        for (let i = 0; i < defaultCards.value.length; i++) {
            calculateProgress(defaultCards.value[i])
        }
    }, 1000)

    if (store.state.isLogin) {
        //getAll()
        groups.value = store.state.groups
        for (let i = 0; i < groups.value.length; i++) {
            services.getGroup(groups.value[i]).then(res => {
                cardGroups.value[i] = res.data//cardGroups.value[i] is an array
                setTimeout(() => {
                    for (let j = 0; j < cardGroups.value[i].length; j++) {
                        calculateProgress(cardGroups.value[i][j])
                    }
                }, 500)
            })
        }

        today_ddl.value = getTodayDDL()
        week_ddl.value = getWeekDDL()
        getRank()
    }
})

</script>

<style scoped>
.allBody {
    width: 930px;
    margin: 50px auto;
    min-height: 800px;
}

.card {
    margin-bottom: 20px;
}

.showbtn {
    margin-bottom: 20px;
    height: 50px;
    width: 100%;
    font-size: 20px;
    background-color: black;
}
</style>

