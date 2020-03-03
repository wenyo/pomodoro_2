<template>
    <div>
     <ul class='ringUl'>
        <li v-for='(ring, idx) in vRing' :key='idx' @click.stop='chooseRing(idx)' :class='vRingClass[idx]'>
             <i class="fas fa-bell"></i>
             <span>{{idx+1}}</span>
        </li>
     </ul>
    <!-- <audio :src="sCurrentRing" ref="ringTest" muted>
    </audio> -->
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data(){
        return{
            vRingClass:[],
            sCurrentRing: '',
            ringTest: ''
        }
    },
    created(){
        this.changeClass();
    },
    computed:{
        ...mapState(['iRing', 'vRing']),
    },
    methods:{
        ...mapMutations(['changeRing']),
        // 切換鈴聲
        chooseRing(idx){
            this.changeRing(idx);
            this.changeClass();
            console.log(2222)
            this.playRing();
        },
        // 播放鈴聲
        playRing(){
            if(this.ringTest !== ''){
                this.ringTest.pause();
                this.ringTest = '';
            }
            this.ringTest = new Audio(this.vRing[this.iRing]);
            this.ringTest.play()
        },
        // 切換class
        changeClass(){
            this.vRingClass = [];
            this.vRingClass[this.iRing] = 'active';
            this.sCurrentRing = this.vRing[this.iRing];
        }
    }
}
</script>

<style lang="scss">
    .ringUl{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color-sec;
        li{
            position: relative;
            font-size: $fontsize-xxxl;
            margin: 20px;
            padding: 20px;
            transition: all .5s;
            border-radius: 3px;
            @include pointer;
            &:hover, &.active{
                color: $color-master;
                box-shadow: 0 0 0 1px $color-sec inset;
            }
        }
        span{
            position: absolute;
            font-size: 20px;
            top: 45px;
            left: 45px;
            color: $color-six;
        }
    }
</style>