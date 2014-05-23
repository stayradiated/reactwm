var $ = require('jquery');
var _ = require('lodash');
var React = require('react');
var ReactWM = require('../lib/');


var Settings = React.createClass({
  getInitialState: function () {
    return {
      name: 'Sam'
    };
  },
  save: function () {
    this.setState({
      name: this.refs.name.getDOMNode().value
    });
  },
  render: function () {
    return (
      <div className='settings'>
        <label>Name:</label>
        <input ref='name' type='text' defaultValue={this.state.name} />
        <button onClick={this.save}>Save</button>
        <br />
        <p>My name is: {this.state.name}</p>
      </div>
    );
  }
});



$(function () {

  var data = localStorage.windows ? JSON.parse(localStorage.windows) : [];

  var manager = window.m = new ReactWM.Manager(data);

  manager.forEach(function (window) {
    window.content = <Settings />;
  });

  var save = _.debounce(function () {
    localStorage.windows = manager.toString();
  }, 1000);

  manager.on('change', save);
  manager.on('change:windows', save);

  React.renderComponent((
    <ReactWM manager={manager} />
  ), $('.content')[0]);

  $('.add-window').on('click', function () {
    manager.open(<Settings />, { 
      id: 'settings-' + Date.now(),
      title: 'Settings ' + Date.now(),
      width: 300,
      height: 300,
      x: 20,
      y: 20
    });
  });

  var openWin1 = function () {
    manager.open(<Settings />, { 
      id: 'settings-1',
      title: 'Settings 1',
      width: 300,
      height: 300,
      x: 20,
      y: 20
    });
  };

  var openWin2 = function () {
    manager.open(<Settings />, { 
      id: 'settings-2',
      title: 'Settings 2',
      width: 300,
      height: 300,
      x: 20,
      y: 20
    });
  };

  $('.open-win-1').on('click', openWin1);
  $('.open-win-2').on('click', openWin2);

});

