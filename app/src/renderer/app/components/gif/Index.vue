<template>
  <article>
    <input type="text" placeholder="Search for gifs..." @keyup.enter="search" v-model="input">
    <section>
      <img :src="gif.downsized.url" :style="{ 'margin-top': gif.marginTop }" @click.stop="toggle({index: i})" v-for="(gif, i) in gifs">
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
          data.data.forEach(({images: image}) => {
            image.marginTop = '';
            this.gifs.push(image);
          });
          this.pagination = data.pagination;
          this.calcMargin(offset == 0 ? 0 : offset / 3);
        });
      },

      load () {
        let mag = this.gifs.length / 30;
        let offset = 30 * mag; // will be changeable (maybe not)
        this.search(offset, false);
      },

      toggle ({index, flag = true}) {
        this.active.flag = flag;
        this.active.gif = this.gifs[index];
      },

      calcMargin (offset = 0) {
        let lastRow = [];
        
        for (let row = offset; row <= Math.ceil(this.gifs.length / 3); row++) {
          lastRow = this.gifs.slice(((row) * 3) - 3, row * 3);

          for (let i in lastRow) {

          } 
        }
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

  .row {
    float: left;
  }

  section {
    width: 100vw;
    padding-top: 2.8rem;

    img {
      width: 150px;
      cursor: pointer;
      vertical-align: top;
    }
  }

  .display {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    left: 0;
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