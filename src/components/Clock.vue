<template>
    <div class="countDownBlock">
        <div class="selToDoList">
            <span class="checkBox">
                <div class="checkInput"></div>
                <i class="fas fa-check checkIcon"></i>
            </span>

            <span class="listItem">
                <span :class=" bReset ? 'grayColor' : '' " v-cloak>{{sReadyitem}}</span>
                <div class="line"></div>
                <div class="tomato" v-if='iTodoNow > -1'>
                    <!-- 記錄當前待辦事項蕃茄數量 -->
                    <i class="fas fa-circle" v-for = 'i in vToDo.tomatoNum' :key='i'></i>
                    <i class="far fa-circle"></i>
                </div>
            </span>
        </div>

        <div class="countDown">
            <div class="outerClock">
                <div class="innerClock" ref='innerClock'>
                    <div class="playbtn">
                        <i class="fas fa-play play" v-if='!bPlayTimer' @click = "countDownStart"></i>
                        <i class="fas fa-pause pause" v-else @click = "countDownpause"></i>
                    </div>
                </div>
            </div>

            <div class="time" v-cloak>{{sCountTime}}</div>                            
        </div>

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
            bWork: 0, // 工作狀態 = 0; 休息狀態 = 1,
            timer: ''
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
      ...mapState(['iTodoNow', 'vToDoList', 'bPlayTimer'])
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
        bWork(){
            this.checkSCountTime();
        }
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

            this.checkCount();
            if(iTotalSeconds > 0){
                this.timer = window.setInterval(function(){
                    iTotalSeconds--;
                    const iMinute = Math.floor(iTotalSeconds / 60);
                    const iSecond = iTotalSeconds % 60;
                    const sMinute = iMinute > 10 ? iMinute.toString() : '0'+ iMinute.toString();
                    const sSecond = iSecond > 10 ? iSecond.toString() : '0'+ iSecond.toString();
                    this.sCountTime = sMinute + ':' + sSecond;

                    // 切換內圈樣式
                    let iClass = this.vChangeClassTimer[this.type][this.bWork].indexOf(this.sCountTime);
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
        countDownpause(){
            this.checkCount();
            clearInterval(this.timer);
        },
        // 倒數結束 換到下一個階段
        changeWork(){
            clearInterval(this.timer);
            if(this.bWork == 0){
                this.vToDo.tomatoNum += 1
                this.updateToDo(this.vToDo);
            }
            this.bWork = this.bWork == 0 ? this.bWork + 1 : this.bWork - 1;
            this.countDownpause();
            this.addInnerClockClass(-1);
        },
        // Pomodoro 內圈樣式轉換
        addInnerClockClass(iClass){
            const sNewClass = (iClass !== -1) ? this.vClockClassName[iClass] : '';
            this.$refs.innerClock.className = 'innerClock ' + sNewClass;
        },
        // 倒數數字
        checkSCountTime(){
            this.sCountTime = this.vTimer[this.type][this.bWork];
        },
        // 延續當前代辦事項
        checkNowTodo(){
            this.bReset = false;
            this.vToDo = this.vToDoList.filter( vtodo =>{
                return vtodo['sn'] == this.iTodoNow;
            })[0];
            this.sReadyitem = this.vToDo['content'];
            this.bWork = this.vToDo['bWork'];
            this.checkSCountTime();
        }
    }
}
</script>

<style lang="scss">
    #homePage{
    position: relative;
    height: 700px;
}
.memoList{
    position: absolute;
    left: 0;
    display: inline-flex;
    width: 30%;
    flex-direction: column;
    transition: 2s;
}
.memoListNoShow{
    left: -40%;
    @include over-hidden;
}
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

.line{
    width: 60px;
    height: 3px;
    background-color: $color-master;
}
.grayColor{
    color: $color-five;
}

// listDetail
    // .inputText
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
        @include pointer;
        transition: all .5s;
    }

    .submit:hover{
        text-shadow: 0 0 5px $color-thir;
    }

    // listDetail - Basic
    .memoBlock{
        background-color: $color-five;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 20px;
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
    }

    //TO DO or TO DONE
    .listTitle{
        color: $color-master;
        background-color: $color-sev;
        padding: 15px 10px;
        border-radius: 10px;
    }

    .listItem{
        width: calc(100% - 50px*2);
        margin-top: 5px;
        position: relative;
        border-bottom: 2px solid $color-master;
    }

    .tomato{
        position: absolute;
        max-width: 100%;
        color: $color-master;
        font-size: $fontsize-xxs;
        display: flex;
        flex-wrap: wrap;
        top: 10px;
    }
    .tomato i{
        margin-right: 3px;
        margin-top: 3px;
    }

    .playBtn{
        color: $color-master;
        font-size: $fontsize-m;
        @include pointer;
        .btnReady{
            background-color: $color-sev;
            border-radius: 28px;
        }
    }
    .toDoneitem{
        margin-right: 30px;
    }
    .wordActive{
        background-size: 100% 90%;
        background-repeat: no-repeat;
        background-image: linear-gradient(to top, $color-master 40%, $color-five 40%);
    }

// 倒數時鐘部分
.countDownBlock{
    width: 65%;
    transition: 2s;
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
        .listItem{
            position: relative;
            margin-left: 20px;
            border: none;
            .tomato{
                left: 0;
                top: 35px;
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