import scrollTo from 'scroll-to';

import md from './md';
import updateDom from './updateDom';

const ext = new Set([
  'md', 'markdown',
]);

/* global MathJax */

MathJax.Hub.Config({
  TeX: {
    equationNumbers: {
      autoNumber: 'all',
    },
  },
});

let lastUpdatedDom = null;

const timestamp = [];

let targetDom = null;
let newDom = null;

let nextToRender = '';
let rendering = false;
let needRerender = true;

const scrollToElement = (element) => {
  let currentTop = 0;
  let currentLeft = 0;
  if (element.offsetParent) {
    while (element.offsetParent) {
      currentTop += element.offsetTop;
      currentLeft += element.offsetLeft;
      element = element.offsetParent;
    }
  }
  scrollTo(currentLeft, currentTop - 106.6, {
    duration: 500,
  });
};

updateDom.setUpdateFn((changedNode) => {
  lastUpdatedDom = changedNode;
});

const trueRender = (source) => {
  [...document.getElementsByClassName('update-mark')].forEach((node) => {
    node.classList.remove('update-mark');
  });
  lastUpdatedDom = null;
  timestamp.push(performance.now());
  const result = md.render(source);
  timestamp.push(performance.now());
  newDom = document.createElement('div');
  newDom.id = 'main';
  newDom.className = 'markdown';
  newDom.innerHTML = result;
  timestamp.push(performance.now());
  targetDom = updateDom.update(targetDom, newDom);
  timestamp.push(performance.now());
  if (lastUpdatedDom !== null) {
    while (lastUpdatedDom.nodeType !== 1) {
      if (lastUpdatedDom.parentNode) {
        lastUpdatedDom = lastUpdatedDom.parentNode;
      } else {
        console.log('???');
        return;
      }
    }
    void lastUpdatedDom.offsetWidth; // eslint-disable-line
    lastUpdatedDom.classList.add('update-mark');
    scrollToElement(lastUpdatedDom);
  }
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, targetDom]);
  MathJax.Hub.Queue(() => {
    timestamp.push(performance.now());
    console.log('parse -> new dom -> patch -> mathjax');
    console.log(timestamp.map((item, key, arr) => arr[key] - arr[key - 1])
                         .filter(i => i));
    timestamp.length = 0;
    rendering = false;
    if (needRerender) {
      rendering = true;
      needRerender = false;
      trueRender(nextToRender);
    }
  });
};

const render = (source) => {
  nextToRender = source;
  needRerender = true;
  if (rendering === false) {
    rendering = true;
    needRerender = false;
    trueRender(nextToRender);
  }
};

export default {
  ext,
  bind(target) {
    targetDom = target;
    targetDom.className = 'markdown';
  },
  render,
};
