import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
export const routerApp = [
    /*/ y login muestra el login, dashboard muestra el dashboard pero solo si el usuario esta logueado, si no lo redirige al login/*/
    {
        path: '/',
        element: <Login />
    },
     {
    path: '/login',
    element: <Login />
  },
    {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }
]