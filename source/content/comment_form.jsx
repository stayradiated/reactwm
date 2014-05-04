var CommentForm = React.createClass({

  handleSubmit: function () {
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (! text || ! author) return false;
    this.props.onCommentSubmit({ author: author, text: text });
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },

  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say Something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }

});

module.exports = CommentForm;
