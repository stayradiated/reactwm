var classSet = React.addons.classSet;

var Guide = React.createClass({

  render: function () {
    var styles = {}
    var attr = this.props.orientation === 'horizontal' ? 'top' : 'left';
    styles[attr] = this.props.position;

    return (
      <div style={styles} 
        className={'guide guide-' + this.props.orientation} />
    );
  }

});

module.exports = Guide;
