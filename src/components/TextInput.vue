<template>
    <div class="inputText">
        <input id="textInput" type="text" placeholder="What do you want to do today?" 
                v-on:keyup='submitBindEnter' v-model = "textInput">
        <i class="fas fa-plus submit" @click='submit'></i>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data(){
        return{
            textInput: ''
        }
    },
    computed: {
      ...mapState(['vToDoList'])
    },
    methods: {
        ...mapMutations(['storeInLoclstorage', 'submit']),
        // 送出輸入to do item綁定Enter按鍵
        submitBindEnter: function(e){
            const textInput = document.querySelector('#textInput');
            if(e.keyCode == 13 && textInput.value){
                this.submit();
            }
        },

    },
}
</script>

<style lang="scss">

    .todoBlock{
        display: inline-block;
        width: 30vw;
        margin: 4vh 2vw;
    }

    .inputText{
        position: relative;
        width: 100%;
        height: 35px;
        input{
            position: absolute;
            font-size: $fontsize-xs;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            box-shadow: 0 0 15px $color-sev inset;

            color: $color-master;
            background-color: $color-six;

            border: 2px solid $color-six;
            border-radius: 3px;
        }
    }

    .submit{
        color: $color-master;
        position: absolute;
        right: 10px;
        top: 14px;
        cursor: pointer;
        transition: all .5s;
    }
</style>