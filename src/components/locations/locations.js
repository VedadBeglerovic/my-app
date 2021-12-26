import React, { useEffect, useState } from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import EditLocationDialog from './editLocationDialog'
import AddIcon from '@material-ui/icons/Add';
import './locations.css'

export default function Location() {
  const [location, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const locationsArray = [];
    const dccs = {
      id: 1,
      name: "DCCS",
      adress: "Marsala Tita 34"
    };
    locationsArray.push(dccs);

    const codecta = {
      id: 2,
      name: "Codecta",
      adress: "Franca Lehara"
    };

    locationsArray.push(codecta);
    setLocations(locationsArray);
  }, []);

  const deletelocation = (value) => (event) => {
    event.stopPropagation();
    const filteredLocation = location.filter((element) => element.id !== value);
    setLocations(filteredLocation);
  };

  const editlocation = (location) => (event) => {
    setSelectedLocation(location)
    setDialogOpen(true)
  }

  const handleClose = () => {
    console.log('dialog closing')
    setDialogOpen(false)
  }

  const handleSaveAndClose = (locations) => {
    setDialogOpen(false)
    const locationsArray = [...location]
    let changeLocation = locationsArray.find(x => x.id === locations.id)
    if (!changeLocation) {
      locationsArray.push(locations)
    } else {
      let indexOfChangedElement = locationsArray.indexOf(changeLocation)
      locationsArray[indexOfChangedElement] = locations
    }

    setLocations(locationsArray)
  }

  const addNewLocation = () => {
    setSelectedLocation(null)
    setDialogOpen(true)
  }

  return (<div className="table-container">
    <AddIcon onClick={addNewLocation} className='addIcon'/>
    <input type="text" placeholder='Search...' onChange={(e) => { setSearchTerm(e.target.value) }} className='search'/>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className='tableHead'>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {location.filter((val) => {
            if (searchTerm === "") {
              return val
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map((row, index) => (
            <TableRow key={index} classes={{ root: "tableRow" }}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.adress}</TableCell>
              <TableCell>
                <Tooltip title="Delete location" placement="top" arrow={true}>
                  <DeleteIcon
                    className="actionIcon"
                    onClick={deletelocation(row.id)}
                  />
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Edit location" placement="top" arrow={true}>
                  <EditIcon
                    className="actionIcon"
                    onClick={editlocation(row)}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <EditLocationDialog open={dialogOpen} handleClose={handleClose} selectedLocation={selectedLocation} handleSaveAndClose={handleSaveAndClose} />
  </div>
  )
}