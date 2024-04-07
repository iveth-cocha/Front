import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './paginas/Login'





function App() {


  return (

    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
      </Routes>
      </BrowserRouter>
      
      

    
   



    </>
  )
}

export default App
