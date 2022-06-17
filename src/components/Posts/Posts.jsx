import React from "react";

import PostItem from "./Post/PostItem";
import useStyles from "./posts-styles";

const Posts = () => {
  const classes = useStyles();

  return (
    <>
      <h1>Posts</h1>
      List of post..
      <PostItem />
      <PostItem />
    </>
  );
};

export default Posts;
