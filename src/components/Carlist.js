import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}></Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err));
  };

  const deleteCar = (params) => {
    if (window.confirm('Are you sure you want to delete car?')) {
      fetch(params, {method: 'DELETE'})
      .then(() => fetchData())
      .catch(err => console.error(err));
      handleClick();
    };
  };

  const saveCar = (car) => {
    fetch('https://carstockrest.herokuapp.com/cars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
  };
  

  const columns = [
    {headerName: 'Brand', field: 'brand', sortable: true, filter: true},
    {headerName: 'Model', field: 'model', sortable: true, filter: true},
    {headerName: 'Color', field: 'color', sortable: true, filter: true},
    {headerName: 'Fuel', field: 'fuel', sortable: true, filter: true},
    {headerName: 'Year', field: 'year', sortable: true, filter: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true},
    {headerName: 'Edit', cellRendererFramework: function(params) {
      return <Editcar updateCar={updateCar} car={params.data} />
    }},
    {headerName: 'Delete', cellRendererFramework: function(params) {
      return <Button size="small" variant="outlined" color="error"
      onClick={() => deleteCar(params.data._links.self.href)}>Delete</Button>
    }}
  ];

  return (
    <div>
      <div className="ag-theme-material"
        style={{
          height: 1750,
          width: '100%',
          margin: 'auto',
        }}
        >
        <Addcar saveCar={saveCar} />
        <AgGridReact
          animateRows={true}
          columnDefs={columns}
          rowData={cars}
        >
        </AgGridReact>
      </div>
      <Snackbar 
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Car deleted"
        action={action}
      />
      
    </div>
  );
};