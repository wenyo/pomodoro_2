<template>
    <div class="todoBlock">
        <TextInput></TextInput>
        <ToDoList></ToDoList>
        <ToDoneList></ToDoneList>
    </div>
</template>

<script>
import TextInput from './memoBlock/TextInput';
import ToDoList from './memoBlock/ToDoList';
import ToDoneList from './memoBlock/ToDoneList';

export default {
  components: { TextInput , ToDoList, ToDoneList},
}
</script>

<style lang="scss">
    .todoBlock{
        display: inline-block;
        width: 25vw;
        margin: 2.5vh 2vw;
    }

    //TO DO or TO DONE
    .listTitle{
        color: $color-master;
        background-color: $color-sev;
        padding: 15px 10px;
        border-radius: 10px;
    }
</style>