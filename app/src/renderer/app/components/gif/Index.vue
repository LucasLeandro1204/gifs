<template>
  <article>
    <input type="text" placeholder="Search for gifs..." @keyup.enter="search" v-model="input">
    <section>
      <div :class="{ 'active': gifs[i].active }" @click="toggle(i)" v-for="(gif, i) in gifs">
        <img :src="gif.downsized.url" height="auto" width="100%">
        <a href="#" class="share" @click.prevent="copy(gif.downsized_medium.url)" v-if="gif.active">
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        input: '',
        pagination: {},
        gifs: []
      }
    },

    methods: {
      search (page = 0, reset = true) {
        this.reset(reset);

        Giphy.search(this.input, page).then(({data}) => {
          this.gifs = data.data.map((item) => {
            item.images.active = false;

            return item.images;
          });

          this.pagination = data.pagination;
        });
      },

      load () {

      },

      toggle (i, flag = true) {
        this.gifs.forEach((gif, index) => {
          this.gifs[index].active = (i == index) ? flag : false;
        });
      },

      copy (text) {
        this.$electron.clipboard.writeText(text);
      },

      reset (flag) {
        if (flag) {
          this.gifs = [];
          this.pagination = [];
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  input[type="text"] {
    width: calc(100% - 6.8rem);
    margin-right: 1rem;
    float: right;
    border: 0;
    background-color: #171717;
    height: 1.8rem;
    color: #d8d8d8;
    padding: 0 1rem;
  }

  section {
    width: 100%;
    padding-top: 1rem;
    column-count: 3;
    column-gap: 0;
  }

  img {
    float: left;
    cursor: pointer;
  }

  .active {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    left: 0;
  }

  .share {
    position: fixed;
    z-index: 3;
    right: 1rem;
    top: 2rem;
    text-decoration: none;
    padding: .3rem .4rem;
    font-size: 1rem;    
    color: #ffffff;
    border: .1rem solid rgba(#ffffff, .5);
    background: rgba(#000, .5);
    border-radius: .2rem;
  }
</style>