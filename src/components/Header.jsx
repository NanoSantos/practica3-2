import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

// Interfaz al resetear la página 1º
const Header = ({ gastos, setGastos, presupuesto,  setPresupuesto,  isValidPresupuesto,  setIsValidPresupuesto }) => {
    // gastos.- var. de estados que maneja los gastos, APP
    // setGasto.- funcion que actualiza var. de estado de gastos, APP
    // presupuesto.- var. de estado que controla el presupuesto al iniciar la app, App
    // setPresupuesto.- funcion para actualizar var. estado al iniciar la app, APP
    // isValidPresupuesto.-var de estado de renderizado condicional para que pase a la siguiente página, APP
    // setIsValidPresupuesto.- funcion que actualiza la var. de estado isValidPresupuesto, APP

    return (
        <header>
            <h1>Planificador de Gastos</h1>
            {/* Validando isValidPresupuesto para que muestre la otra pagina 2º*/}
            { 
                isValidPresupuesto ? (
                    <ControlPresupuesto 
                        gastos={gastos}
                        setGastos={setGastos}
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setIsValidPresupuesto={setIsValidPresupuesto}
                    />
                ) : (
                    <NuevoPresupuesto 
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setIsValidPresupuesto={setIsValidPresupuesto }
                    />
                )
            }
        </header>
    );
}
export default Header;