var _ = require('lodash');

var GAP = 20;
var SNAP = 5;

var Guides = function (manager) {
  this.manager = manager;
  this.vertical = [];
  this.horizontal = [];

  this.manager.on('change', this.generate, this); 
};

_.extend(Guides.prototype, {

  snap: function (orientation, value) {
    var guides = this[orientation];
    for (var i = 0, len = guides.length; i < len; i++) {
      var guide = guides[i];
      if (value >= guide - SNAP && value <= guide + SNAP) {
        return guide;
      }
    }
    return value;
  },

  generate: function () {
    this.manager.forEach(function (window) {
      if (this.manager.active === window) return;

      this.vertical.push(
        window.x,
        window.x + window.width,
        window.x - GAP,
        window.x + window.width + GAP
      );

      this.horizontal.push(
        window.y,
        window.y + window.height,
        window.y - GAP,
        window.y + window.height + GAP
      );
    }, this);

    this.vertical = _(this.vertical).sortBy().uniq(true).value();
    this.horizontal = _(this.horizontal).sortBy().uniq(true).value();
  }

});

module.exports = Guides;
