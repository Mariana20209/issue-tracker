import Swal from 'sweetalert2'

export const alertaExito = (mensaje) => {
    return Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
        confirmButtonColor: '#6366f1',
        timer: 1500,
        showConfirmButton: false
    })
}

export const alertaError = (mensaje) => {
    return Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: mensaje,
        confirmButtonColor: '#6366f1',
    })
}

export const alertaConfirmacion = (mensaje) => {
    return Swal.fire({
        title: '¿Estás segura?',
        text: mensaje,
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6366f1',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    })
}