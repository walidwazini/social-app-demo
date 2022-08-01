import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { LockOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import useStyles from "./styles";
import Input from "./Input";
import { signIn, signUp } from "../../actions/auth";
import { GOOGLE_AUTH } from "../../constants/actionTypes";
// import Icon from "./icon";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const changeHandler = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const switchMode = () => setIsSignup((prevState) => !prevState);

  const googleSuccess = async (res) => {
    console.log(res);
    // const result = res?.profileObj;
    const token = res?.credential;
    const decodedToken = jwtDecode(token); // ? Can also be named as 'result'

    try {
      dispatch({ type: GOOGLE_AUTH, data: { token, decodedToken } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          <LockOutlined />
        </Avatar>
        <Typography style={{ color: "white" }} variant='h5'>
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  onChange={changeHandler}
                  autoFocus
                  required={true}
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  onChange={changeHandler}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              onChange={changeHandler}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              type={showPassword ? "text" : "password"}
              onChange={changeHandler}
              handlePassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                onChange={changeHandler}
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
          </div>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button style={{ color: "white" }} onClick={switchMode}>
                {isSignup ? "Switch to Login" : "Switch to Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
