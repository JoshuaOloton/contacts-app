import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './pages/Root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Contact from './pages/Contact'
import EditContact from './pages/Edit'
import Index from './pages/Index'
import { action as editAction } from './pages/Edit'
import { loader as rootLoader, action as rootAction } from './pages/Root'
import { loader as contactLoader, action as contactAction } from './pages/Contact'
import { action as destroyAction } from './pages/Delete'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: '/contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: '/contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: '/contacts/:contactId/destroy',
            action: destroyAction,
          }
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
