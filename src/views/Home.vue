<template>
  <div class="home">
    home
    {{path}}
    {{type}}
  </div>
</template>

<script>
  export default({
    data(){
      return{
        type: 0
      }
    },
    computed: {
      path(){
        return this.$route.path
      }
    },
    watch: {
      path(){
        if(this.path == '/bomb'){
          this.type = 1;
        }else{
          this.type = 0;
        }
      }
    },
  })

</script>
