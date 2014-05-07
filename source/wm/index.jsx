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

module.exports = ReactWM;
