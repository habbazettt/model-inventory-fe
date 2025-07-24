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
import ValidatorNotificationsPage from './pages/validator/ValidatorNotificationsPage.tsx'
import ValidatorModelValidationPage from './pages/validator/ValidatorModelValidationPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import DeveloperModelDetailsPage from './pages/developer/DeveloperModelDetailsPage.tsx'
import ValidatorModelDetailsPage from './pages/validator/ValidatorModelDetailsPage.tsx'
import DeveloperModelResultsPage from './pages/developer/DeveloperModelResultsPage.tsx'
import ValidatorModelResultsPage from './pages/validator/ValidatorModelResultsPage.tsx'
import ApproverHomePage from './pages/approver/ApproverHomePage.tsx'
import ApproverNotificationsPage from './pages/approver/ApproverNotificationsPage.tsx'
import ApproverModelApprovalPage from './pages/approver/ApproverModelApprovalPage.tsx'
import ApproverModelDetailsPage from './pages/approver/ApproverModelDetailsPage.tsx'
import ApproverModelResultsPage from './pages/approver/ApproverModelResultsPage.tsx'

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
    path: "/developer/model/:id",
    element: <DeveloperModelDetailsPage />,
  },
  {
    path: "/developer/model/:id/results",
    element: <DeveloperModelResultsPage />,
  },
  {
    path: "/validator/home",
    element: <ValidatorHomePage />,
  },
  {
    path: "/validator/notifications",
    element: <ValidatorNotificationsPage />,
  },
  {
    path: "/validator/model-validation",
    element: <ValidatorModelValidationPage />,
  },
  {
    path: "/validator/model/:id",
    element: <ValidatorModelDetailsPage />,
  },
  {
    path: "/validator/model/:id/results",
    element: <ValidatorModelResultsPage />,
  },
  {
    path: "/approver/home",
    element: <ApproverHomePage />,
  },
  {
    path: "/approver/notifications",
    element: <ApproverNotificationsPage />,
  },
  {
    path: "/approver/model-approval",
    element: <ApproverModelApprovalPage />,
  },
  {
    path: "/approver/model/:id",
    element: <ApproverModelDetailsPage />,
  },
  {
    path: "/approver/model/:id/results",
    element: <ApproverModelResultsPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)