import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography"
import  Paper  from "@mui/material/Paper"
import Box from "@mui/material/Box"
import superagent from "superagent"


const Post = ({postContent, postTitle, postID}) => {

    


    const removePost = async (post) => {

        await superagent.get('/delete')
                .query({'postID': post})
                .then(res => {
                    console.log(post)
                })

    }

    useEffect(() => {
        removePost()
    })
    

    
    return(
        <div>
            <Paper style={{ width: '490px', margin : '7px'}}>
                <div>
                <Typography component = 'h5' style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold'}}>{postTitle}</Typography>
                </div>
                <div>
                <Typography style={{ padding: '10px'}}>{postContent}</Typography>
                </div>
            </Paper>
            
            <Box width = "50px" display = "inline" margin = "5px">
            <Button id="editpost" variant="contained" color="primary" margin = "5px">Edit</Button>

      </Box>

      <Box width = "50px" display = "inline" margin = "5px">
      <Button id="deletepost" variant="contained" color="primary" margin = "5px"  onClick = {(event) => {removePost(postID)}}>Delete</Button>      
      </Box>
        </div>















)}

export default Post