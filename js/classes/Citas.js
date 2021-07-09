// Classes
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        //console.log(this.citas);
    }

    eliminarCita(id) {
        // Filter va a quitar un elemento basado en una condicion
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada) {
        // Map recorre todos los elementos del arreglo .map va a reescribir lo que tengamos en citas
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

export default Citas;