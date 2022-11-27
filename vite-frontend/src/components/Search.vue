<template>
    <div class="searchBody">
<!--         <el-row justify="center">
            <el-col :span="4">
                <el-button class="showbtn" @click=calculateProgress type="primary">Show progress</el-button>
            </el-col>
        </el-row> -->
        <el-row :gutter="10">
            <el-col :span="3">
                <el-button type="primary" size="large" @click="search">
                    <span>Search</span>
                </el-button>
            </el-col>
            <el-col :span="21">
                <el-input placeholder="Search" size="large" v-model="searchText" />
            </el-col>
        </el-row>
    </div>
    <div class="display">
        <!-- <el-row v-if="cards">
            <el-col :span="12" v-for="card in cards">
                <Card :stars=card.star :projectName=card.name :start=card.start :end=card.end
                    :description=card.desc :progress=card.progress class=card />
            </el-col>
        </el-row> -->
        <el-tabs v-model="activeName" @click="handleClick">
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
</template>

<script setup>
import { ref } from 'vue'
import Card from './Card.vue'
import services from '../DataServices/DataService.js'
import { useStore } from 'vuex'

const store = useStore()

const cardGroups = ref([]);//array of array of cards
const groups = ref([])//store.state.groups, name of groups
const defaultCards = ref([]);

const handleClick = (tab, event) => {
    console.log(tab, event);
}

const activeName = ref("0");

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

const search = () => {

    //reset cardGroups and defaultCards

    cardGroups.value = []
    defaultCards.value = []

    groups.value = store.state.groups

    services.search(searchText.value).then((res) => {
        console.log(res)
        defaultCards.value = res.data
        defaultCards.value.forEach(card => {
            calculateProgress(card)
        })
    })

    for (let i = 0; i < groups.value.length; i++) {
        services.searchInGroup(searchText.value, groups.value[i]).then((res) => {
            console.log(res)
            cardGroups.value[i] = res.data
            cardGroups.value[i].forEach(card => {
                calculateProgress(card)
            })
        })
    }
       
}

const searchText = ref('')

</script>

<style scoped>
.searchBody,.display {
    width: 950px;
    margin: 50px auto;
}

.showbtn {
    margin-bottom: 20px;
    height: 50px;
    width:100%;
    font-size: 20px;
    background-color: black;
}
</style>