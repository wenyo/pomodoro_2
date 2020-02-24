<template>
  <div id="app">
    <Menu></Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu';
import { mapMutations } from 'vuex';

export default {
  components: { Menu },
  created(){
    this.getFromLoclstorage();
  },
  methods:{
    ...mapMutations(['getFromLoclstorage'])
  }
}
</script>

<style lang="scss">

  @import './assets/css/reset.css';

  body{
    background-color: $color-sev;
    color: $color-thir;
  }
</style>
