import Button from '@mui/material/Button'
import React, { useEffect, useState } from "react"
import superagent from 'superagent'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


//const [post] = useState([])

const EditPost = () => {

    return(
        <div>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <div>
                    <TextField id="inputbox" label="Edit Post Box" defaultValue="Enter Post Number To Edit"/>
                </div>
                <div>        
                    <Button id="deletepost" variant="contained" color='primary'>Edit</Button>
                </div>
            </Box>
        </div>









)}

export default EditPost