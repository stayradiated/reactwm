var WindowManager = require('./window_manager');

var ReactWM = function (el) {
  this._index= 0;
  this.windows = [];
  this.el = el;
};

_.extend(ReactWM.prototype, {

  add: function (window) {
    window.id = ++this._index;
    this.windows.push(window);
    this.render();
  },

  render: function () {
    React.renderComponent(<WindowManager windows={this.windows} />, this.el);
  }

});

module.exports = function () {
  window.wm = new ReactWM(document.body);
  wm.add({x: 260, y: 20, width: 200, height: 200, title: 'Vim'});
  wm.add({x: 20, y: 20, width: 220, height: 420, title: 'Settings'});
  wm.add({x: 260, y: 240, width: 400, height: 200, title: 'Editor'});
};

