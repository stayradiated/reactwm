var _ = require('lodash');
var React = require('react');
var ManagerModel = require('../models/manager');
var Manager = require('./manager');

var ReactWM = React.createClass({

  componentWillMount: function () {
    this.manager = new ManagerModel();
  },

  render: function () {
    React.Children.forEach(this.props.children, function (child) {
      this.manager.add({
        id: child.props.key,
        x: child.props.x,
        y: child.props.y,
        width: child.props.width,
        height: child.props.height,
        title: child.props.title,
        content: child
      });
    }, this);

    return <Manager manager={this.manager}/>;
  }

});

module.exports = ReactWM;
