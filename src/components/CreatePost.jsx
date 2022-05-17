import Button from '@mui/material/Button'
import React, { useEffect, useState } from "react"
import superagent from 'superagent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import  Paper  from "@mui/material/Paper"
import root from "../index"
import MainPage from "../containers/MainPage"

require('./CreatePost.css')

const CreatePost = () => {

    const [ post, setPost ] = useState('')
    const [ title, setTitle ] = useState('')

    const sendPost = async () => {

         await superagent
        .post('/createBlogPost')
        .send({"postContent": post,
                "postTitle": title})
        .set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .then(res => {
            console.log(JSON.stringify(res.body))
        })

        
    }

    useEffect(() => {
        sendPost()
    })

    return(
        <div class = "main">
            <Paper style={{ width: '550px', height: '110px', margin : 'auto'}}>
        <div class = "textboxdiv">
            <TextField type="text" id="inputbox" label="Post" defaultValue="Hello World">
            </TextField>
            <TextField type="text" id="titlebox" label="Title" defaultValue="Post Title">
            </TextField>
        </div>
        <div class = "buttondiv">        
                <Button id="submitpost" variant="contained" color='primary' onClick = {(event) => {setPost(document.getElementById('inputbox').value); setTitle(document.getElementById('titlebox').value)}}>Submit</Button>
            </div>
        
    </Paper>
            
        </div>

)}

export default CreatePost