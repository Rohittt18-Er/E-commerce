import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  TextField,
  Grid,
  Typography,
  Button,
  ButtonBase,
  Paper,
  DialogContent
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { loggedUser } from '../../../redux/store/slices/authSlice';
import { DialogContentText } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    // paper: {
    //   width: 600,
    //   height:500,
    // },
  }));
function Account({ userData,onClose }) {
    const classes = useStyles();
    return (
      <Paper
      className={classes.paper}
      onClick={()=>{onClose()}} >
      <Grid container >
        <Grid item xs={12} container justify="center">
          <Typography variant="h4">User Profile</Typography>
        </Grid>
        <Grid item xs={12}  container justifyContent="center"  >
          <Grid   spacing={1} >
            <Typography variant="h6" style={{marginTop:"20px"}} >
              Name: {userData.name}
            </Typography>
            <Grid>
            <Typography variant="h6" style={{marginTop:"20px"}} >
              Last Name: {userData.lastName}
            </Typography>
            </Grid>
            
            <Grid>  <Typography variant="h6" style={{marginTop:"20px"}} >
              Role: {userData.isAdmin ? "Admin" : "User"}
            </Typography>
            </Grid>
          <Grid>
          <Typography variant="h6" style={{marginTop:"20px"}} >
              Email: {userData.email}
            </Typography>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{margin:"40px"}} container spacing={8}>
           <Grid item xs={12}>
           <Button variant="outlined" style={{marginLeft:"20px"}}>Edit user</Button>    <Button variant="outlined" style={{marginLeft:"20px"}}>Reset Password</Button>
           </Grid>
          </Grid>
    </Paper>
    );
  }



export default function ProfileDialog(props) {
    const userData =  useSelector(loggedUser)
  const { selected,onClose, open } = props;
  const handleClose = () => {
    onClose()
  };
  const handleListItemClick = () => {
    onClose();
  };
  const handleDelete=()=>{
  
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
 <Account
        onClose={handleClose}
        userData={userData} />
    </Dialog>
  );
}