import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#14202A',
    color: 'white'

  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // color: 'white'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    color: 'white'
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));