import React from 'react';
import './App.css';
import Carlist from './components/Carlist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Carlist
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Carlist />
    </div>
  );
}

export default App;
