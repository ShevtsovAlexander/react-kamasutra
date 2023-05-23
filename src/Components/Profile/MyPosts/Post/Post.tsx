import * as React from 'react';
import post from './Post.module.css';

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={post.item}>
      <img
        alt="post img"
        className={post.imgItem}
        src="https://www.pngfind.com/pngs/m/685-6854994_react-logo-no-background-hd-png-download.png"
      />
      {props.message}
      <br />
      <span>like</span> {props.likesCount}
    </div>
  );
};

export default Post;
