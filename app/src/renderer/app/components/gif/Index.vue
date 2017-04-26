<template>
  <article>
    <input type="text" placeholder="Search for gifs..." @keyup.enter="search" v-model="input">
    <section>
      <img :src="gif.downsized.url" style="width: 33.33%" @click="toggle({index: i})" v-for="(gif, i) in gifs">
    </section>
    <div class="display" v-if="active.flag">
      <img :src="active.gif.downsized.url" style="width: 100%">
      <div class="btn-group">
        <a href="#" class="btn-icon close" @click.prevent="toggle({flag: false})"></a>
        <a href="#" class="btn-icon share" @click.prevent="copy(active.gif.downsized_medium.url)"></a>
      </div>
    </div>
    <a href="#" class="load" @click.prevent="load()" v-if="gifs.length && remaining">Load more</a>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        input: 'car',
        pagination: {},
        gifs: [],
        active: {
          flag: false,
          gif: {}
        }
      }
    },

    mounted () {
      this.search();
    },

    computed: {
      remaining () {
        return this.pagination.total_count > this.gifs.length;
      }
    },

    methods: {
      search (offset = 0, reset = true) {
        this.reset(reset);

        Giphy.search(this.input, offset).then(({data}) => {
          data.data.forEach((item) => {
            this.gifs.push(item.images);
          });

          this.pagination = data.pagination;
        });
      },

      load () {
        let mag = this.gifs.length / 25;
        let offset = 25 * mag; // will be changeable (maybe not)
        this.search(offset, false);
      },

      toggle ({index, flag = true}) {
        this.active.flag = flag;
        this.active.gif = this.gifs[index];
      },

      copy (text) {
        this.$electron.clipboard.writeText(text);
      },

      reset (flag = true) {
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

  article {
    padding-bottom: 1rem;
  }

  section {
    width: 100vw;
    display: inline-block;
    padding-top: 2.8rem;
  }

  .item {
    float: left;
    width: 33.33%;
  }

  img {
    width: 100%;
    cursor: pointer;
  }

  .display {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    left: 0;

    img {
      cursor: inherit;
    }
  }

  .btn-group {
    position: fixed;
    top: 2.25rem;
    right: 1rem;
  }

  .close,
  .share {
    display: block;
    float: right;
    z-index: 3;
    text-decoration: none;
    padding: .3rem .4rem;
    margin-left: .3rem;
    font-size: .97rem;    
    color: #ffffff;
    border: .1rem solid rgba(#ffffff, .5);
    background: rgba(#000, .5);
    border-radius: .2rem;
  }

  .load {
    color: #fff;
    padding: .5rem 1rem;
    margin: 1rem 0;
    display: inline-block;
    border: 1px solid #fff;
    border-radius: 0.3rem;
    text-decoration: none;
  }
</style>