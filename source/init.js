var ReactWM = require('./wm');

$(function () {
  var wm = new ReactWM($('#content')[0]);

  wm.add({x: 40, y: 40, width: 200, height: 440, title: 'Settings'});
  wm.add({x: 280, y: 40, width: 400, height: 200, title: 'Vim'});
  wm.add({x: 280, y: 280, width: 400, height: 200, title: 'Editor'});

  $('.add-window').on('click', function () {
    wm.add({ x: 300, y: 300, width: 300, height: 300, title: 'Test' });
  });
});
