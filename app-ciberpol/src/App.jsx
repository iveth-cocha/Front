import './App.css'
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
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
import NoFound from './paginas/NoFound'
import Auth from './Layout/Auth'
import Forgot from './paginas/Forgot'
import Restablecer from './paginas/Restablecer'
import { AuthProvider } from './componets/context/AuthProvider'
import { PrivateRoute } from './Routes/PrivateRoute'
import Newpassword from './paginas/Newpassword'








function App() {


  return (

    <>
      <BrowserRouter>
      <AuthProvider>  
          <Routes>

            {/* <Route index element={<Login/>} />
              <Route path='Registrar' element={<Registrar />} />
              <Route path='confirmar' element={<Confirmar />} />  
              <Route path='/*' element={<NoFound />} />  */}

            <Route path='/' element={<Auth />}>
              <Route index element={<Navigate to="login" />} />
              <Route path='login' element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='actualizar-contrasena/:token' element={<Newpassword />} />
              <Route path="forgot" element={<Forgot />} />
              <Route path="recuperar-password/:token" element={<Restablecer />}
              />
              <Route path='*' element={<NoFound />} />

            </Route>

            <Route path="delegaciones/*" element={
              <PrivateRoute>
              <Routes>
                <Route element={ <Panel />}>
                  <Route index element={<Delegaciones />} />
                  <Route path='nuevaDelegacion' element={<AgregarDelegacion />} />
                  <Route path='detalleDelegacion' element={<DetalleDelegacion />} />
                  <Route path='actualizarDelegacion' element={<ActualizarDelegacion />} />                 
                </Route>
              </Routes>
            </PrivateRoute>
            }/>


           
            
            {/* <Route path="delegaciones/*" element={<Panel />}>
              <Route index element={<Delegaciones />} />
              <Route path='nuevaDelegacion' element={<AgregarDelegacion />} />
              <Route path='detalleDelegacion' element={<DetalleDelegacion />} />
              <Route path='actualizarDelegacion' element={<ActualizarDelegacion />} />
            </Route> */}

            <Route path='delitosyTipificaciones' element={<Panel />}>
              <Route index element={<TipDelitos />} />
            </Route>

            <Route path='mapeo' element={<Panel />}>
              <Route index element={<Mapeo />} />
              <Route path='detalleMapeo' element={<DetalleMapeo />} />
            </Route>

            <Route path='registroUsuario' element={<Panel />}>
              <Route index element={<Registro />} />
            </Route>

            <Route path='usuarios' element={<Panel />}>
              <Route index element={<Usuarios />} />
            </Route>

           

            




          </Routes>

      </AuthProvider>
      
    </BrowserRouter>
      
      

    
   



    </>
  )
}

export default App
