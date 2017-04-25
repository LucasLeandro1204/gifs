<template>
  <body>
    <header></header>
    <navigation></navigation>
    <router-view></router-view>
  </body>
</template>

<script>
  export default {
    mounted () {
      Bus.emit('ready');
    }
  }
</script>

<style lang="scss">
  body {
    background-color: #1f1f1f;
  }

  header {
    width: 100vw;
    position: fixed;
    height: 1rem;
    background-color: #1f1f1f +- 5%;
    -webkit-app-region: drag;
  }
</style>
