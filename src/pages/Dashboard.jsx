import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import FormIncidencia from '../components/FormIncidencia'
import { getIncidencias, deleteIncidencia, createIncidencia, updateIncidencia } from '../services/incidencias.service'
import { alertaExito, alertaError, alertaConfirmacion } from '../helpers/alerts'

const Dashboard = () => {
  const [incidencias, setIncidencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [incidenciaEditar, setIncidenciaEditar] = useState(null)

  useEffect(() => {
    cargarIncidencias()
  }, [])

  const cargarIncidencias = async () => {
    try {
      setLoading(true)
      const data = await getIncidencias()
      setIncidencias(data)
    } catch {
      alertaError('No se pudieron cargar las incidencias')
    } finally {
      setLoading(false)
    }
  }

  const handleGuardar = async (form) => {
    try {
      if (incidenciaEditar) {
        await updateIncidencia(incidenciaEditar.id, form)
        await alertaExito('Incidencia actualizada correctamente')
      } else {
        await createIncidencia(form)
        await alertaExito('Incidencia creada correctamente')
      }
      setMostrarForm(false)
      setIncidenciaEditar(null)
      cargarIncidencias()
    } catch {
      alertaError('No se pudo guardar la incidencia')
    }
  }

  const handleEditar = (inc) => {
    setIncidenciaEditar(inc)
    setMostrarForm(true)
  }

  const handleDelete = async (id) => {
    const resultado = await alertaConfirmacion('Esta incidencia será eliminada permanentemente')
    if (resultado.isConfirmed) {
      try {
        await deleteIncidencia(id)
        await alertaExito('Incidencia eliminada correctamente')
        cargarIncidencias()
      } catch {
        alertaError('No se pudo eliminar la incidencia')
      }
    }
  }

  const handleCerrarForm = () => {
    setMostrarForm(false)
    setIncidenciaEditar(null)
  }

  const incidenciasFiltradas = incidencias.filter(inc =>
    inc.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  const contadores = {
    Pendiente: incidencias.filter(i => i.estado === 'Pendiente').length,
    'En Progreso': incidencias.filter(i => i.estado === 'En Progreso').length,
    Resuelto: incidencias.filter(i => i.estado === 'Resuelto').length,
  }

  const colorEstado = {
    'Pendiente': 'bg-yellow-100 text-yellow-700',
    'En Progreso': 'bg-blue-100 text-blue-700',
    'Resuelto': 'bg-green-100 text-green-700',
  }

  const colorPrioridad = {
    'Alta': 'bg-red-100 text-red-700',
    'Media': 'bg-orange-100 text-orange-700',
    'Baja': 'bg-gray-100 text-gray-600',
  }

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-5 shadow animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {mostrarForm && (
        <FormIncidencia
          onGuardar={handleGuardar}
          onCerrar={handleCerrarForm}
          incidenciaEditar={incidenciaEditar}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow text-center border-l-4 border-yellow-400">
            <p className="text-3xl font-bold text-yellow-500">{contadores.Pendiente}</p>
            <p className="text-gray-500 text-sm mt-1">Pendientes</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow text-center border-l-4 border-blue-400">
            <p className="text-3xl font-bold text-blue-500">{contadores['En Progreso']}</p>
            <p className="text-gray-500 text-sm mt-1">En Progreso</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow text-center border-l-4 border-green-400">
            <p className="text-3xl font-bold text-green-500">{contadores.Resuelto}</p>
            <p className="text-gray-500 text-sm mt-1">Resueltas</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar incidencia por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            + Nueva Incidencia
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : incidenciasFiltradas.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>No se encontraron incidencias</p>
            </div>
          ) : (
            incidenciasFiltradas.map(inc => (
              <div key={inc.id} className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-2">{inc.titulo}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{inc.descripcion}</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorEstado[inc.estado]}`}>
                    {inc.estado}
                  </span>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorPrioridad[inc.prioridad]}`}>
                    {inc.prioridad}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditar(inc)}
                    className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-medium py-2 rounded-lg transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(inc.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 rounded-lg transition-colors"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard