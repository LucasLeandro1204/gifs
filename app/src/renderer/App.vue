<template>
  <body>
    <header>
      <a href="#" class="btn-icon close"></a>
    </header>
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
    background-color: #1f1f1f +- 5%;
    -webkit-app-region: drag;

    .close {
      -webkit-app-region: no-drag;
      color: #fff;
      float: right;
      font-size: .8rem;
      padding: .3rem;
      cursor: pointer;

      &:hover {
        color: #fff + -15%;
      }
    }
  }
</style>
