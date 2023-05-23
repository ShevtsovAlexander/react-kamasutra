import * as React from 'react';
import mypost from './MyPosts.module.css';
import Post from './Post/Post';
import NewPost, { AddPostFormValuesType } from './MyPostForm';
import { PostType } from '../../../types/types';

export type MapPropsType = {
  posts: Array<PostType>;
};
export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = [...props.posts].map((p) => <Post key={p.id} message={p.message} likesCount={p.likeCounts} />);

  const addEvent = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
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
