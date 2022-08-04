import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { Toolbar, AppBar, Typography, Avatar, Button } from "@material-ui/core";

import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logoutHandler = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  }, [history, dispatch]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const deocdedToken = decode(token);

      if (deocdedToken.exp * 1000 < new Date().getTime()) logoutHandler();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logoutHandler, user?.token]); // * When location changes, setUser()

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.picture}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user?.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            // component={Link}
            // to='/auth'
            variant='contained'
            className={classes.login}
            color='primary'
            onClick={() => history.push("/auth")}
          >
            Login
            {/* <Link to='/auth'>Link</Link> */}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
