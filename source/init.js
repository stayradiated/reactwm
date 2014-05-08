var ReactWM = require('./views');
var Manager = require('./models/manager');

$(function () {
  var manager = new Manager();
  var el = $('.content')[0];

  var wm = new ReactWM(manager, el);

  manager.add({id: 'settings', x: 20, y: 20, width: 200, height: 420, title: 'Settings'});
  manager.add({id: 'vim', x: 240, y: 20, width: 400, height: 200, title: 'Vim'});
  manager.add({id: 'editor', x: 240, y: 240, width: 400, height: 200, title: 'Editor'});

  $('.add-window').on('click', function () {
    manager.add({ id: 'test-' + Date.now(), x: 300, y: 300, width: 300, height: 300, title: 'Test' });
  });
});
