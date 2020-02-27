<template>
    <div class="toDoList memoBlock">
        <div class="listTitle">TO DO</div>
        <ul v-if='vToDoList.length > 0'>
            <li v-for = '(toDo, toDoIndex) in getShowTodo(vToDoList)' :key='toDoIndex'>
                <span class="checkBox">
                    <i class="far fa-circle checkInput" @click ='checkToDo(toDoIndex)'></i>
                    <!-- <i class="fas fa-check checkIcon"></i> -->
                </span>

                <span class="listItem">
                    <span class="wordActive" v-cloak>{{toDo.content}}</span>
                    <div class="tomato">
                        <!-- 記錄未完成項目蕃茄數量 -->
                        <i class="fas fa-circle" v-for = 'i in toDo.tomatoNum' :key='i'></i>
                        <i class="far fa-circle"></i>
                    </div>
                </span>

                <span   class="playBtn" 
                        :class=" (iTodoNow == toDo.sn) ? 'active' : '' "
                        @click ='getNowTodo(toDoIndex)'>
                    <i  class="fas fa-play-circle" v-if='iTodoNow == toDo.sn'></i>
                    <i  class="far fa-play-circle" v-else></i>
                </span>
            </li>
        </ul>
        <div class="changePage">
            <i class="fas fa-angle-left" 
                v-if='iPrePage > 0'
                @click='getPreItem'></i>
            <i class="fas fa-angle-right" 
                v-if='vToDoList.length > iMaxShowNum'
                @click='getNextItem'></i>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    data(){
        return{
            textInput: '',
            iMaxShowNum: 0,
            iPrePage: 0,
            iPage: 4
        }
    },
    created() {
        // this.getFromLoclstorage();
        this.iMaxShowNum += this.iPage;
    },
    computed: {
     ...mapState(['vToDoList', 'iTodoNow'])
    },
    methods:{
        ...mapMutations(['getNowTodo']),
        ...mapActions(['checkToDo']),
        getShowTodo(array){
            return array.slice(this.iPrePage, this.iMaxShowNum);
        },
        getPreItem(){
            this.iPrePage -= this.iPage;
            this.iMaxShowNum -= this.iPage;
        },
        getNextItem(){
            this.iPrePage += this.iPage;
            this.iMaxShowNum += this.iPage;
        }
    },
}
</script>

<style lang="scss">

    .memoBlock{
        background-color: $color-five;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: -3px 3px 10px $color-six;
        position: relative;
        ul{
            margin: 20px 0;
            padding: 0 10px;
            li{
                display: flex;
                justify-content: space-between;
                align-items:center;
                margin: 25px 0;
            }
        }
        .checkBox{
            height: 25px;
            width: 25px;
        }
        .checkInput{
            font-size: $fontsize-m;
        }
        .checkIcon{
            font-size: $fontsize-m;
        }
    }
    .toDoList{
        margin-top: 30px;
        min-height: 320px;
    }

    .listItem{
        width: calc(100% - 50px*2);
        margin-top: 5px;
        position: relative;
        border-bottom: 2px solid $color-master;
    }

    .tomato{
        position: absolute;
        color: $color-master;
        font-size: $fontsize-xxs;
        margin-top: 10px;
        bottom: -20px;
        display: flex;
    }
    .tomato i{
        margin-right: 3px;
    }

    .playBtn{
        color: $color-master;
        font-size: $fontsize-m;
        transition: all .3s;
        // @include pointer;
        &:hover{
            text-shadow: 0 0 3px $color-four;
        }
    }
    .wordActive{
        background-size: 100% 90%;
        background-repeat: no-repeat;
        background-image: linear-gradient(to top, $color-master 40%, $color-five 40%);
    }

    // change Page
    .changePage{
        position: absolute;
        bottom: 3px;
        right: 20px;
        i{
            @include pointer;
            padding: 5px 3px;
            &:hover{
                color: $color-master;
            }
        }
    }
</style>