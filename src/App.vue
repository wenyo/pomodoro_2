<template>
  <div id="app">
    <Menu :class='sMenuClass'></Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu';
import { mapState, mapMutations } from 'vuex';

export default {
  components: { Menu },
  data(){
    return{
      sMenuClass: '',
    }
  },
  created(){
    this.getFromLoclstorage();
  },
  computed:{
    ...mapState(['bPlayTimer'])
  },
  methods:{
    ...mapMutations(['getFromLoclstorage']),
  },
  watch:{
    bPlayTimer(){
      this.sMenuClass = this.bPlayTimer ? 'hideMenu' : '';
    }
  }
}
</script>

<style lang="scss">

  @import './assets/css/reset.css';

  body{
    background-color: $color-sev;
    color: $color-thir;
  }
  .hideMenu{
    animation-name: hideMenu;
    animation-duration: 1s;
    position: absolute;
    animation-fill-mode:forwards;
  }
  @keyframes hideMenu{
    from{
      right:0;
    }
    to{
      right: -54px;
    }
  }
</style>
