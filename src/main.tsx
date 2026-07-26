import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// Halaman hasil prerender membawa metadata statis di <head> untuk crawler yang
// tidak menjalankan JS. Begitu React mount, ia meng-hoist metadata versinya
// sendiri, jadi tag statis itu dibuang dulu supaya tidak ada <title>/og:image
// ganda di DOM.
document.querySelectorAll('head [data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
