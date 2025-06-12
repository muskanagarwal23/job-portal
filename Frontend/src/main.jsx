import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './style.css';
import { BrowserRouter } from 'react-router-dom' // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css';
import { BookmarkProvider } from './Context/BookmarkContext.jsx';
import { SearchProvider } from './Context/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SearchProvider>
    <StrictMode>
      <BookmarkProvider>
      <App />
      </BookmarkProvider>
    </StrictMode>
    </SearchProvider>
  </BrowserRouter>
)