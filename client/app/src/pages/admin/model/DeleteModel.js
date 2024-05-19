import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { toast } from 'react-toastify';

export default function SimpleDialog(props) {
  const { selected,onClose,delProductFlag,users,errDelUSerFalg, open,delProduct,totalProduct,resetSelected,delErrFlag,delSucess,delUserErr,delUserSuccess,delUserFlag,delUser } = props;
  const handleClose = () => {
  };
  const handleListItemClick = () => {
    onClose();
  };
  const handleDelete=()=>{
console.log(selected);
   if(delProductFlag){
    selected?.map((item) => {
        console.log("item",item);
        delProduct(item)
        totalProduct()
        resetSelected()
        if(!delErrFlag){
          toast.success(delSucess)
        }else{
          toast.error("something went wrong")
        }
      })
   }
   if(delUserFlag){
    selected?.map((item) => {
        console.log("item",item);
    
        delUser(item)
        users()
        resetSelected()
        if(!errDelUSerFalg){
          toast.success(delUserSuccess)
        }else{
          toast.error("something went wrong")
        }
      })
  }

    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle id="alert-dialog-title">
        {delProductFlag?<Typography>Are you sure wants to delete the product</Typography>:null}
         
         {
            delUserFlag?<Typography>Are you sure wants to delete the user</Typography>:null
         }
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button style={{margin:"20px"}}  variant="contained" onClick={() => handleListItemClick()}>{"No"}</Button>
          <Button style={{margin:"20px"}} variant="contained" color="error"  onClick={(handleDelete)} autoFocus>
         {"Yes"}
          </Button>
        </DialogActions>
    </Dialog>
  );
}