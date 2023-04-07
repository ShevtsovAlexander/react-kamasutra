import React from 'react';
import mypost from './MyPosts.module.css';
import Post from './Post/Post';
import NewPost from './MyPostForm';

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} />);

  const ref = React.createRef();
  const addEvent = (values) => {
    props.addEvent(values.newPostText);
  };

  return (
    <div className={mypost.myPost}>
      <h3>My Post</h3>
      <div>
        <NewPost onSubmit={addEvent} />
      </div>
      <div className={mypost.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
