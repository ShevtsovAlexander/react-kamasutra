import React from 'react';
import mypost from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} />);

  const ref = React.createRef();
  const addEvent = () => {
    props.addEvent();
  };

  const onPostChanges = () => {
    let value = ref.current.value;
    props.updateNewPostText(value);
  };

  return (
    <div className={mypost.myPost}>
      <h3>My Post</h3>
      <div>
        <textarea onChange={onPostChanges} ref={ref} value={props.newPostText} />
        <br />
        <button onClick={addEvent}>Add post</button>
      </div>
      <div className={mypost.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
