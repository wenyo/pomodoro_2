<template>
    <div class="todoBlock">
        <TextInput></TextInput>
    </div>
</template>

<script>
import TextInput from './TextInput';
export default {
  components: { TextInput },
}
</script>

<style lang="scss">
    .todoBlock{
        display: inline-block;
        width: 30vw;
        margin: 4vh 2vw;
    }
</style>