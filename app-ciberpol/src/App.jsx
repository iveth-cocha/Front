import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './paginas/Login'
import Panel from './Layout/Panel'
import Delegaciones from './paginas/Delegaciones'
import AgregarDelegacion from './paginas/AgregarDelegacion'
import Registrar from './paginas/Registrar'
import Registro from './paginas/Registro'
import Usuarios from './paginas/Usuarios'
import TipDelitos from './paginas/TipDelitos'
import DetalleDelegacion from './paginas/DetalleDelegacion'
import ActualizarDelegacion from './paginas/ActualizarDelegacion'
import Mapeo from './paginas/Mapeo'
import DetalleMapeo from './paginas/DetalleMapeo'
import Confirmar from './paginas/Confirmar'







function App() {


  return (

    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path='Registrar' element={<Registrar />} />
        <Route path='confirmar' element={<Confirmar />} />        
         


        <Route path="Delegaciones/*" element={<Panel />}>
          <Route index element={<Delegaciones />} />
          <Route path='NuevaDelegacion' element={<AgregarDelegacion />} />
          <Route path='DetalleDelegacion' element={<DetalleDelegacion />}/>
          <Route path='ActualizarDelegacion' element={<ActualizarDelegacion />}/>
          {/*
            <Route path='listar' element={<Listar />} />
          */}
  
        </Route>

        <Route path='DelitosyTipificaciones'  element={<Panel />}>
          <Route index element={<TipDelitos/>} />
        </Route>

        <Route path='Mapeo'  element={<Panel />}>
          <Route index element={<Mapeo/>} />
          <Route path='DetalleMapeo' element={<DetalleMapeo />}/>
        </Route>

        <Route path='RegistroUsuario'  element={<Panel />}>
          <Route index element={<Registro/>} />
        </Route>

        <Route path='Usuarios'  element={<Panel />}>
          <Route index element={<Usuarios/>} />
        </Route>

        
        
        
      </Routes>
    </BrowserRouter>
      
      

    
   



    </>
  )
}

export default App
