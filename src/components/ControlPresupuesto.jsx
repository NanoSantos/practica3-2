import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

// 2º página de agregar gasto, pagina que controla los gastos
const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    // gastos.- 
    // setGastos.-
    // presupuesto.- var. de estado que controla el presupuesto al iniciar la app, HEADER
    // setPresupuesto.- funcion para actualizar var. estado al iniciar la app, HEADER
    // setIsValidPresupuesto.-

    // Estados
    const [porcentaje, setPorcentaje] = useState(10);// para mostrar el porcentaje del circulo
    const [disponible, setDisponible] = useState(0);// controla el pintado de totales
    const [gastado, setGastado] = useState(0);

    useEffect( () => {// cada vez que se cambie gastos, se actualiza el total de los gastos
      const totalGastado = gastos.reduce( (total, gasto ) => gasto.cantidad + total, 0);
      const totalDisponible = presupuesto - totalGastado;// ingresado - añadido
      // Calcular el porcentaje gastado
      const nuevoPorcentaje = (( ( presupuesto - totalDisponible ) / presupuesto  ) * 100).toFixed(2);
        setDisponible( totalDisponible );
        setGastado( totalGastado );
        setTimeout(() => {
            setPorcentaje( nuevoPorcentaje );
        }, 1500);
    }, [ gastos ]);

    // Funciones
    const formatearCantidad = cantidad => {// Formatear la cantidad $3.0.0, no muta el state
        return cantidad.toLocaleString('en-US', {// Solo sirve para mostrar en el HTML
            style: 'currency',// No se comunica con nada
            currency: 'USD'
        });
    }
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={ buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={ porcentaje }/* controla el coloreado del circulo */
                    text={`${ porcentaje }% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={ handleResetApp }
                >Resetear App
                </button>
                <p><span>Presupuesto: </span>{ formatearCantidad( presupuesto ) }</p>
                <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                    <span>Disponible: </span>{ formatearCantidad( disponible) } 
                </p>
                <p> <span>Gastado: </span>{ formatearCantidad( gastado ) } </p>
            </div>
        </div>
    );
}
export default ControlPresupuesto;