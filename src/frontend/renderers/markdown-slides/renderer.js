const ext = new Set([
  'mdslides',
]);

let dom = null;

export default {
  ext,
  bind(target) {
    dom = target;
  },
  render(input) {
    dom.innerHTML = `To be implemented ${input.toString()}`;
  },
};

