<template>
  <nav>
    <a href="#" class="btn-icon open" @click.prevent="active = true"></a>
    <div :class="{ active: active }" v-focusout="'nav-active'">
      <a href="#" class="btn-icon close" @click.prevent="active = false"></a>
      <h3>Gif search</h3>
      <ul>
        <router-link :to="{ name: 'index' }" tag="li" exact>
          <a><i class="fa fa-list-ul" aria-hidden="true"></i>Gifs</a>
        </router-link>
        <router-link to="/favorites" tag="li">
          <a><i class="fa fa-star" aria-hidden="true"></i>Favorites</a>
        </router-link>
        <router-link to="/settings" tag="li">
          <a><i class="fa fa-cog" aria-hidden="true"></i>Settings</a>
        </router-link>
      </ul>
      <ul class="bottom">
        <router-link to="/git" tag="li">
          <a><i class="fa fa-github" aria-hidden="true"></i>Github</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        active: false
      };
    },

    mounted () {
      Bus.listen('nav-active', ({el = '', target = '', force = false}) => {
        if (force || this.active == true && el != target && !target.className.match(/(open)/g) && !el.contains(target)) {
          this.active = false;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    z-index: 99;
    width: 280px;
    height: 100%;
    left: -280px;
    transition: .8s;
    background: rgba(50, 50, 50, .7);

    &.active {
      left: 0;
    }
  }

  ul {
    display: flex;
    flex-direction: column;

    li {

      a {
        color: #ffffff;
        display: block;
        transition: .2s;
        padding: .6rem;
        font-size: .9rem;

        &:active,
        &:hover,
        &:focus {
          border-color: rgb(231, 76, 60) !important;
          background: rgb(231, 76, 60);
        }

        i {
          font-size: 1.2rem;
          margin-right: 1rem;
        }
      }

      &.link-active {
        a {
          border-color: rgb(231, 76, 60) !important;
          background: rgb(231, 76, 60);
        }
      }
    }

    &:not(.bottom) {
      li {
        a { 
          border-bottom: 1px solid rgba(#ffffff, .2);
        }
      }
    }

    &.bottom {
      margin-top: auto;

      li {
        a {
          border-top: 1px solid rgba(#ffffff, .2);
        }
      }
    }
  }

  h3 {
    text-align: center;
    border-bottom: 1px solid rgba(#ffffff, .2);
    margin: 2rem 0 2.45rem;
  }

  .btn-icon {
    position: absolute;
    z-index: 2;
    transition: .2s;
    font-size: 1.2rem;    
    border: .1rem solid rgba(#ffffff, .5);
    background-color: rgba(#000, .5);
    border-radius: .2rem;
    color: #ffffff;

    &:hover,
    &:focus {
      background-color: rgba(#000, .3);
    }
  }

  .open {
    position: fixed;
    z-index: 30;
    padding: .2rem .3rem;
    left: 1rem;
    top: 2rem;
  }

  .close {
    padding: .1rem .3rem;
    right: 1rem;
    top: 1rem;
  }
</style>