import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

// Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

// Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

    //console.log(citaObj);
}

// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Se edito correctamente');

        // pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj });

        // Regresar el estado del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // QUitar modo de edicion
        editando = false;

    } else {
        // Generar un id unico
        citaObj.id = Date.now();

        // Creando una nueva cita (...citaObj evita que al crear un objeto se duplique)
        administrarCitas.agregarCita({...citaObj });

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }

    // Reiniciar el objeto para la validacion 
    ReiniciarObjeto();

    // Reiniciar formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

export function ReiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

export function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Muestre un mensaje
    ui.imprimirAlerta('La cita de elimino correctamente');

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    // Destructuring
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Lenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}