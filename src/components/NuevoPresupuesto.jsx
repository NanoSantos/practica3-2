import { useState } from 'react'
import Mensaje from './Mensaje'

// Encargado de peDir al presupuesto al iniciar el formulario, página 1.1
const NuevoPresupuesto = ({ presupuesto,  setPresupuesto,  setIsValidPresupuesto }) => {
    // presupuesto.- var. de estado que controla el presupuesto al iniciar la app, HEADER
    // setPresupuesto.- funcion para actualizar var. estado al iniciar la app, HEADER
    // setIsValidPresupuesto.- funcion que actualiza la var. de estado isValidPresupuesto, HEADER

    // ======================================== Estados
    const [mensaje, setMensaje] = useState('');// mensaje de error para este componente

    // ======================================== Funciones
    const handlePresupuesto = e => {// Envio de formulario
        e.preventDefault();
        // presupuesto viene convertido en NUMBER
        if( !presupuesto || presupuesto < 0 ) {// validar formulario
            setMensaje('No es un presupuesto válido');// mostrar mensaje de error
            return;
        } 
        setMensaje('');// quitar mensaje de error
        setIsValidPresupuesto( true );// Presupuesto valido pasar a la pagina 2º
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={ handlePresupuesto } className="formulario">
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input 
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu Presupuesto"
                        value={ presupuesto }
                        /* solo se pueda meter numeros */
                        onChange={ e => setPresupuesto( Number( e.target.value ) )}
                    />
                </div>
                <input type="submit" value="Añadir" />
                { mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje>}
            </form>
        </div>
    );
}
export default NuevoPresupuesto;