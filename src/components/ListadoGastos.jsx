import React from 'react'
import Gasto from './Gasto'
// Muestra los gastos
const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro,  gastosFiltrados}) => {
    // gastos.- var. de estado que almacen los gastos llenados desde el modal formlario, APP
    // setGastoEditar.- funcion que se encarga de editar la var. de estado editar, APP
    // eliminarGasto.- funcion de eliminar gasto, APP
    // filtro.-
    // gastosFiltrados.-

    return (
        <div className="listado-gastos contenedor">
            { filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta categoría'}</h2>
                        {gastosFiltrados.map( gasto => (
                            <Gasto 
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                        {gastos.map( gasto => (
                            <Gasto 
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                )
            }
        </div>
    );
}

export default ListadoGastos;