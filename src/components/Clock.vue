<template>
    <div class="countDownBlock">
        <div class="selToDoList" :class='changeDark(this.vToDo.bWork)'>
            <span class="checkBox">
                <div class="checkInput" :class='changeDark(this.vToDo.bWork)'></div>
                <i class="fas fa-check checkIcon" :class='changeDark(this.vToDo.bWork)'></i>
            </span>

            <span class="listItem sTodoNow">
                <span :class=" bReset ? 'grayColor' : '' " v-cloak>{{sReadyitem}}</span>
                <div class="line" :class='changeDark(this.vToDo.bWork)'></div>
                <div class="tomato" :class='changeDark(this.vToDo.bWork)' v-if='iTodoNow > -1'>
                    <!-- 記錄當前待辦事項蕃茄數量 -->
                    <i class="fas fa-circle" v-for = 'i in vToDo.tomatoNum' :key='i'></i>
                    <i class="far fa-circle"></i>
                </div>
            </span>
        </div>

        <div class="countDown">
            <div class="outerClock" :class='changeDark(vToDo.bWork)'>
                <div class="innerClock" :class='changeDark(vToDo.bWork)' ref='innerClock'>
                    <div class="playbtn">
                        <i class="fas fa-play play" v-if='!bPlayTimer' @click = "countDownStart"></i>
                        <i class="fas fa-pause pause" v-else @click = "countDownpause"></i>
                    </div>
                </div>
            </div>
            <div class="time" :class='changeDark(vToDo.bWork)' v-cloak>{{sCountTime}}</div>                            
        </div>
        <audio ref="ring">
            <source :src="vRing[iRing]" type="audio/mpeg">
        </audio>
        <div class="confirmAlert giveUp" v-if='bShowComfirm'>
            <p>真的要放棄嗎？時間將重新計時</p>
            <div class="confirm" @click='bShowComfirm = false'>
                <span @click='checkCount(); checkSCountTime()'>真ㄉ拉</span>
                <span @click='countDownStart()'>先不要</span>
            </div>    
        </div>
        <div class="back" v-if='bShowComfirm'></div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    props: ['type'],
    data(){
        return{
            vTimer: [['30:00', '05:00'], ['00:10', '00:05']],
            // 更換 class 時間
            vChangeClassTimer: [[['15:00', '05:00', '02:00'],['04:00','02:00','01:00']],
                                [['00:08', '00:05', '00:03'],['00:04', '00:03','00:02']]],
            bReset: true,
            sReadyitemPreset: 'Do Something today!',
            sReadyitem: '',
            sCountTimePreset: '00:00',
            sCountTime: '',
            vToDo: [],
            vClockClassName: ['tenMins','twentyMins','twenty3Mins'],
            timer: '',
            bShowComfirm: false
        }
    },
    created() {
        if(this.iTodoNow == 0 ){
            this.resetStatus();
        }else{
            this.checkNowTodo();
        }
    },
    computed:{
      ...mapState(['iTodoNow', 'vToDoList', 'bPlayTimer', 'vRing', 'iRing'])
    },
    watch:{
        iTodoNow(){
            if(this.iTodoNow == 0){
                this.resetStatus();
            }else{
                this.checkNowTodo();
            }
        },
        type(){
            if(this.iTodoNow !== 0){
                this.checkSCountTime();
            }
        },
    },
    methods:{
        ...mapActions(['updateToDo']),
        ...mapMutations(['checkCount']),
        // 預設狀態 （尚未選擇代辦事項）
        resetStatus(){
            this.bReset = true;
            this.sReadyitem = this.sReadyitemPreset;
            this.sCountTime = this.sCountTimePreset;
        },
        // 開始倒數鍵
        countDownStart(){
            let secondsAry = this.sCountTime.split(":");
            let iTotalSeconds = parseInt(secondsAry[0]) * 60 + parseInt(secondsAry[1]);
            if(this.iTodoNow == 0 || iTotalSeconds == 0){return;}
            if(!this.bPlayTimer){ this.checkCount(); }
            if(iTotalSeconds > 0){
                this.timer = window.setInterval(function(){
                    iTotalSeconds--;
                    const iMinute = Math.floor(iTotalSeconds / 60);
                    const iSecond = iTotalSeconds % 60;
                    const sMinute = iMinute > 10 ? iMinute.toString() : '0'+ iMinute.toString();
                    const sSecond = iSecond > 10 ? iSecond.toString() : '0'+ iSecond.toString();
                    this.sCountTime = sMinute + ':' + sSecond;

                    // 切換內圈樣式
                    let iClass = this.vChangeClassTimer[this.type][this.vToDo['bWork']].indexOf(this.sCountTime);
                    if(iClass !== -1){
                        this.addInnerClockClass(iClass);
                    }
                    // 時間為 0
                    if(iTotalSeconds == 0){
                        this.changeWork();
                    }
                }.bind(this), 1000)
            }else{
                this.changeWork();
            }
        },
        // 停止倒數鍵
        // 需確認是否真的要停止, 停止後時間要歸零 
        countDownpause(){
            let secondsAry = this.sCountTime.split(":");
            let iTotalSeconds = parseInt(secondsAry[0]) * 60 + parseInt(secondsAry[1]);
            if(iTotalSeconds > 0){
                clearInterval(this.timer);
                this.bShowComfirm = true;
            }
        },
        // 倒數結束 換到下一個階段
        changeWork(){
            clearInterval(this.timer);
            this.checkCount();
            this.playRing();
            if(this.vToDo['bWork'] == 0){
                this.vToDo.tomatoNum += 1
            }
            this.vToDo['updateDate'] = Date.now(),
            this.vToDo['bWork'] = this.vToDo['bWork'] == 0 ? this.vToDo['bWork'] + 1 : this.vToDo['bWork'] - 1;
            this.updateToDo(this.vToDo);
            this.countDownpause();
            this.addInnerClockClass(-1);
            this.checkSCountTime();
        },
        // Pomodoro 內圈樣式轉換
        addInnerClockClass(iClass){
            const sNewClass = (iClass !== -1) ? this.vClockClassName[iClass] : '';
            const sDark = this.changeDark(this.vToDo.bWork);
            this.$refs.innerClock.className = sDark + ' innerClock ' + sNewClass;
        },
        // 倒數數字
        checkSCountTime(){
            this.sCountTime = this.vTimer[this.type][this.vToDo['bWork']];
        },
        // 延續當前代辦事項
        checkNowTodo(){
            this.bReset = false;
            this.vToDo = this.vToDoList.filter( vtodo =>{
                return vtodo['sn'] == this.iTodoNow;
            })[0];
            this.sReadyitem = this.vToDo['content'];
            this.checkSCountTime();
        },
        // 加上暗黑模式的class
        changeDark(bWork){
            return bWork==1 ? 'dark' : '';
        },
        // 播放鈴聲
        playRing(){
            let ring = this.$refs.ring;
            ring.play();
        }
    }
}
</script>

