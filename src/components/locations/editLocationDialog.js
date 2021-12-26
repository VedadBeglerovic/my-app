import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';


export default function EditLocationDialog({
  open,
  handleClose,
  selectedLocation,
  handleSaveAndClose,
}) {
  const [location, setLocation] = useState({});
  

  useEffect(() => {
    if (selectedLocation) {
      const newLocation = {
        id: selectedLocation.id,
        name: selectedLocation.name,
        adress: selectedLocation.adress
    };
    setLocation(newLocation);
    } else {
      const newLocation = {
        id: -1,
        name: "",
        adress: "",
      };
      setLocation(newLocation);
    
    }
  }, [selectedLocation]);

  const handleChange = (event) => {
    setLocation({ ...location, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (!selectedLocation) {
      //backend request POST
    } else {
      //backend request PUT
    }
    handleSaveAndClose(location);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">Location info</DialogTitle>
      <DialogContent classes={{ root: "dialog-content" }}>
        
        <TextField
          id="name"
          label="Name"
          name="name"
          variant="outlined"
          value={location.name}
          onChange={handleChange}
        />
        <TextField
          label="Adress"
          name="adress"
          variant="outlined"
          value={location.adress}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
