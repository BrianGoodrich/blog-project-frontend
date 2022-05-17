import React, {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './containers/MainPage'
import ReactDOM from 'react-dom'
import CreatePost from './components/CreatePost'
import Post from './components/Post'



const rootElement = document.getElementById('root')
const root = createRoot(rootElement)


root.render(
  <StrictMode>
    <CreatePost />
    <MainPage />
  </StrictMode>
)

export default root