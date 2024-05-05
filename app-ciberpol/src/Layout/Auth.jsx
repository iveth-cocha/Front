import {Outlet} from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const Auth = () => {
    const autenticado = localStorage.getItem('token')
    return (
        <main >
        {/* <Outlet/> */}
        {autenticado ? <Navigate to='/delegaciones' /> :  <Outlet/>}
        </main>
    )
}

export default Auth