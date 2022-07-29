import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { getPosts } from "../actions/posts";
import { Link } from "react-router-dom";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
