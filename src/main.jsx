import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initBaseUrl } from "@const/getBaseUrl.ts";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
initBaseUrl().then(()=>{
    createRoot(document.getElementById('root')).render(

        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>,
    )
})

