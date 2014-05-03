var markdown = require('markdown').markdown;

console.log(markdown);

var Comment = React.createClass({
  render: function () {
    var markup = markdown.toHTML(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          { this.props.author }
        </h2>
        <span dangerouslySetInnerHTML={{__html: markup}} />
      </div>
    );
  }
});

module.exports = Comment;
