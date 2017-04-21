<template>
  <article>
    <input type="text" placeholder="Search for gifs..." @keyup.enter="search" v-model="input">
    <section>
      <div :class="{ 'active': gifs[i].active }" v-for="(gif, i) in gifs" @click="toggle(i)">
        <img :src="gif.downsized.url" height="auto" width="100%">
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

      toggle (i) {
        this.gifs.map((gif, index) => {
          if (index == i) {
            this.gifs[i].active = ! gif.active;
            return;
          }

          this.gifs[index].active = false;
        });
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
  }

  div {
    width: 100%;
  }

  .active {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>