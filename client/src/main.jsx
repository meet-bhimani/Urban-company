import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import App from './App.jsx'
import { ThemeProvider } from './context/themeContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { SidebarProvider } from './context/sideBarContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SidebarProvider>
      <ThemeProvider>
        <Provider store={store}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </Provider>
      </ThemeProvider>
    </SidebarProvider>
  </React.StrictMode>
)
