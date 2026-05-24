import { useNavigate } from 'react-router-dom'
import { alertaConfirmacion } from '../helpers/alerts'

const Navbar = () => {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const handleLogout = async () => {
    const resultado = await alertaConfirmacion('¿Deseas cerrar tu sesión?')
    if (resultado.isConfirmed) {
      localStorage.removeItem('usuario')
      navigate('/login')
    }
  }

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🧑‍💻</span>
        <div>
          <h1 className="font-bold text-lg leading-none">Issue Tracker</h1>
          <p className="text-indigo-200 text-xs">Sistema de gestión de incidencias</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block"> {/* Oculta el nombre y rol en pantallas pequeñas */}
          <p className="font-semibold text-sm">{usuario?.nombre}</p>
          <p className="text-indigo-200 text-xs">{usuario?.rol}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}

export default Navbar