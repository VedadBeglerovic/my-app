import React, { useEffect, useState } from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditUserDialog from './editUserDialog'
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import Notification from '../utils/notification'
import TextField from "@material-ui/core/TextField";
import './users.css'

export default function Users() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [user, setUser] = useState({});

  useEffect(() => {
    const usersArray = [];
    for (let i = 0; i < 20; i++) {
      const user = {
        id: i,
        name: "user" + i,
        age: Math.floor(Math.random() * 100),
        gender: i % 2 === 0 ? "m " : "f"
      };
      usersArray.push(user);
    }
    setUsers(usersArray);
  }, []);


  const editUser = (user) => (event) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }


  const deleteUser = (value) => (event) => {
    event.stopPropagation();
    const filteredArray = users.filter((element) => element.id !== value);
    setUsers(filteredArray);
  };


  const handleClose = () => {
    console.log('dialog closing')
    setDialogOpen(false)
  }


  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };


  const handleSaveAndClose = (user) => {
    setDialogOpen(false)
    const usersArray = [...users] // shallow copy - we are not mutating the original state
    let changedUser = usersArray.find(x => x.id === user.id) // find the changed user
    if (!changedUser) {
      usersArray.push(user)
    } else {
      let indexOfChangedElement = usersArray.indexOf(changedUser) // get his index, we need it
      usersArray[indexOfChangedElement] = user // change the user, keep the order in the array
    }
    setSnackbarOpen(true)
    setUsers(usersArray) // set state
  }


  const hideNotification = () => {
    setSnackbarOpen(false)
  }


  const addNewUser = () => {
    const newUser = {
      id: -1,
      name: user.name,
      age: user.age,
      gender: user.gender,
    };

    handleSaveAndClose(newUser)
    //setSelectedUser(null)
    //setDialogOpen(true)
  }

  return (<div >

    <TextField
      id="name"
      name="name"
      label = "Name"
      variant="outlined"
      value={user.name}
      onChange={handleChange}
    />
    <TextField
      name="age"
      label="Age"
      variant="outlined"
      value={user.age}
      onChange={handleChange}
    />
    <TextField
      name="gender"
      label = "Gender"
      variant="outlined"
      value={users.gender}
      onChange={handleChange}
    />

    <AddIcon onClick={addNewUser} className='addIcon' />
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow key={index} onClick={editUser(row)} classes={{ root: "tableRow" }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>
                  <Tooltip title="Delete user" placement="top" arrow={true}>
                    <DeleteIcon
                      className="actionIcon"
                      onClick={deleteUser(row.id)}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserDialog open={dialogOpen} handleClose={handleClose} selectedUser={selectedUser} handleSaveAndClose={handleSaveAndClose} />
      <Notification snackbarOpen={snackbarOpen} handleClose={hideNotification} notificationText={"User successfully updated"} />
    </div>
  </div>
  )
}



























