var CommentList = require('./comment_list');
var CommentForm = require('./comment_form');

var CommentBox = React.createClass({

  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.props.data } />
        <CommentForm />
      </div>
    );
  }

});

module.exports = CommentBox;
