var $ = require('jquery');
var React = require('react');

// TODO: Figure out a sensible way to combine these into one class
var ManagerView = require('./views/manager');
var ManagerModel = require('./models/manager');


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

  var manager = new ManagerModel();

  React.renderComponent((
    <ManagerView manager={manager} />
  ), $('.content')[0]);

  var settings1 = manager.open(<Settings />, {
    id: 'settings-1',
    width: 300,
    height: 300,
    x: 200,
    y: 200
  });

  var settings2 = manager.open(<Settings />, {
    id: 'settings-2',
    width: 300,
    height: 300,
    x: 600,
    y: 200
  });

  window.settings = [settings1, settings2];

  $('.add-window').on('click', function () {
    manager.open(<Settings />, { 
      id: 'settings-' + Date.now(),
      width: 300,
      height: 300,
      x: 20,
      y: 20
    });
  });

});
