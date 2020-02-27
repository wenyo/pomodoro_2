<template>
  <div class="home" :class="sHomeClass">
    <Memo :class="sMemoClass"></Memo>
    <Clock :type='type'></Clock>
  </div>
</template>

<script>
import Memo from "../components/Memo";
import Clock from "../components/Clock";

import { mapState } from 'vuex';

export default {
  components: { Memo, Clock },
  data(){
    return{
      type: 0,
      sHomeClass: '',
      sMemoClass: ''
    };
  },
  created(){
      this.checkPath();
      console.log(this.bPlayTimer)
  },
  computed: {
    ...mapState(['bPlayTimer']),
    path(){
      return this.$route.path;
    },
  },
  watch: {
    path(){
      this.checkPath();
    },
    bPlayTimer(){
      this.sHomeClass = this.bPlayTimer ? 'center' : '';
      this.sMemoClass = this.bPlayTimer ? 'hide' : '';
    }
  },
  methods:{
    checkPath(){
      if(this.path == '/bomb'){
        this.type = 1;
      }else{
        this.type = 0;
      }
    }
  }
};

</script>

<style lang="scss">
  .home{
    display: flex;
    padding: 3vh 2.5vw;
    transition: all .3s;
  }
  .center{
    justify-content: center;
  }
  .hide{
    animation-name: hideMenu;
    animation-duration: 1s;
    position: absolute;
    animation-fill-mode:forwards;
  }
  @keyframes hideMenu{
    from{
        left:0;
    }
    to{
      left: -25vw;
    }
}
</style>