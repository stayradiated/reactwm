var Window = require('./window');

var WindowManager = React.createClass({

  componentWillMount: function () {
    $(document.body).on('contextmenu', function (e) {
      e.preventDefault();
    });
  },

  getInitialProps: function () {
    return {
      windows: []
    };
  },

  getInitialState: function () {
    return {
      order: this.props.windows.map(function (window) { return window.id; }),
      mouse: null
    };
  },

  handleStartMove: function (id) {
    var index = this.state.order.indexOf(id);
    this.state.order.splice(index, 1);
    this.state.order.push(id);
    this.setState({
      active: id
    });
  },

  handleEndMove: function (window) {
  },

  getWindows: function () {
    return _.sortBy(this.props.windows, function (window) {
      return this.state.order.indexOf(window.id);
    }, this);
  },

  render: function () {
    return (
      <div className="window-manager"
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        { this.getWindows().map(function (window) {
          return <Window key={window.id} x={window.x} y={window.y}
            active={this.state.active === window.id}
            onStartMove={this.handleStartMove}
            onEndMove={this.handleEndMove} />;
        }, this)}
      </div>
    );
  }

});

module.exports = WindowManager;
