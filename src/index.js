import React, {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './containers/MainPage'
import ReactDOM from 'react-dom'
import CreatePost from './components/CreatePost'
import DeletePost from './components/DeletePost'
import EditPost from './components/EditPost'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)


root.render(
  <StrictMode>
    <MainPage />
    <CreatePost />
    <EditPost />
    <DeletePost />
  </StrictMode>
)

