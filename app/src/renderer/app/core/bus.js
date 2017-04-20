export default class Bus {
  constructor (vue) {
    this.vue = new vue();
  }

  listen (event, cb) {
    this.vue.$on(event, cb);
  }

  emit (event, data = {}) {
    this.vue.$emit(event, data);
  }
}