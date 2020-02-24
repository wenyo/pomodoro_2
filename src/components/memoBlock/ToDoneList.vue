<template>
    <div class="toDoneList memoBlock">
        <div class="listTitle">TO DONE</div>

        <ul>
            <li v-for = '(toDone, toDoneIndex) in getShowTodo(vToDoneList)' :key='toDoneIndex'>
                <span class="checkBox" @click = 'checkToDone(toDoneIndex)'>
                    <i class="far fa-circle checkInput"></i>
                    <i class="fas fa-check checkIcon"></i>
                </span>

                <span class="listItem toDoneitem">
                    <span v-cloak>{{toDone['content']}}</span>
                    <div class="tomato">
                    <!-- 記錄已完成項目蕃茄數量 -->
                        <i class="fas fa-circle" v-for = 'i in toDone.tomatoNum' :key='i'></i>
                    </div>
                </span>
            </li>
        </ul>
        
        <div class="seeMore" v-if='vToDoneList.length > 2'><a href="#memoList">more data</a></div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data(){
        return{
            iMaxShowNum: 2,
            iPrePage: 0,
        }
    },
    computed: {
        ...mapState(['vToDoneList'])
    },
    methods:{
        ...mapActions(['checkToDone']),
        getShowTodo(array){
            return array.slice(this.iPrePage, this.iMaxShowNum);
        },
    }
}
</script>

<style lang="scss" scoped>
    .checkBox{
        position: relative;
        @include pointer;
    }
    .checkInput{
        position: absolute;
        top: 0;
        right: 0;
    }
    .checkIcon{
        color: $color-master;
        position: absolute;
        bottom: 0;
        right: -4px;
    }
</style>