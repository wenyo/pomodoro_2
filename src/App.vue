<template>
  <div id="app">
    <Menu></Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu';

export default {
  components: { Menu },
}
</script>

<style lang="scss">


  body{
    background-color: #11010a;
  }
</style>
