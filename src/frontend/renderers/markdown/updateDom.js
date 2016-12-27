let cb;

const hash = (str) => {
  let result = 0;
  if (str.length === 0) return result;
  for (let i = str.length; i >= 0; i -= 1) {
    result = ((result << 5) - result) + str.charCodeAt(i);
    result |= 0;
  }
  return result;
};

const hashDom = (dom) => {
  if (dom.hash) {
    return dom.hash;
  }
  if (dom.nodeType !== dom.ELEMENT_NODE) {
    dom.hash = hash(dom.data || Math.random().toString());
    return dom.hash;
  }
  let result = dom.nodeName + [...dom.attributes].map(x => `${x.nodeName}="${x.nodeValue}"`).join(' ');
  let len = dom.childNodes.length;
  while (len > 0) {
    len -= 1;
    result += hashDom(dom.childNodes[len]);
  }
  dom.hash = hash(result);
  return dom.hash;
};

const update = (oDom, nDom) => {
  oDom.hash = undefined;
  if (hashDom(oDom) === hashDom(nDom)) {
    return oDom;
  }
  if (oDom.nodeName !== nDom.nodeName) {
    oDom.parentNode.replaceChild(nDom, oDom);
  }
  if (oDom.nodeType === 1) {
    [...oDom.attributes].forEach((item) => {
      oDom.removeAttribute(item.nodeName);
    });
    [...nDom.attributes].forEach((item) => {
      oDom.setAttribute(item.nodeName, item.nodeValue);
    });
    let oStart = 0;
    let oEnd = oDom.childNodes.length - 1;
    let nStart = 0;
    let nEnd = nDom.childNodes.length - 1;
    while (
      oStart <= oEnd &&
      nStart <= nEnd &&
      hashDom(oDom.childNodes[oStart]) === hashDom(nDom.childNodes[nStart])
    ) {
      oStart += 1;
      nStart += 1;
    }
    while (
      oStart <= oEnd &&
      nStart <= nEnd &&
      hashDom(oDom.childNodes[oEnd]) === hashDom(nDom.childNodes[nEnd])
    ) {
      oEnd -= 1;
      nEnd -= 1;
    }
    if (oStart > oEnd && nStart > nEnd) {
      cb(oDom);
      return oDom;
    }
    // To make it fast easy, here we don't use Hirschberg's algorithm
    if (oStart === oEnd && nStart === nEnd) {
      update(oDom.childNodes[oStart], nDom.childNodes[nStart]);
      oDom.childNodes[oStart].hash = undefined;
      cb(oDom.childNodes[oStart]);
      return oDom;
    }
    while (oStart <= oEnd) {
      oDom.removeChild(oDom.childNodes[oEnd]);
      oEnd -= 1;
    }
    while (nStart <= nEnd) {
      oDom.insertBefore(nDom.childNodes[nEnd], oDom.childNodes[oStart]);
      nEnd -= 1;
      cb(oDom.childNodes[oStart]);
    }
  } else {
    oDom.data = nDom.data;
    cb(oDom);
  }
  return oDom;
};

export default {
  setUpdateFn(fn) {
    cb = fn;
  },
  update,
};
