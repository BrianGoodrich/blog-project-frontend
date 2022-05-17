
import React, { useEffect, useState } from "react"
import superagent from 'superagent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


require('./MainPage.css')

const MainCopy = () => {

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
            
            <div class = "mainfeed">
            <TableContainer style = {{ width: '500px'}} component = {Paper}>
            <Table>
                <TableBody>
                    <TableRow class = "tableheader">
                        <th>Title</th>
                        <th>Post</th>
                    </TableRow>
                    {posts.map((post, key) =>{
                        return(
                        <TableRow key={key}> 
                            <TableCell class = 'posts'>{post.postTitle}</TableCell>
                            <TableCell class = 'posts'>{post.postContent}</TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
                </Table>
                </TableContainer>
                </div>
        </div>
    )
}
export default MainCopy