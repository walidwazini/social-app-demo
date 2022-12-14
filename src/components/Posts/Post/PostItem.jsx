import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import moment from "moment";
import { useDispatch } from "react-redux";

import { removePost, likePost } from "../../../actions/posts";
import useStyles from "./postItem-styles";

const PostItem = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile"));

  const OnlineUser = user?.result?.googleId || user?.result._id; // current online user
  const hasLikedPost = post.likes.find((like) => like === OnlineUser);

  const moreHorizonHandler = (postId) => {
    setCurrentId(postId);
    console.log(postId);
  };

  const openPost = () => history.push(`/posts/${post._id}`);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    // * did the current user like the post?
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== OnlineUser));
    } else {
      setLikes([...post.likes, OnlineUser]);
    }
  };

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' style={{ color: "white" }} />
          &nbsp;
          <div style={{ color: "white" }}>
            {post.likes.length > 2
              ? `You and ${post.likes.length - 1} others`
              : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
          </div>
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' style={{ color: "white" }} />
          <div style={{ color: "white" }}>
            &nbsp;{post.likes.length} &nbsp;
            {post.likes.length === 1 ? "Like" : "Likes"}
          </div>
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' style={{ color: "gray" }} />
        <div style={{ color: "gray" }}> &nbsp; Like</div>
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component='div'
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name} </Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size='small'
            onClick={() => moreHorizonHandler(post._id)}
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>
      )}
      <ButtonBase
        component='span'
        name='test'
        className={classes.cardAction}
        onClick={openPost}
      >
        <div className={classes.details}>
          <Typography variant='body2' sx={{ color: "white" }} component='h2'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant='h5'
          component='h2'
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant='body2'
            className={classes.ellipsisText}
            component='p'
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          style={{ color: "white" }}
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            style={{ color: "#C75151" }}
            onClick={() => dispatch(removePost(post._id))}
          >
            <DeleteIcon fontSize='medium' style={{ color: "#C75151" }} /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PostItem;
