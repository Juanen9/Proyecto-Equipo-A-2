import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProviderComponent } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProviderComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProviderComponent>  
  </React.StrictMode>,
)
