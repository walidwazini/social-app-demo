import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

// import CommentSection from './CommentSection';
import useStyles from "./postDetails-styles";
import { getSinglePost, getPostBySearch } from "../../actions/posts";

const PostDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const postState = useSelector((state) => state.posts);
  const { post, posts, isLoading } = postState;
  const history = useHistory();

  const openPost = (postId) => {
    history.push(`/posts/${postId}`);
  };

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      // console.log(postState);
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  const recomendedPosts = posts.filter(({ _id }) => _id !== post._id);
  console.log(postState);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px " }}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {post.message}
          </Typography>
          <Typography variant='h6'>Created by: {post.name}</Typography>
          <Typography variant='body1'>
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant='body1'>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            alt={post.title}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
          />
        </div>
      </div>
      {recomendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>
            You might also like
          </Typography>
          <div className={classes.recommendedPosts}>
            {recomendedPosts.map((post) => (
              <div
                onClick={() => openPost(post._id)}
                style={{ margin: "20px", cursor: "pointer" }}
                key={post._id}
              >
                <Typography gutterBottom variant='h6'>
                  {post.title}
                </Typography>
                <Typography gutterBottom variant='subtitle2'>
                  {post.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant='subtitle2'
                  className={classes.ellipsisText}
                >
                  {post.message}
                </Typography>
                <Typography gutterBottom variant='subtitle1'>
                  Likes: {post.likes.length}
                </Typography>
                <img src={post.selectedFile} width='200px' />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
