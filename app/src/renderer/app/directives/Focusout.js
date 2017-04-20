export default {
  twoWay: true,
  bind(element, binding) {
    Bus.listen('ready', () => {
      document.body.addEventListener('click', (event) => {
        Bus.emit(binding.value, {
          el: element,
          target: event.target
        });
      });
    });
  },
  unbind(el) {
    document.body.removeEventListener('click', (event) => {
      Bus.emit(binding.value, {
        el: element
      });
    });
  }
}