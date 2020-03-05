<script>
import { Bar } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
    extends: Bar,
    created(){
        this.getVDate();
        this.calcCharts(this.vToDoList);
        this.calcCharts(this.vToDoneList);
        this.getYAxesStep();
    },
    mounted () {
        this.renderChart({
        type: 'bar',
        labels: this.vDateText,
        datasets: [
                {
                    type: 'line',
                    label: this.vType[1],
                    data: this.vData[1],
                    backgroundColor: '#056ec4',
                },
                {
                    type: 'bar',
                    label: this.vType[0],
                    data: this.vData[0],
                    backgroundColor: '#e20067',
                }],
            }, 
            {
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            stepSize: this.iYAxesStep
                        }
                    }]
                }
            }
        );
    },
    data(){
        return{
            vChartData: {},
            vDateText: [],
            vDateTimestamp: [],
            iDays: 7,
            vType: ['tomatos', 'items'],
            vData: [[0,0,0,0,0,0,0], [0,0,0,0,0,0,0]],
            iYAxesStep: 1,
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
        // 計算番茄與項目數量
        calcCharts(array){
            if(array.length < 1) return;
            for (const vInfo of array) {
                for (let key = 0; key < this.vDateTimestamp.length; key++) {
                    if(this.vDateTimestamp[key] <= vInfo.updateDate &&
                        this.vDateTimestamp[key+1] > vInfo.updateDate){
                        this.vData[0][key] += vInfo.tomatoNum;
                        if(vInfo.tomatoNum > 0){
                            this.vData[1][key] += 1;
                        }
                        break;
                    };
                };
            };
        },
        getYAxesStep(){
            const vMerge = this.vData[0].concat(this.vData[1]);
            const iMax = Math.max(...vMerge);
            this.iYAxesStep = iMax > 10 ? this.iYAxesStep * Math.ceil(iMax / 10) : this.iYAxesStep;
        }
    }
}
</script>