<template>
    <nav class='nav' ref='nav'>
        <div class="minMenu" @click='showMenu()'>
            <i class="fas fa-bars noShow"></i>
            <i class="fas fa-times show"></i>
        </div>
        <div class="menucontent">
            <router-link :class='vMenuClass[0]' to="/"><i class="far fa-clock"></i></router-link>
            <router-link :class='vMenuClass[1]' to="list"><i class="far fa-list-alt"></i></router-link>
            <router-link :class='vMenuClass[2]' to="chart"><i class="fas fa-chart-bar"></i></router-link>
            <router-link :class='vMenuClass[3]' to="ring"><i class="fas fa-music"></i></router-link>
            <router-link :class='vMenuClass[4]' to="bomb"><i class="fas fa-bomb"></i></router-link>            
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

export default({
    data(){
        return{
            iPath: -1,
            vMenuClass : [],
            bShow: false
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
        },
        showMenu(){
            let nav = this.$refs.nav.classList;
            if(this.bShow){
                nav.remove('showMenu')
            }else{
                nav.add('showMenu')
            }
            this.bShow = !this.bShow;
        }
    },
})
</script>

<style lang="scss">
  
    .menucontent{
        position: fixed;
        right: 0;
        display: flex;
        flex-direction: column;
        z-index: 10;
        a{
            color: $color-six;
            text-decoration: none;
            font-size: $fontsize-m;
            margin: 12px;
            &:hover{
                text-shadow: 0 0 20px $color-thir;
                color: $color-master;
            }
            &.nowPath{
                color: $color-master;
            }
        }
        @include pc960{
            display: none;
        }
    }
    .minMenu{
        color: $color-master;
        position: fixed;
        z-index: 11;
        right: 0;
        font-size: $fontsize-m;
        display: none;
        width: 30px;
        padding: 4px;
        margin: 8px;
        @include pointer;
        &:hover{
            text-shadow: 0 0 20px $color-thir;
        }
        @include pc960{
            display: flex;
        }
    }
    .show{
        display: none;
    }

    .showMenu{
        .noShow{
            display: none;
        }
        .show{
            display: flex;
            z-index: 11;
            margin: 0 auto;
            padding-bottom: 4px;
            border-bottom: 2px solid $color-master;
        }
        .menucontent{
            display: flex;
            padding-top: 50px;
            background: $color-four;
        }
    }
</style>