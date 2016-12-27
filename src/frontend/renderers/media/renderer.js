import videojs from 'video.js';
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }] */
import styles from '../../../../node_modules/video.js/dist/video-js.css';

const image = new Set([
  'jpg', 'jpeg', 'webp', 'gif', 'png', 'tiff', 'svg', 'bmp', 'ico',
]);

const video = new Set([
  'webm', 'ogg', 'mp4', 'aac', 'mp3', 'wav',
]);

const ext = new Set([...image, ...video]);

let dom = null;

let rendered = false;

export default {
  ext,
  bind(target) {
    dom = target;
    dom.className += 'media-viewer-container';
  },
  render(content, path) {
    if (rendered) {
      window.location.reload();
    }
    rendered = true;
    if (image.has(path.split('.').pop().toLowerCase())) {
      dom.innerHTML = `<img id="el-image" src="${path}">`;
      const media = document.getElementById('el-image');
      media.classList.add('img-zoom-out');
      media.addEventListener('click', (event) => {
        if (media.classList.contains('img-zoom-in')) {
          media.classList.remove('img-zoom-in');
          media.classList.add('img-zoom-out');
        } else {
          media.classList.remove('img-zoom-out');
          media.classList.add('img-zoom-in');
        }
        event.preventDefault();
      });
      return;
    }
    if (video.has(path.split('.').pop().toLowerCase())) {
      dom.innerHTML = `<video id="el-video" class="video-js" controls preload="auto" data-setup='{"playbackRates": [0.25, 0.5, 1, 1.25, 1.5, 2, 3]}'>
    <source src="${path}">
  </video>`;
      videojs(document.getElementById('el-video'), {}, x => x);
    }
  },
};
