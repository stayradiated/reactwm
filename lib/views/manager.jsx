var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var CSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup;

var Window = require('./window');

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

  handleStartMove: function (window) {
    this.props.manager.bringToFront(window);
  },

  render: function () {

    var windows = this.props.manager.getOpenWindows().map(function (window) {
      return <Window key={window.id} offset={this.state.offset} window={window} />;
    }, this);

    return (
      <div className='window-manager'>
        <div className='windows'>
          {windows}
        </div>
      </div>
    );
  }

});

module.exports = Manager;
