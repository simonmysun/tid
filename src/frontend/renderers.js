import markdownRenderer from './renderers/markdown/renderer';
import markdownSlidesRenderer from './renderers/markdown-slides/renderer';
import codeRenderer from './renderers/code/renderer';
import mediaRenderer from './renderers/media/renderer';

let renderer = null;
export default {
  bind(path, target) {
    const extension = path.split('.').pop().toLowerCase();
    if (markdownRenderer.ext.has(extension)) {
      renderer = markdownRenderer;
      renderer.bind(target);
    } else if (markdownSlidesRenderer.ext.has(extension)) {
      renderer = markdownSlidesRenderer;
      renderer.bind(target);
    } else if (codeRenderer.ext.has(extension)) {
      renderer = codeRenderer;
      renderer.bind(target);
    } else if (mediaRenderer.ext.has(extension)) {
      renderer = mediaRenderer;
      renderer.bind(target);
    } else {
      location.href = `${path}?raw=true`;
    }
  },
  render(content, path) {
    renderer.render(content, path);
  },
};
