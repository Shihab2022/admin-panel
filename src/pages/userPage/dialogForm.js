import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Button } from "@mui/material";

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
 export default function FormDialog(props) {
    const { open, setOpen, submit } = props;
    const [email, setEmail] = useState("");
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To invite user to this website, please enter email address here. We
              will send them a link to join.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!validateEmail(email)}
              onClick={() => submit({ email })}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }