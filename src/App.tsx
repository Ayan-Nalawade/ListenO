import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';

function App() {
  return (
    <div>
      <Grid container>
        <Grid xs={2}>
          <Sidebar />
        </Grid>
        <Grid xs={10}>
          <MainContent />
        </Grid>
      </Grid>
      <Player />
    </div>
  );
}

export default App;
