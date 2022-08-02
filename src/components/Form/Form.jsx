import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import FileBase from "react-file-base64";

import useStyles from "./form-styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const initialState = {
    title: "",
    message: "",
    tags: "",
    selectedFile: "", // will convert into base 64 string
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);
  const user = JSON.parse(localStorage.getItem("profile"));

  const edittingPost = useSelector((state) => {
    return currentId
      ? state.posts.find((post) => {
          return post._id === currentId;
        })
      : null;
  });

  useEffect(() => {
    if (edittingPost) setPostData(edittingPost);
  }, [edittingPost]);

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const imageFile = e.target.files[0];
    const fileBase64 = await convertBase64(imageFile);
    setPostData({ ...postData, selectedFile: fileBase64 });
  };

  const clearInput = () => {
    setCurrentId(null);
    setPostData(initialState);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // if we have currentId
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }

    clearInput();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please sign in first.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {" "}
          {currentId ? "Editting" : "Creating"} a Memory
        </Typography>

        {/* <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator || ""}
          onChange={(ev) =>
            setPostData({ ...postData, creator: ev.target.value })
          }
        /> */}
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          required={true}
          // style={{ color: "whitesmoke !important" }}
          className={classes.input}
          fullWidth
          value={postData.title || ""}
          onChange={(ev) =>
            setPostData({ ...postData, title: ev.target.value })
          }
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          required={true}
          className={classes.input}
          fullWidth
          value={postData.message || ""}
          onChange={(ev) =>
            setPostData({ ...postData, message: ev.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          required={true}
          className={classes.input}
          value={postData.tags || ""}
          onChange={(ev) =>
            setPostData({ ...postData, tags: ev.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <input
            // value={postData.selectedFile || ""}
            type='file'
            onChange={(e) => uploadImage(e)}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='secondary'
          size='small'
          onClick={clearInput}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
