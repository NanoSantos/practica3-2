import React from 'react'
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css";

import { formatearFecha } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

// Objeto de los iconos, para mostrar por c/categoria una imagen dependiendo de la categoría
const diccionarioIconos = {
    ahorro : IconoAhorro,
    comida : IconoComida,
    casa : IconoCasa,
    gastos : IconoGastos,
    ocio : IconoOcio,
    salud : IconoSalud,
    suscripciones : IconoSuscripciones
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
    // gasto.- var. del recorrido de gastos, tiene valor de cada gasto, LISTADOGASTOS
    // setGastoEditar.- funcion que se encarga de editar la var. de estado editar, LISTADOGASTOS
    // eliminarGasto.- funcion de eliminar gasto, LISTADOGasto

    // ============================================= desestructurar el gasto de gastos
    const { categoria, nombre, cantidad, id, fecha } = gasto;

    // ============================================= Funciones
    const leadingActions = () => (// parte izquierda,(para mostrar un componente)
        <LeadingActions>{/* parte izquierda */}
            {/* action a realizar, llenar dicha variable */}
            <SwipeAction onClick={ () => setGastoEditar( gasto ) }>
                Editar
            </SwipeAction>
        </LeadingActions>
    );
    const trailingActions = () => (// parte derecha
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto( id )}
                destructive={ true }
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );
    return (
        <SwipeableList>
            <SwipeableListItem leadingActions={ leadingActions() } trailingActions={ trailingActions() } >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img  src={ diccionarioIconos[categoria] } alt="Icono Gasto" />
                        <div className="descripcion-gasto">
                            <p className="categoria">{ categoria }</p>
                            <p className="nombre-gasto">{ nombre }</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{ formatearFecha( fecha ) }</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${ cantidad }</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
export default Gasto;