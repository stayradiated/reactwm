var Window = require('./window');

var WindowManager = React.createClass({

  componentDidMount: function () {
    $(this.getDOMNode()).on('contextmenu', this.handleContextMenu);
  },

  getInitialProps: function () {
    return {
      windows: [],
    };
  },

  getInitialState: function () {
    return {
      active: false,
      guides: this.getGuides()
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
    this.setState({
      active: false,
      guides: this.getGuides()
    });
  },

  handleContextMenu: function (e) {
    e.preventDefault();
  },

  getGuides: function () {
    var guides = { vertical: [], horizontal: [] };
    this.props.windows.forEach(function (window) {
      guides.vertical.push(window.x);
      guides.horizontal.push(window.y);
      guides.vertical.push(window.x + window.width);
      guides.horizontal.push(window.y + window.height);
    });
    return guides;
  },

  render: function () {
    return (
      <div className="window-manager"
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        { this.props.windows.map(function (window) {
          return <Window key={window.id}
            window={window}
            guides={this.state.guides}
            active={this.state.active === window}
            onStartMove={this.handleStartMove}
            onEndMove={this.handleEndMove} />;
        }, this)}
      </div>
    );
  }

});

module.exports = WindowManager;
