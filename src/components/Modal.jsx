import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

// Modal con el formulario al dar clic en boton de 2º pagina "+"
const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar,setGastoEditar
}) => {
    // setModal .- funcion que actualiza la var. de estado del modal
    // animarModal .- se ejecuta despues de 3seg. var de estado, APP
    // setAnimarModal .- funcion que actualizar var. de estado animarModal, APP
    // guardarGasto .- funcion para agrega gasto, APP
    // gastoEditar.- var. de estado que guarda datos al delizar hacia izquierda, APP
    // setGastoEditar.- funcion que act. var. de estado editar, APP

    // ====================================================== Estados
    const [mensaje, setMensaje] = useState('');// mensaje de error
    const [nombre, setNombre] = useState('');// formulario
    const [cantidad, setCantidad] = useState('');// formulario
    const [categoria, setCategoria] = useState('')// formulario
    const [id, setId] = useState('');// actualiza el ID, para saber que es editar y no de agregar
    const [fecha, setFecha] = useState('');// mismo que el ID

    // ====================================================== useEffects
    // se ejecuta cuando el componente este listo
    useEffect(() => {
        if( Object.keys( gastoEditar ).length > 0 ) {
            setNombre( gastoEditar.nombre );// actualizamos los inputs con los valores del formulario al editar
            setCantidad( gastoEditar.cantidad );// actualizamos los inputs con los valores del formulario al editar
            setCategoria( gastoEditar.categoria );// actualizamos los inputs con los valores del formulario al editar
            setId( gastoEditar.id );// actualizamos los inputs con los valores del formulario al editar
            setFecha( gastoEditar.fecha );// actualizamos los inputs con los valores del formulario al editar
        }
    }, []);
    // ====================================================== Funciones
    const ocultarModal = () => {// Ocultar el modal al dar clic en boton X
        setAnimarModal( false );// animar el modal al cerrar el modal
        setGastoEditar( {} );
        setTimeout( () => {
            setModal( false ); // cerrar el mddal
        }, 500);
    }
    const handleSubmit = e => {// envio de formulario
        e.preventDefault();
        if( [ nombre, cantidad, categoria ].includes('') ) {// verifica si está vacío
            setMensaje('Todos los campos son obligatorios');// mostrar mensaje de error
            setTimeout( () => {// despues de 3seg cerrar el mensaje
                setMensaje('');// poniendo a false
            }, 3000)
            return;
        }
        // Crear nuevo objeto con datos del formulario
        guardarGasto({ nombre, cantidad, categoria, id, fecha });
    }
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img  src={ CerrarBtn } alt="cerrar modal" onClick={ ocultarModal } />
            </div>
            <form onSubmit={ handleSubmit } className={`formulario ${ animarModal ? 'animar' : 'cerrar' }`} >
                <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                { mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje> }
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={ nombre }
                        onChange={ e => setNombre( e.target.value )}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Añade La cantidad del gasto: ej. 300"
                        value={ cantidad }
                        onChange={ e => setCantidad( Number(e.target.value) ) }
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        value={ categoria }
                        onChange={ e => setCategoria( e.target.value ) }
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={ gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' }
                />
            </form>
        </div>
    );
}
export default Modal;