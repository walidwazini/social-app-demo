import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    backgroundColor: '#14202A',
    // backgroundColor: '',
    height: '420px',
    position: 'relative',
    color: 'white',
    transition: "background 0.45s",
    '&:hover': {
      backgroundColor: '#30495e'
    }

  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
    color: 'white',
  },
  ellipsisText: {
    //   Base properties
    textOverflow: "ellipsis",
    overflow: "hidden",

    // ? For single line 
    // whiteSpace: 'nowrap'

    //  For multine
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    display: "-webkit-box",
  },
  cardActions: {
    padding: '0 16px 10px 16px',
    // backgroundColor: 'lightblue',
    // paddingBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});