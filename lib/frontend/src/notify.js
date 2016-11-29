$noti = document.getElementById('noti');

module.exports = function(content, type, delay) {
  var $n = document.createElement('div');
  $n.className = 'noti noti-' + type;
  $n.innerHTML = '<span class="timestamp">' + new Date().toString() + '</span><p>' + content + '</p>';
  var destroy = function() {
    setTimeout((function($n) {
      $n.className += ' noti-hide';
      return function() {
        $noti.removeChild($n);
      };
    })($n), 400);
  }
  timeout = setTimeout(destroy, delay);
  $n.addEventListener('touchstart', destroy);
  $n.addEventListener('mousedown', destroy);
  $noti.appendChild($n);
};
