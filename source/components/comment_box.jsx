var CommentList = require('./comment_list');
var CommentForm = require('./comment_form');

var CommentBox = React.createClass({

  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function (comment) {
    var comments = this.state.data.concat([ comment ]);
    this.setState({ data: comments });

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'post',
      data: comment,
      success: function (data) {
        this.setState({
          data: data
        });
      }.bind(this)
    });
  },

  getInitialState: function () {
    return {
      data: []
    };
  },

  componentWillMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.state.data } />
        <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
      </div>
    );
  }

});

module.exports = CommentBox;
