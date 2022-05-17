
import React, { useEffect, useState } from "react"
import superagent from 'superagent'
import Post from '../components/Post'
import Box from "@mui/material/Box"


require('./MainPage.css')

const MainPage = () => {

    const [ posts, setPosts ] = useState([])

    const getPost = async () => {

        const response = await superagent.get('/getall')
        const resObject = JSON.parse(response.text)
        console.log(resObject)
        setPosts(resObject)
    }

    useEffect(() => {
        getPost()
    }, [])

    return(

        <div class = "maincontainer">
            
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