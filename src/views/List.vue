<template>
  <div class="list">

    <div class="memoDetail">
      <TextInput class='margin_bottom'></TextInput>
      <ToDoList></ToDoList>
    </div>

    <div class="memoDetail">
      <ToDoneList class='margin_bottom'>></ToDoneList>
      <ClearData></ClearData>
    </div>

  </div>
</template>

<script>
import TextInput from '../components/memoBlock/TextInput';
import ToDoList from '../components/memoBlock/ToDoList';
import ToDoneList from '../components/memoBlock/ToDoneList';
import ClearData from '../components/memoBlock/ClearData';

export default {
  components: { ToDoList, ToDoneList, TextInput, ClearData },
}
</script>

<style lang="scss">
  .list{
    width: 100vw;
    height: 100vh;
    padding: 0 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .memoDetail{
    width: 40%;
    min-width: 400px;
    margin: 3% 2%;
    &>.memoBlock{
      min-height: 65vh;
      margin-top: 0;     
    }
    .margin_bottom{
      margin-bottom: 30px;
    }
  }

</style>