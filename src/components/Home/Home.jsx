import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Form from "../Form/Form";
import Posts from "../Posts/Posts";
// import useStyles from "../../styles";
import Paginate from "../Pagination";
import { getPostBySearch } from "../../actions/posts";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  // const searchQuery = query.get("searchQuery");

  const searchPost = () => {
    if (search.trim() || tags) {
      // tags : convert array into a string
      //   ['europe', 'usa'] -->  "europe,usa"
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  // const searchPostByTitle = () => {
  //   dispatch(getPostByTitle({ title: search }));
  //   history.push(`/posts/byTitle?searchQuery=${search}`);
  // };

  const handleKeyPress = (ev) => {
    if (ev.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (newTag) => setTags([...tags, newTag]);

  const handleDeleteChip = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                onKeyDown={handleKeyPress}
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant='contained'
                color='primary'
              >
                Search
              </Button>
            </AppBar>
            {/* <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                onKeyDown={handleKeyPress}
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                onClick={searchPostByTitle}
                className={classes.searchButton}
                variant='contained'
                color='secondary'
              >
                Search
              </Button>
            </AppBar> */}
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
