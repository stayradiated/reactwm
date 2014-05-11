var $ = require('jquery');
var React = require('react');

var ReactWM = require('./views');

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

  React.renderComponent((
    <ReactWM>
      <div key='editor' title='Editor' x={20} y={290} width={300} height={200}>
        <div>This is the editor</div>
      </div>
      <div key='vim' title='Vim' x={20} y={20} width={300} height={250}>
        <div>This is vim</div>
      </div>
      <div key='settings' title='Settings' x={340} y={20} width={300} height={250}>
        <Settings />
      </div>
    </ReactWM>
  ), $('.content')[0]);
});
