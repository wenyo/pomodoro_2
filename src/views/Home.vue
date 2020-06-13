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
      sMemoClass: '',
      hideMsg: '',
    };
  },
  created(){
      this.checkPath();
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
    justify-content: center;
    height: 100vh;
    box-sizing: border-box;
    align-items: center;
    @include pc768{
      padding: 6vh 2.5vw;
      flex-direction: column-reverse;
    }
  }
  .center{
    justify-content: center;
  }

  .hide{
    animation-name: hideMemo;
    animation-duration: 1s;
    position: absolute;
    animation-fill-mode:forwards;
  }
  @keyframes hideMemo{
    from{
        left:0;
    }
    to{
      left: -25vw;
    }
  }
</style>