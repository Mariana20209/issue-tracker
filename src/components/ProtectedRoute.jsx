import {Navigate} from 'react-router-dom'

/*Verifica si hay un usuario guardado en el localStorage, si no lo hay redirige al login, si lo hay muestra el componente hijo que se le pase a ProtectedRoute*/
const ProtectedRoute = ({ children }) => {
    const usuario = localStorage.getItem('usuario')
    if (!usuario) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute