import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import IdleScreen1 from './pages/IdleScreen1'
import IdleScreen2 from './pages/IdleScreen2'
import Home from './pages/Home'
import Destination from './pages/Destination'
import MapConfirm from './pages/MapConfirm'
import RouteSelect from './pages/RouteSelect'
import TicketSelect from './pages/TicketSelect'
import OrderSummary from './pages/OrderSummary'
import ThankYou from './pages/ThankYou'
import LanguageSelect from './pages/LanguageSelect'
import HelpCenter from './pages/HelpCenter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IdleScreen1 /> },
      { path: 'idle2', element: <IdleScreen2 /> },
      { path: 'home', element: <Home /> },
      { path: 'destination', element: <Destination /> },
      { path: 'map', element: <MapConfirm /> },
      { path: 'routes', element: <RouteSelect /> },
      { path: 'tickets', element: <TicketSelect /> },
      { path: 'summary', element: <OrderSummary /> },
      { path: 'done', element: <ThankYou /> },
      { path: 'language', element: <LanguageSelect /> },
      { path: 'help', element: <HelpCenter /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)