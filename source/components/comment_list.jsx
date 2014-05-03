var Comment = require('./comment');

var CommentList = React.createClass({

  render: function () {
    return (
      <div className="commentList">
        { this.props.data.map(function (comment) {
          return <Comment author={ comment.author }>
            { comment.text }
          </Comment>;
        }) }
      </div>
    );
  }

});

module.exports = CommentList;
