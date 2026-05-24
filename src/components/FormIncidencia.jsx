import { useState } from 'react'
import { alertaError } from '../helpers/alerts'

const FormIncidencia = ({ onGuardar, onCerrar, incidenciaEditar }) => {
  const [form, setForm] = useState({
    titulo: incidenciaEditar?.titulo || '',
    descripcion: incidenciaEditar?.descripcion || '',
    estado: incidenciaEditar?.estado || 'Pendiente',
    prioridad: incidenciaEditar?.prioridad || 'Media',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.titulo.trim()) {
      alertaError('El título es obligatorio')
      return
    }
    if (!form.descripcion.trim()) {
      alertaError('La descripción es obligatoria')
      return
    }
    onGuardar(form)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="font-bold text-lg">
            {incidenciaEditar ? '✏️ Editar Incidencia' : '➕ Nueva Incidencia'}
          </h2>
          <button onClick={onCerrar} className="text-indigo-200 hover:text-white text-xl">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Error en módulo de pagos"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describe el problema detalladamente..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Resuelto">Resuelto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
              <select
                name="prioridad"
                value={form.prioridad}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onCerrar}
              className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg text-sm transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm transition-colors"
            >
              {incidenciaEditar ? 'Guardar cambios' : 'Crear incidencia'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FormIncidencia