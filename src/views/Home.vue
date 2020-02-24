<template>
  <div class="home">
    <Memo></Memo>
  </div>
</template>

<script>
import Memo from "../components/Memo";

export default {
  components: { Memo },
  data(){
    return{
      type: 0
    };
  },
  computed: {
    path(){
      return this.$route.path
    },
  },
  watch: {
    path(){
      if(this.path == '/bomb'){
        this.type = 1;
      }else{
        this.type = 0;
      }
    },
  },
};

</script>
