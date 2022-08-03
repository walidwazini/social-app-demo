import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import useStyles from "./comment-styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [commentList, setCommentList] = useState([1, 2, 3]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log(user.result.name);

  const handleClick = () => {
    const finalComment = `${user.result.name} : ${comment}`;

    dispatch(commentPost(finalComment, post._id));
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
              Commentss...
            </Typography>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default CommentSection;
