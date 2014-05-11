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
    console.log('saving');
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

  manager.open(<Settings />, {
    id: 'settings',
    width: 200,
    height: 200,
    x: 200,
    y: 200
  });

});
