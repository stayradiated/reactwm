var _ = require('lodash');
var $ = require('jquery');
var React = require('react');

var Window = require('./window');
var Guides = require('./guides');

var PADDING = 20;

var Manager = React.createClass({

  componentWillMount: function () {
    this.manager = this.props.manager;
    this.manager.on('change', this.forceUpdate, this);
  },

  componentWillUnmount: function () {
    this.manager.off('change', this.forceUpdate);
  },

  componentDidMount: function () {
    var el = $(this.getDOMNode());
    el.on('contextmenu', this.ignore);
    this.setState({ offset: el.offset() });
  },

  getInitialState: function () {
    return {
      offset: {
        top: 0,
        left: 0
      }
    };
  },

  ignore: function (e) {
    e.preventDefault();
    return false;
  },

  handleStartMove: function (window) {
    this.props.manager.bringToFront(window);
  },

  handleEndMove: function (window) {
  },

  convertPoints: function (e) {
    return {
      x: e.clientX - this.state.offset.left,
      y: e.clientY - this.state.offset.top
    };
  },

  render: function () {

    var windows = this.props.manager.filter(function (window) {
      return window.isOpen;
    }).map(function (window) {
      return <Window key={window.id} parent={this} window={window} />;
    }, this);

    return (
      <div className="window-manager">
        <Guides guides={this.state.guides} />
        <div className="windows">{windows}</div>
      </div>
    );
  }

});

module.exports = Manager;
