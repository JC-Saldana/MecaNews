import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0px 30px 0px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 25px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  home: {
    marginLeft: 20,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    
  },
  profile: {
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    alignItems: "center",
    padding: "10px 20px",
    maxWidth: 600,
    minWidth: 355,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
   
  },
  postIcon: {
    fontSize: 50,
    color: "#029cd9",
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
  postIconPaper: {
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    marginLeft: '15px',
    padding: "2px 7px 5px 10px",
    fontSize: 60,
    color: "#029cd9",
    border: "1px solid #284d73",
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 15px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: "wrap",
    [theme.breakpoints.down('xs')]: {
      padding: "0px 0px 20px 0px",
    },
  }
}));