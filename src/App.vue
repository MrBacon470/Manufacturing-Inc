

<script>
  export default {
    data() {
      return {
        msg: 'Counter is useless',
        count: 0
      }
    },
    methods: {
      incrementCount() {
        this.count++;
      }
    },
  }
</script>

<template>
  <button @click="incrementCount()">{{ msg }} | {{ count }}</button>
</template>

<style>

</style>