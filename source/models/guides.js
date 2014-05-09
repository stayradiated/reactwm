var _ = require('lodash');

var Guides = function () {
  this.guides = [];
};

_.extend(Guides.prototype, {

  margin: 5,

  add: function () {
    this.guides.push.apply(this.guides, arguments);
  },

  snap: function (value) {
    for (var i = 0, len = guides.length; i < len; i++) {
      var guide = guides[i];

      if (value >= guide - this.margin && value <= guide + this.margin) {
        return guide;
      }
    }

    return value;
  },

  clean: function () {
    this.guides = _.chain(this.guides).sort().uniq(true).value();
  },

  forEach: function (iterator, context) {
    return this.guides.forEach(iterator, context);
  },

  map: function (iterator, context) {
    return this.guides.map(iterator, context);
  },

  generate: function (manager, ignore) {
    var guides = {
      vertical: new Guides(),
      horizontal: new Guides()
    };

    manager.forEach(function (window) {
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


});

module.exports = Guides;
