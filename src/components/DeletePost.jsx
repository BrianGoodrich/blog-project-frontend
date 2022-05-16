import Button from '@mui/material/Button'
import React, { useEffect, useState } from "react"
import superagent from 'superagent'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const DeletePost = () => {

    const [postID, setPostID]   = useState('')

    const removePost = async () => {

        await superagent.get('/delete')
                .query({'postID': postID})
                .then(res => {
                    console.log(JSON.stringify(res.body))
                })

    }

    useEffect(() => {
        removePost()
    })

    console.log(postID)

    return(
    
        <div>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
    <div>
        <TextField type="text" id="deletebox" label="Careful! This will DELETE posts" defaultValue="Post Number">
        </TextField>
    </div>
    <div>        
      <Button id="submitpost" variant="contained" color='primary' onClick = {(event) => {setPostID(document.getElementById('deletebox').value)}}>Delete</Button>
    </div>
</Box>
        
    </div>



)}

export default DeletePost