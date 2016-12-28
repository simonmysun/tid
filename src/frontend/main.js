import io from 'socket.io-client';

import renderer from './renderers';
import notify from './notify';
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }] */
import styles from './main.css';

const $main = document.getElementById('main');
const path = decodeURI(location.hash.slice(1));
const $base = document.createElement('base');
if (location.hash.length < 2) {
  location.href = '/';
} else {
  renderer.bind(path, $main);
  document.title = path;
  $base.setAttribute('href', path);
  document.getElementsByTagName('head')[0].appendChild($base);
}

window.addEventListener('hashchange', () => {
  location.hash = path;
}, false);

const socket = io(location.origin);
socket.on('connect', () => {
  socket.emit('subscribe file change', {
    path,
  });
});

socket.on('update', (data) => {
  switch (data.status) {
    case '200':
      renderer.render(data.content, data.path);
      break;
    case '400':
      renderer.render('400 Bad request. ', data.path);
      notify('400 Bad request. ');
      break;
    case '404':
      renderer.render('404 File not found. ', data.path);
      notify('404 File not found. ');
      break;
    default:
      break;
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === '__broadcast') {
    if (event.newValue !== null) {
      const data = JSON.parse(event.newValue);
      if (data.path === decodeURI(location.hash.slice(1))) {
        renderer.render(data.content, data.path);
        window.localStorage.removeItem('__broadcast');
      }
    }
  }
});
