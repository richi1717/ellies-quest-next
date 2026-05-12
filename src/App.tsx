import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import BattlePage from './pages/BattlePage'
import VictoryPage from './pages/VictoryPage'

const router = createBrowserRouter([
  {
    path: '/battle/victory',
    element: <VictoryPage />,
  },
  {
    path: '/battle/:battleScene',
    element: <BattlePage />,
  },
  {
    path: '*',
    loader: () => redirect('/battle/forest'),
    element: null,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
