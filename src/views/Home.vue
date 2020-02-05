<template>
  <div class="home">
    <ToDo></ToDo>
  </div>
</template>

<script>
import ToDo from "../components/ToDo";

export default {
  components: { ToDo },
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
