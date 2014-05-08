var _ = require('underscore');
var Window = require('./window');
var Guides = require('./guides');

var Manager = function () {
  this.windows = [];
};

_.extend(Manager.prototype, {

  guidePadding: 20,

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

  guides: function (ignore) {
    var guides = {
      vertical: new Guides(),
      horizontal: new Guides()
    };

    this.windows.forEach(function (window) {
      if (window === ignore) return;

      guides.vertical.add(
        window.x,
        window.x + window.width,
        window.x - this.guidePadding,
        window.x + window.width + this.guidePadding
      );
      guides.horizontal.add(
        window.y,
        window.y + window.height,
        window.y - this.guidePadding,
        window.y + window.height + this.guidePadding
      );
    }, this);

    guides.vertical.clean();
    guides.horizontal.clean();

    return guides;
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
