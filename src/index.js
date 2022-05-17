import React, {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './containers/MainPage'
import ReactDOM from 'react-dom'




const rootElement = document.getElementById('root')
const root = createRoot(rootElement)


root.render(
  <StrictMode>
    
    <MainPage />
  </StrictMode>
)

export default root