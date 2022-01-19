import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId, formatearFecha } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  // Estado, PRINCIPAL VECTOR
  const [gastos, setGastos] = useState(// Guarda todos los gastos de formulario
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [presupuesto, setPresupuesto] = useState(// control del presupuesto
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState( false );// renderizado condicional para que pase a la siguiente página
  const [modal, setModal] = useState( false );// Ventana modal al dar clic en boton
  const [animarModal, setAnimarModal] = useState( false );// animar el modal
  const [gastoEditar, setGastoEditar] = useState({});// para editar
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // Use effect
  useEffect(() => {// Al deslizar a la izquierda, llenar el formulario
    if( Object.keys( gastoEditar ).length > 0 ) {
        setModal( true );// mostrar modal con el formulario del gasto
        setTimeout(() => {
          setAnimarModal( true );
        }, 500);
    }
  }, [ gastoEditar ]);// cuando cambia el gastoEditar, por lo menos se ejecuta una vez solución: IF
  useEffect(() => {// almacenar cuando cambia el presupuesto
    localStorage.setItem( 'presupuesto', presupuesto ?? 0 );
  }, [presupuesto]);
  useEffect(() => {// 
    localStorage.setItem( 'gastos', JSON.stringify( gastos ) ?? [] );
  }, [gastos]);
  useEffect(() => {
    if( filtro ) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );
      setGastosFiltrados( gastosFiltrados );
    }
  }, [ filtro ]);
  useEffect(() => {
    const presupuestoLS = Number( localStorage.getItem('presupuesto') ) ?? 0;
    if( presupuestoLS > 0 ) {
      setIsValidPresupuesto( true );
    }
  }, []);
  
  // Funciones
  const handleNuevoGasto = () => {// Muestre la ventana modal al dar clic en el boton +
    setModal( true );// muestra el modal
    setGastoEditar( {} );// resetear el objeto de editar.
    setTimeout(() => {
      setAnimarModal( true );// despues de 500ms aparece el modal del formulario pagina2
    }, 500);
  }
  const guardarGasto = gasto => {// Agrega gasto a gastos
    if( gasto.id ) {// Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos( gastosActualizados );// actualizar gastos
      setGastoEditar( {} );// limpiar el objeto de editar
    } else {// Nuevo Gasto
      gasto.id = generarId();// Agregar un ID al gasto
      gasto.fecha = Date.now();// Agregar una fecha al gasto
      setGastos( [ ...gastos, gasto ]) ;// Agregar gasto a gastos
    }
    setAnimarModal( false );// anima el modal
    setTimeout(() => {
      setModal( false );// cerrar el modal
    }, 500);
  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
    setGastos( gastosActualizados );
  }

  return (
      <div className={ modal ? 'fijar' : '' }>{/* cuando aparece el scroll, mueve al inicio */}
        <Header 
          gastos={gastos} setGastos={setGastos}
          presupuesto={presupuesto} setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto}
        />
        { isValidPresupuesto && (/* para que muestre el boton en la 2º pagina */
          <>
            <main>
              <Filtros  filtro={ filtro } setFiltro={ setFiltro } />
              <ListadoGastos 
                gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}
                filtro={filtro} gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img src={ IconoNuevoGasto } alt="nuevo gasto" onClick={ handleNuevoGasto } />
            </div>
          </>
        )}
        {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal} setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}
                  />
        }
      </div>
  );
}
export default App;