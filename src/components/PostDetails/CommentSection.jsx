import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./comment-styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [commentList, setCommentList] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const handleClick = async () => {
    const finalComment = `${user?.result?.name} : ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setCommentList(newComments);
    setComment("");
    history.push(`/posts/${post._id}`);
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comment Section
          </Typography>
          {commentList.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              {c}
            </Typography>
          ))}
        </div>
        {user && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant='h6'>
              Write a comment..
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color='primary'
              variant='contained'
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
