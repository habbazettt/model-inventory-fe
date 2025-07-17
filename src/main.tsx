import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage.tsx'
import DeveloperHomePage from './pages/developer/DeveloperHomePage.tsx'
import DeveloperNotificationsPage from './pages/developer/DeveloperNotificationsPage.tsx'
import DeveloperModelExecutionPage from './pages/developer/DeveloperModelExecutionPage.tsx'

import App from './App.tsx'
import ValidatorHomePage from './pages/validator/ValidatorHomePage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/developer/home",
    element: <DeveloperHomePage />,
  },
  {
    path: "/developer/notifications",
    element: <DeveloperNotificationsPage />,
  },
  {
    path: "/developer/model-execution",
    element: <DeveloperModelExecutionPage />,
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