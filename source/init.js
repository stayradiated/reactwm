var ReactWM = require('./wm');

$(function () {
  var wm = new ReactWM($('.content')[0]);

  wm.add({x: 20, y: 20, width: 200, height: 420, title: 'Settings'});
  wm.add({x: 240, y: 20, width: 400, height: 200, title: 'Vim'});
  wm.add({x: 240, y: 240, width: 400, height: 200, title: 'Editor'});

  $('.add-window').on('click', function () {
    wm.add({ x: 300, y: 300, width: 300, height: 300, title: 'Test' });
  });
});
