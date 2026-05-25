import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [nombre, setNombre] = useState('')
  const [rol, setRol] = useState('Administrador')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!nombre.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío',
        text: 'Por favor ingresa tu nombre para continuar',
        confirmButtonColor: '#9b9cf1'
      })
      return
    }

    const usuario = { nombre, rol }
    localStorage.setItem('usuario', JSON.stringify(usuario))

    Swal.fire({
      icon: 'success',
      title: `¡Bienvenido, ${nombre}!`,
      text: `Ingresando como ${rol}`,
      confirmButtonColor: '#a6a8ff',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      navigate('/dashboard')
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🧑‍💻</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Issue Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de gestión de incidencias</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              placeholder="Ej: Mariana Suarez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Administrador">Administrador</option>
              <option value="Desarrollador">Desarrollador</option>
              <option value="Soporte">Soporte</option>
            </select>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Ingresar al sistema
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login