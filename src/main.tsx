import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage.tsx'
import App from './App.tsx'
import ValidatorHomePage from './pages/validator/ValidatorHomePage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/validator/home",
    element: <ValidatorHomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)