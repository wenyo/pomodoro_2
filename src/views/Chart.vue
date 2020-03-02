<template>
  <div id="chart7Days">
    <div class="info">
        <div>
            <div class="infoTitle">FOCUS TIME</div>
            <div class="infoContent">

                <div class="todayTotal">
                    <span class='smallWord'>TODAY</span>
                    <span>{{todayTomato}}</span>
                    <span class="unit">/TOMATO</span>
                </div>

                <div class="weekTotal">
                    <span class='smallWord'>WEEK</span>
                    <span>{{weekTomato}}</span>
                    <span class="unit">/TOMATO</span>
                </div>

            </div>
        </div>

        <div>
            <div class="infoTitle">FOCUS ITEM</div>
            <div class="infoContent">                            
                
                <div class="todayTotal">
                    <span class='smallWord'>TODAY</span>
                    <span>{{todayItem}}</span>
                    <span class="unit">/ITEM</span>
                </div>

                <div class="weekTotal">
                    <span class='smallWord'>WEEK</span>
                    <span>{{weekItem}}</span>
                    <span class="unit">/ITEM</span>
                </div>

            </div>
        </div>     
    </div>
    <div class="chart">
      <div class="infoTitle">
        <p>7DAYS CHART</p>
        </div>
      <charts class='chartDetail'></charts>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import charts from '../components/7DaysChart';

export default {
  components:{ charts },
  data(){
    return{
      vWeekRange: [],
      vTodayRange: [],
      vDate: []
    }
  },
  computed:{
    ...mapState(['vToDoneList', 'vToDoList', 'date']),
    todayTomato(){
      let iTomatos = this.tomatoReduce(this.vToDoneList, this.vTodayRange) + this.tomatoReduce(this.vToDoList, this.vTodayRange);
      return iTomatos ? iTomatos : 0;
    },
    weekTomato(){
      let iTomatos = this.tomatoReduce(this.vToDoneList, this.vWeekRange) + this.tomatoReduce(this.vToDoList, this.vWeekRange);
      return iTomatos ? iTomatos : 0;
    },
    todayItem(){
      let items = this.itemsReduce(this.vToDoneList, this.vTodayRange) + this.itemsReduce(this.vToDoList, this.vTodayRange);
      return items ? items : 0;
    },
    weekItem(){
      let items = this.itemsReduce(this.vToDoneList, this.vWeekRange) + this.itemsReduce(this.vToDoList, this.vWeekRange);
      return items ? items : 0;
    },
  },
  created(){
    this.getVDate();
    this.getVWeekRange();
    this.getVTodayRange();
  },
  methods:{
    addDays(days){
      const today = new Date(this.vDate[0], this.vDate[1]-1, this.vDate[2]);
      return today.setDate(today.getDate() + days);
    },
    // 把 date 字串拆成陣列
    getVDate(){
      this.vDate = this.date.split('/');
    },
    // 番茄累加器
    tomatoReduce(array, vDate){
      return array.reduce( (acc, cur) => {
        if(cur.updateDate >= vDate[0] && cur.updateDate < vDate[1]){
           acc =  acc + cur.tomatoNum
        }
        return acc;
      }, 0)
    },
    // 項目累加器
    itemsReduce(array, vDate){
      let itemResult = array.reduce( (acc, cur) => {
        if(cur.updateDate >= vDate[0] && cur.updateDate < vDate[1] && cur.tomatoNum > 0){
          acc++;
        }
        return  acc
      }, 0);
      return itemResult ? itemResult : 0;
    },
    // 得到一週時間戳區間
    getVWeekRange(){
      const iMaxDate = this.addDays(1).valueOf();
      const iMinDate = this.addDays(-7).valueOf();
      this.vWeekRange = [iMinDate, iMaxDate];
    },
    // 得到一天時間戳區間
    getVTodayRange(){
      const iMinDate = this.addDays(0).valueOf();
      const iMaxDate = this.addDays(1).valueOf();
      this.vTodayRange = [iMinDate, iMaxDate];
    },
  }
}
</script>

<style lang="scss">
  #chart7Days{
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    &>div{
        width: 400px;
        margin: 0 20px;
    }
  }
  .infoTitle{
    background-color: $color-six;
    color: $color-master;
    font-size: $fontsize-m;

    width: 100%;
    box-sizing: border-box;
    padding: 15px 25px;
    border-radius: 5px;
  }
  .infoContent{
    padding: 15px 25px;
    margin: 40px 0 30px 0;
    font-size: $fontsize-xl;
    color: $color-master;
    &>div{
        position: relative;
        display: inline-block;
        width: 160px;
    }
  }
  .smallWord{
    font-size: $fontsize-xs;
    color: $color-thir;
    position: absolute;
    top: -20px;
    left:0;
  }
  .unit{
    font-size: $fontsize-xs;
    color: $color-five;   
  }
  .note{
    margin-right:10px;
    text-align: right;
  }

  .chartDetail{
    width: 400px;
    height: 300px;
  }
</style>