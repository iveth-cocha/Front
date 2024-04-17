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







function App() {


  return (

    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path='Registrar' element={<Registrar />} />
         


        <Route path='/Delegaciones' element={<Panel />}>
          <Route index element={<Delegaciones />} />
          <Route path='NuevaDelegacion' element={<AgregarDelegacion />} />
          <Route path='DetalleDelegacion' element={<DetalleDelegacion />}/>
          <Route path='ActualizarDelegacion' element={<ActualizarDelegacion />}/>


          <Route path='DelitosyTipificaciones' element={<TipDelitos/>} />

          <Route path='Mapeo' element={<Mapeo/>} />
          

          <Route path='RegistroUsuario' element={<Registro />} />
          <Route path='Usuarios' element={<Usuarios />} />
          
          
         
          {/*
            <Route path='listar' element={<Listar />} />
          */}
           
          
        </Route>



      </Routes>
      </BrowserRouter>
      
      

    
   



    </>
  )
}

export default App
