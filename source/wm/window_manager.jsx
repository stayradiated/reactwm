var Window = require('./window');

var WindowManager = React.createClass({

  componentDidMount: function () {
    $(this.getDOMNode()).on('contextmenu', this.handleContextMenu);
  },

  getInitialProps: function () {
    return {
      windows: []
    };
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  handleStartMove: function (window) {
    // Move selected window to front of screen
    var index = this.props.windows.indexOf(window);
    this.props.windows.splice(index, 1);
    this.props.windows.push(window);
    this.setState({ active: window });
  },

  handleEndMove: function (window) {
    this.setState({ active: false });
  },

  handleContextMenu: function (e) {
    e.preventDefault();
  },

  render: function () {
    return (
      <div className="window-manager"
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        { this.props.windows.map(function (window) {
          return <Window key={window.id}
            window={window}
            active={this.state.active === window}
            onStartMove={this.handleStartMove}
            onEndMove={this.handleEndMove} />;
        }, this)}
      </div>
    );
  }

});

module.exports = WindowManager;
