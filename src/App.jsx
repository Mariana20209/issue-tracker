import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routerApp } from './routes/routerApp'

const router = createBrowserRouter(routerApp)

function App() {
  return <RouterProvider router={router} />
}

export default App