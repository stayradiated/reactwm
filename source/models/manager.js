var _ = require('underscore');
var Window = require('./window');

var Manager = function () {
  this.windows = [];
};

_.extend(Manager.prototype, {

  at: function (i) {
    return this.windows[i];
  },

  get: function (id) {
    for (var i = 0, len = this.windows.length; i < len; i++) {
      if (this.windows[i].id === id) {
        return this.windows[i];
      }
    }
    return undefined;
  },

  add: function (window) {
    if (!(window instanceof Window)) window = new Window(window);
    this.windows.push(window);
    this.onChange();
  },

  remove: function (window) {
    if (!(window instanceof Window)) window = this.get(window);
    var index = this.windows.indexOf(window);
    if (index > -1) {
      this.windows.splice(index, 1);
      this.onChange();
    }
  },

  length: function () {
    return this.windows.length;
  },

  bringToFront: function (window) {
    if (!(window instanceof Window)) window = this.get(window);
    var index = this.windows.indexOf(window);
    if (index > -1) {
      this.windows.splice(index, 1);
      this.windows.push(window);
      this.onChange();
    }
  },

  forEach: function (iterator, context) {
    return this.windows.forEach(iterator, context);
  },

  map: function (iterator, context) {
    return this.windows.map(iterator, context);
  },

  toJSON: function () {
    return _.map(this.windows, function (window) {
      return window.toJSON();
    });
  },

  onChange: function () {}

});

module.exports = Manager;
