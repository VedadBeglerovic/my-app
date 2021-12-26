import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./editUserDialog.css";

export default function EditUserDialog({
  open,
  handleClose,
  selectedUser,
  handleSaveAndClose,
}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (selectedUser) {
      const newUser = {
        id: selectedUser.id,
        name: selectedUser.name,
        age: selectedUser.age,
        gender: selectedUser.gender,
      };
      setUser(newUser);
    } else {
      const newUser = {
        id: -1,
        name: "",
        age: "",
        gender: "",
      };
      setUser(newUser);
    }
  }, [selectedUser]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (!selectedUser) {
      //backend request POST
    } else {
      //backend request PUT
    }
    handleSaveAndClose(user);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">User info</DialogTitle>
      <DialogContent classes={{ root: "dialog-content" }}>
        <TextField
          id="name"
          label="Name"
          name="name"
          variant="outlined"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="age"
          variant="outlined"
          value={user.age}
          onChange={handleChange}
        />
        <TextField
          label="Gender"
          name="gender"
          variant="outlined"
          value={user.gender}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {user.name === "admin" && <p>you are the admin</p>}
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
