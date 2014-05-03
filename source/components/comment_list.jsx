var Comment = require('./comment');

var CommentList = React.createClass({

  render: function () {
    return (
      <div className="commentList">
        { this.props.data.map(function (comment, i) {
          return <Comment key={ i } author={ comment.author }>
            { comment.text }
          </Comment>;
        }) }
      </div>
    );
  }

});

module.exports = CommentList;