<style lang="scss">
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
        &.dark{
            color: $color-sec;
        }
    }

    .line{
        width: 60px;
        height: 3px;
        background-color: $color-master;
        &.dark{
            background-color: $color-sec;
        }
    }
    .grayColor{
        color: $color-five;
    }
    .sTodoNow{
        @include pc768{
            width: 70%;
        }
    }

    // 倒數時鐘部分
    .countDownBlock{
        width: 65%;
        transition: 2s;
        margin-left: 5vw;
        @include pc768{
            width: 100%;
            margin-left: 0;
        }
    }
    .moveToCenter{
        right: 10%
    }
    // 被選擇的待辦事項
    .selToDoList{
        display: flex;
        align-items: top;
        font-size: $fontsize-xl;
        color: $color-master;
        &.dark{
            color: $color-sec;
        }
        .listItem{
            position: relative;
            margin-left: 20px;
            border: none;
            .tomato{
                max-width: 100%;
                left: 0;
                top: 50px;
            }
        }
        .checkBox{
            margin-top: 10px;
            margin-left: 10%; 
        }
        .checkInput{
            width: 40px;
            height: 40px;
            border-radius: 60px;
            border: 2px solid $color-master;
            &.dark{
                border: 2px solid $color-sec;
            }
        }
        .checkIcon{
            top: 0;
            right: -5px;
        }
    }

    // 時鐘設定
    .countDown{
        margin-top: 20px;
        margin-left: 5%; 
        height: 550px;
        width: 550px;
        position: relative;
        @include pc768{
            margin-left: 0; 
            margin: 20px auto 0 auto;
        }
        .playbtn{
            color: $color-six;
            font-size: $fontsize-m;
            transition: all 1s;
            @include pointer;
            padding: 5px;
            &:hover{
                color: $color-four;
                font-size: $fontsize-l;
                text-shadow: 0 0 3px $color-sev;
            }
        }
    }
    .outerClock{
        width: 100%;
        height: 100%;
        border-radius: 100%;

        background-color: $color-sev;
        border: 2px solid $color-master;
        box-shadow: 0 0 40px 10px $color-master inset;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        z-index: 3;
        &.dark{
            border: 2px solid $color-sec;
            box-shadow: 0 0 40px 10px $color-sec inset;
        }
    }
    .innerClock{
        width: 30%;
        height: 30%;
        background-color: $color-master;
        border-radius: 100%;

        border: 2px solid $color-master;
        box-shadow: 0 0 30px 40px $color-master;

        display: flex;
        justify-content: center;
        align-items: center;

        animation-name: innerCircle-5mins;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        &.dark{
            background-color: $color-sec;
            border-radius: 100%;
            border: 2px solid $color-sec;
            box-shadow: 0 0 30px 40px $color-sec;
        }
    }
    .tenMins{
        animation-name: innerCircle-10mins;
    }
    .twentyMins{
        animation-name: innerCircle-20mins;
    }
    .twenty3Mins{
        animation-name: innerCircle-23mins;
    }
    @keyframes innerCircle-5mins{
        from{
            width: 30%;
            height: 30%;
        }
        to{
            width: 40%;
            height: 40%;
        }
    }
    @keyframes innerCircle-10mins{
        from{
            width: 40%;
            height: 40%;
        }
        to{
            width: 50%;
            height: 50%;
        }
    }
    @keyframes innerCircle-20mins{
        from{
            width: 50%;
            height: 50%;
        }
        to{
            width: 60%;
            height: 60%;
        }
    }
    @keyframes innerCircle-23mins{
        from{
            width: 60%;
            height: 60%;
        }
        to{
            width: 70%;
            height: 70%;
        }
    }
    .time{
        color: $color-master;
        font-size: $fontsize-xxl;
        text-align: right;
        padding-left: 175px;
        background-repeat: no-repeat;
        border-bottom: 2px solid $color-master;
        position: absolute;
        bottom: -4px;
        right: -50px;
        z-index: 0;
        &.dark{
            color: $color-sec;
            border-bottom: 2px solid $color-sec;
        }
    }

</style>