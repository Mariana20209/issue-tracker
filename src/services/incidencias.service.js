const API_URL = 'https://issue-tracker-8scw.onrender.com/incidencias'

/*get incidenicias trae todas las incidencias, createIncidencia crea una nueva incidencia, updateIncidencia actualiza una incidencia existente y deleteIncidencia elimina una incidencia por su id. Cada función maneja errores ry/catch lanzando una excepción si la respuesta no es exitosa.*/

export const getIncidencias = async () => {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Error al obtener las incidencias')
    return response.json()
}

export const createIncidencia = async (incidencia) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },  
        body: JSON.stringify(incidencia)
    })
    if (!response.ok) throw new Error('Error al crear la incidencia')
    return response.json()
}

export const updateIncidencia = async (id, incidencia) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(incidencia)
    })
    if (!response.ok) throw new Error('Error al actualizar la incidencia')
    return response.json()
}

export const deleteIncidencia = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error('Error al eliminar la incidencia')
    return response.json()
}