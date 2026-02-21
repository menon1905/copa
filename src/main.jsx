import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('[v0] Rendering app...');

const rootElement = document.getElementById('root');
console.log('[v0] Root element:', rootElement);

if (!rootElement) {
  console.error('[v0] Root element not found!');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('[v0] App rendered successfully');
}
