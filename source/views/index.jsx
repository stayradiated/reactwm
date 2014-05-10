var _ = require('lodash');
var React = require('react');
var Manager = require('./manager');

var ReactWM = function (manager, el) {
  this.el = el;
  this.manager = manager;
  this.manager.on('change', this.render, this);
};

_.extend(ReactWM.prototype, {

  render: function () {
    React.renderComponent(<Manager manager={this.manager} />, this.el);
  }

});

module.exports = ReactWM;
