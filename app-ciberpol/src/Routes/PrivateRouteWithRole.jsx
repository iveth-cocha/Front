import { useContext, useEffect } from 'react';
import NoAccess from '../paginas/NoAccess';
import AuthContext from '../componets/context/AuthProvider';

export default function PrivateRouteWithRole({ children }) {
    const { auth } = useContext(AuthContext);

    // Verificar si la página está bloqueada al cargar la página
    const isBlocked = localStorage.getItem('accessBlocked') === 'true';

    if (isBlocked) {
        // Si el acceso está bloqueado, mostrar la página NoAccess
        return <NoAccess />;
    } else {
        // Permitir el acceso para cualquier otro rol
        return children;
    }
}
