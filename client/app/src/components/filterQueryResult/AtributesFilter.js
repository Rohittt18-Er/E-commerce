import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { useState } from 'react';

export default function AttributesFilter() {

  const ramData = [
    { name: "1 GB", id: 1 },
    { name: "2 GB", id: 2 },
    { name: "4 GB", id: 3 },
    { name: "6 GB", id: 4 },
    { name: "8 GB", id: 5 },
    { name: "16 GB", id: 6 },
    { name: "32 GB", id: 7 }
  ];

  const colorData=[
    { name: "Red", id: 66 },
    { name: "Green", id: 34 },
    { name: "Yellow", id: 23 },
    { name: "Blue", id: 45 },
   
  ]

  const [ram, setRam] = useState(
    ramData.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );

const [colored,setColor] = useState(
    colorData.reduce((acc,item)=>{
        acc[item.id]=false;
        return acc
    },{})
)

  const handleChange = (event, id) => {
    const { checked } = event.target;
    setRam(prevState => ({
      ...prevState,
      [id]: checked
    }));
    setColor(prevState=>({
        ...prevState,
        [id]:checked
    }))
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <FormControl component="fieldset" variant="standard">
          <Typography variant="h6">RAM</Typography>
          <FormGroup>
            {ramData.map(item => (
              <FormControlLabel
                key={item.id} 
                control={
                  <Checkbox
                    color="success"
                    checked={ram[item.id]} 
                    onChange={(event) => handleChange(event, item.id)} 
                    name={item.name}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <FormControl component="fieldset" variant="standard">
          <Typography variant="h6">Color</Typography>
          <FormGroup>
            {colorData.map(item => (
              <FormControlLabel
                key={item.id} 
                control={
                  <Checkbox
                    color="success"
                    checked={colored[item.id]} 
                    onChange={(event) => handleChange(event, item.id)} 
                    name={item.name}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>

      
    </>
  );
}
