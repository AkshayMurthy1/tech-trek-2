function Post({ author, content, timestamp }){
    return (
      <div className="post">
        <div className="post-header">
          <span className="post-author">{author}</span>
          <span className="post-timestamp">{timestamp}</span>
        </div>
        <div className="post-content">
          {content}
        </div>
      </div>
    );
  };
  export default Post