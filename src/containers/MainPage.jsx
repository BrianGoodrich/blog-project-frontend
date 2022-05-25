
import React, { useEffect, useState } from "react"
import superagent from 'superagent'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import  Paper  from "@mui/material/Paper"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

//The concept for the edit functionality was learned from this youtube video: https://www.youtube.com/watch?v=EbnmosN64JQ I had to heavily modify it to fit this project but that is what I used to conceptually build the edit portion, with my own syntax.
//All other portions of this project were built from class notes, old projects, and documentation.

require('./MainPage.css')

const MainPage = () => {

    const [ posts, setPosts ] = useState([]) 
    const [ editPostID, setEditPostID] = useState([]) //Will use this to edit specific posts using the ID assigned when mapped
    

    const getPost = async () => { //Function to grab all the posts from the database.

        const response = await superagent.get('/getall')
        const resObject = JSON.parse(response.text)
        setPosts(resObject)
    }

    useEffect(() => {
        getPost()
    }, [])

    //Function for creating posts
    const CreatePost = () => {

        const [ newPost, setNewPost ] = useState('')
        const [ title, setTitle ] = useState('')
    
        const sendPost = async () => {
    
             await superagent
            .post('/createBlogPost')
            .send({"postContent": newPost,
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
                        <Button id="submitpost" variant="contained" color='primary' 
                        onClick = {(event) => {setNewPost(document.getElementById('inputbox').value); setTitle(document.getElementById('titlebox').value); getPost()}}>Submit</Button>
                    </div>  
                </Paper>
                
            </div>
    )}

    //Function to build each post 
    const Post = ({postContent, postTitle, postID}) => {

        const removePost = async (post) => {
    
            await superagent.get('/delete') //Query the API wil the postID we want to delete
                    .query({'postID': post})
                    .then(res => {
                        console.log(post)
                    })
        }

        const sendEditedPost = async (editedText, post) => {
    
            await superagent //Send edited text from the edit text box to the api.
           .post('/edit')
           .send({"postContent": editedText,
                   "_id": post})
           .set('X-API-Key', 'foobar')
           .set('Accept', 'application/json')
           .then(res => {

            console.log(JSON.stringify(res.body))

            setEditPostID(null) //This will set our editpostid back to null so that we are rendering the feed normally without the edit box.
            getPost() //This will refresh the feed after we submit our edit changes

           })
       }
    
        useEffect(() => {
            removePost()

        })
        
        return(
            <div>
                {editPostID === postID ? //This ternary statement will conditionally render our edit box when the edit button is clicked. When the onclick event fires it will set the state of editpostid to the current ID we are mapping over and this will fire rendering our edit box, the submit button for the edit box will then submit the new post to our database.
                <div>
                <Paper style={{ width: '490px', height: '110px', margin : '10px'}}>
                <TextField type="text" id="editbox" label="Edit Post" defaultValue="Edit me">
                </TextField>
                <Box width = "50px"  margin = "5px">
                <Button id="submitpost" variant="contained" color='primary' 
                onClick = {(event) => {sendEditedPost(document.getElementById('editbox').value, postID)}}>Submit</Button> 
                </Box> 
                </Paper>
                
                </div>
                : //Ternary split, the code below will render when our editPostID does not equal the postID we are currently mapping over. Or when the edit button hasn't been pushed.
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
                <Button id="editpost" variant="contained" color="primary" margin = "5px" onClick = {(event) => {setEditPostID(postID)}}>Edit</Button> 
            </Box>
            <Box width = "50px" display = "inline" margin = "5px">
                <Button id="deletepost" variant="contained" color="primary" margin = "5px"  onClick = {(event) => {removePost(postID); getPost()}}>Delete</Button>      
            </Box>
            </div>
                 }    
            </div>
            //When the edit button is clicked it will update the state of the global editpostid var to the ID of the post that was clicked. Then our ternary above will call the sendEditedPost function and send the edited post to our database.
            //The delete button will call the removePost function and delete the post we clicked using its ID
    )}

    //MainPage return
    return(
        <div class = "maincontainer">
            <CreatePost />
            <Box style = {{margin : 'auto', width : '502px', maxHeight: '1000px', overflow: 'auto', }}>
                {posts.map((post, key) =>{
                        return(
                        <Post 
                        key = {key}
                        postContent={post.postContent}
                        postTitle={post.postTitle}
                        postID={post._id}
                        />
                        )
                    })}     
            </Box>
        </div>
    )
    
}

export default MainPage