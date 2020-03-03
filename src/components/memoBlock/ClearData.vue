<template>
    <div>
        <div class='clearData' @click='showAlert'>Clear Data</div>
        <div class="confirmAlert" v-if = 'bConfirmAlert'>
            <div class="close" @click='showAlert'><i class="fas fa-times"></i></div>
            <div class="content" v-if='bDel'>
                <p>即將清除資料，要選擇哪個呢？</p>
                <div class="confirm" @click='showAlert'>
                    <span @click='clearInLoclstorage("todo")'>TO DO</span>
                    <span @click='clearInLoclstorage("todone")'>TO DONE</span>
                </div>                
            </div>
            <div class="content" v-else>
                <p>尚無資料可以清除呦！</p>
                <div class="confirm" @click='showAlert'>
                    <span>好ㄅ</span>
                </div>                
            </div>
        </div>
        <div class="back" v-if='bConfirmAlert' @click='showAlert'></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data(){
        return{
            bConfirmAlert: false,
            // bDel: false
        }
    },
    computed:{
        ...mapState(['vToDoList', 'vToDoneList']),
        bDel(){
            const iCount = this.vToDoList.length + this.vToDoneList.length;
            return iCount > 0 ? true : false;
        }
    },
    methods:{
        ...mapMutations(['clearInLoclstorage']),
        showAlert(){
            this.bConfirmAlert =! this.bConfirmAlert
        }
    }
}
</script>

<style lang="scss">

    .clearData{
        font-size: 17px;
        width: 100%;
        padding: 10px;
        text-align: center;
        color: $color-sec;
        border: 2px solid $color-sec;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 8px 2px $color-sec inset;
        transition: all .5s;
        @include pointer;
        &:hover{
            color: $color-thir;
            box-shadow: 0 0 10px 5px $color-sec inset;
        }
    }
    .confirmAlert{
        background-color: $color-five;
        width: 300px;
        height: 80px;
        padding: 30px;
        border-radius: 20px;
        position: fixed;
        top: calc(50vh - 60px);
        right: calc(50vw - 150px);
        z-index: 10;
        p{
            text-align: center;
        }
    }
    .confirm{
        margin: 25px 0;
        display: flex;
        justify-content: center;
        white-space:nowrap;
        span{
            box-sizing: border-box;
            padding: 10px 20px;
            margin: 0 20px;
            background-color: $color-sev;
            border-radius: 5px;
            text-align: center;
            @include pointer;
            transition: .3s;
            &:hover{
                background-color: $color-sec;
            }
        }
    }
    .back{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: $color-sev;
        opacity: .6;
        z-index: 3;
    }
    .close{
        position: absolute;
        top: 10px;
        right: 20px;
        padding: 3px;
        transition: all .3s;
        @include pointer;
        &:hover{
            color: $color-sec;
        }
    }
</style>