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
  }

});

module.exports = Guides;
