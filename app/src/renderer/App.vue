<template>
  <body>
    <navigation></navigation>
    <router-view></router-view>
  </body>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },

    mounted () {
      Bus.emit('ready');
    }
  }
</script>

<style lang="scss" scoped>
  body {
    background-color: #1f1f1f;
  }
</style>
