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
    }
</style>