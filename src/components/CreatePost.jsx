import Button from '@mui/material/Button'
import React, { useEffect, useRef, useState } from "react"
import superagent from 'superagent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const CreatePost = () => {

    const [ title, post, setPost ] = useState('')


    

    const sendPost = async () => {

         await superagent
        .post('/blogPost')
        .send({"postContent": post})
        .set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .then(res => {
            console.log(JSON.stringify(res.body))
        })

        
    }

    useEffect(() => {
        sendPost()
    })

    console.log(post)


    return(
        <div>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
        <div>
            <TextField type="text" id="inputbox" label="Create a post!" defaultValue="Hello World">
            </TextField>
        </div>
        <div>        
          <Button id="submitpost" variant="contained" color='primary' onClick = {(event) => {setPost(document.getElementById('inputbox').value)}}>Submit</Button>
        </div>
    </Box>
            
        </div>

)}

export default CreatePost