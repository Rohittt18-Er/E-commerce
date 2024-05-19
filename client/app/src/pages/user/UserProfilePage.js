
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Typography,
  Button,
  ButtonBase,
  Paper
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { loggedUser } from "../../redux/store/slices/authSlice";
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2
  },
  paper: {
    padding: theme.spacing(4),
    marginTop:"80px",
    margin: "auto",
    width: 500,
    height:600,
  
  },
  image: {
    width: 150,
    height: 500
  },
  img: {
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%"
  }
}));

function Account({ userData }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
    <Grid container spacing={6}>
      <Grid item xs={12} container justify="center">
        <Typography variant="h4">User Profile</Typography>
        {/* <Grid  style={{marginLeft:"40px"}}>
          <EditIcon/>
        </Grid>
      */}
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

// function PasswordMgmt({ id }) {
//   const [currPassword, setCurrPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [correctPassword, setCorrectPassword] = useState(false);
//   const [change, setChange] = useState(false);
//   const [submittable, setSubmittable] = useState(false);
//   const classes = useStyles();
//   const correctPW = "password";

//   function validateNewPassword() {
//     var check =
//       currPassword === correctPW && newPassword === confirmNewPassword;
//     console.log(check);
//     setSubmittable(check);
//   }

//   return (
//     <Paper className={classes.paper}>
//       <Grid container direction="column" spacing={4}>
//         <Grid container justify="flex-start">
//           <Typography variant="h4">Password Mangement</Typography>
//         </Grid>
//         <Grid item>
//           <TextField
//             label="Current Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             onChange={(e) => setCurrPassword(e.target.value)}
//           />
//         </Grid>
//         <Grid item>
//           <TextField
//             disabled={currPassword.length == 0}
//             label="New Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//           />
//         </Grid>
//         <Grid item>
//           <TextField
//             disabled={currPassword.length == 0}
//             onChange={() => validateNewPassword()}
//             label="Confirm New Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//           />
//         </Grid>
//         <Grid container justify="flex-end">
//           <Button disabled={submittable} variant="contained" color="primary">
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }
export default function UserProfilePage() {
  const classes = useStyles();
  const userData =  useSelector(loggedUser)
  return (
    <Grid container direction="column" justify="center" spacing={5}>
      <Grid item>
        <Account userData={userData} />
      </Grid>
    </Grid>
  );
}
