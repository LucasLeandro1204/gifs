<template>
  <body>
    <div class="toolbar">
    </div>
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

  .toolbar {
    width: 100vw;
    height: 1rem;
    background-color: #1f1f1f +- 5%;
    -webkit-app-region: drag;
  }
</style>
