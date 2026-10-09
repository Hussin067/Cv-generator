import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled locally (OFL), so no third-party font service sees the page.
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/400-italic.css'
import '@fontsource/noto-sans/600.css'
import '@fontsource/noto-sans/700.css'
import '@fontsource/noto-sans-arabic/400.css'
import '@fontsource/noto-sans-arabic/600.css'
import '@fontsource/noto-sans-arabic/700.css'
import './components/preview/cv-template.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
