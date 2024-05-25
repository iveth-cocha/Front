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
import AddDelitos from './paginas/AddDelitos'
import ActualizarUser from './paginas/ActualizarUser'
import Agentes from './paginas/Agentes'
import AddAgente from './paginas/AddAgente'
import PrivateRouteWithRole from './Routes/PrivateRouteWithRole'








function App() {


  return (

    <>
      <BrowserRouter>
      <AuthProvider>  
          <Routes>

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
                  <Route path='nuevaDelegacion' element={<PrivateRouteWithRole>
                                                          <AgregarDelegacion />
                                                        </PrivateRouteWithRole>}/>
                  <Route path='detalleDelegacion/:id' element={<DetalleDelegacion />} />
                  <Route path='actualizarDelegacion/:id' element={<PrivateRouteWithRole>
                                                                    <ActualizarDelegacion />
                                                                  </PrivateRouteWithRole>} />                 
                </Route>
              </Routes>
            </PrivateRoute>
            }/>

            <Route path='delitos' element={<Panel />}>
              <Route index element={<TipDelitos />} />
              <Route path='agregarDelito' element={<AddDelitos />} />
            </Route>

            <Route path='mapeo' element={<Panel />}>
              <Route index element={<Mapeo />} />
              <Route path='detalleMapeo' element={<DetalleMapeo />} />
            </Route>

             <Route path='usuarios' element={<Panel />}>
              <Route index element={<Usuarios />} />
              <Route path='nuevoUsuario' element={<Registro />} />
              <Route path='actualizarUsuario/:id' element={<ActualizarUser />} /> 
            </Route>

            <Route path='agentes' element={<Panel />}>
              <Route index element={<Agentes />} />
              <Route path='nuevoAgente' element={<AddAgente />} />
              
            </Route>

           

            




          </Routes>

      </AuthProvider>
      
    </BrowserRouter>
      
      

    
   



    </>
  )
}

export default App
