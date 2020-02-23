<template>
    <nav class='nav' ref='nav'>
      <router-link :class='vMenuClass[0]' to="/"><i class="far fa-clock"></i></router-link>
      <router-link :class='vMenuClass[1]' to="list"><i class="far fa-list-alt"></i></router-link>
      <router-link :class='vMenuClass[2]' to="chart"><i class="fas fa-chart-bar"></i></router-link>
      <router-link :class='vMenuClass[3]' to="bomb"><i class="fas fa-bomb"></i></router-link>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

export default({
    data(){
        return{
            iPath: -1,
            vMenuClass : []
        }
    },
    mounted() {
        this.findNowPath();
    },
    computed: {
      path(){
        return this.$route.path;
      },
      ...mapState(['vPath'])
    },
    watch: {
        path(){
            this.findNowPath();
        }
    },
    methods: {
        findNowPath(){
            this.iPath = this.vPath.indexOf(this.path);
            this.vMenuClass = [];
            this.vMenuClass[this.iPath] = 'nowPath';
        }
    },
})
</script>

<style lang="scss">
  
    .nav{
        position: fixed;
        right: 0;
        display: flex;
        flex-direction: column;
        a{
            color: #3f3f3f;
            text-decoration: none;
            font-size: 30px;
            margin: 12px;
            &:hover{
                text-shadow: 0 0 20px #e5e5e5;
                color: $color-master;
            }
            &.nowPath{
                color: #e20067;
            }
        }
    }
</style>