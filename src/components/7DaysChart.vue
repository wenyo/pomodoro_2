<script>
import { Bar } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
    extends: Bar,
    props: ['chart-type'],
    created(){
        this.checkDataType();
        this.getVDate();
        this.calcCharts(this.vToDoList, false);
        this.calcCharts(this.vToDoneList);
    },
    mounted () {
        this.renderChart({
        labels: this.vDateText,
        datasets: [
            {
                label: this.vType[this.iType],
                backgroundColor: '#e20067',
                data: this.vData[this.iType],
            }
        ],
        }, {responsive: true, maintainAspectRatio: false});
    },
    data(){
        return{
            vDateText: [],
            vDateTimestamp: [],
            iDays: 7,
            vType: ['tomatos', 'items'],
            vData: [[0,0,0,0,0,0,0], [0,0,0,0,0,0,0]],
            iType: -1
        }
    },
    computed:{
        ...mapState(['vToDoneList', 'vToDoList', 'date']),
    },
    methods:{
        // 得到前 7天 的日期陣列
        getVDate(){
            // 明天
            let rs1 = this.reduceDays(-1);
            this.vDateTimestamp.unshift(rs1[0]);
            // 過去 7天
            for (let day = 0; day < this.iDays; day++) {
                let rs = this.reduceDays(day);
                this.vDateTimestamp.unshift(rs[0]);
                this.vDateText.unshift(rs[1]);
            }
        },
        // 計算前幾天
        reduceDays(days){
            const vToday = this.date.split('/');
            const today = new Date(vToday[0], vToday[1]-1, vToday[2]);
            let day = today.setDate(today.getDate() - days);
            const sDay = new Date(day).getMonth()+1 + '/' + new Date(day).getDate();
            return [day, sDay];
        },
        // 計算番茄數量
        calcCharts(array, btodone = true){
            if(array.length < 1) return;
            for (const vInfo of array) {
                for (let key = 0; key < this.vDateTimestamp.length; key++) {
                    if(this.vDateTimestamp[key] <= vInfo.updateDate &&
                        this.vDateTimestamp[key+1] > vInfo.updateDate){
                        this.vData[0][key] += vInfo.tomatoNum;
                        if(btodone){
                            this.vData[1][key] += 1;
                        }
                        break;
                    };
                };
            };
        },
        // 使用 'tomato'/'item' 資料
        checkDataType(){
            if(this.chartType == 'tomato'){
                this.iType = 0;
            }else if(this.chartType == 'item'){
                this.iType = 1;
            }
        }
    }
}
</script>