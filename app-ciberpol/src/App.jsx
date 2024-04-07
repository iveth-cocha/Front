import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './paginas/Login'
import Panel from './Layout/Panel'
import Delegaciones from './paginas/Delegaciones'





function App() {


  return (

    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />

        <Route path='/Delegaciones' element={<Panel />}>
          <Route index element={<Delegaciones />} />
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
