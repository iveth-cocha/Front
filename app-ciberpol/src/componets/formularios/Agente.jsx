import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Agente = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({})
  const [form, setForm] = useState({
    Grado: "",
    Apellido_Nombre: "",
    Cedula: "",
    PaseDNTH: "",
    Funcion: "",
    Novedad: "",
    Detalle: "",
    Documento: "",
    Titulo: "",
    IdiomaExtranjero: "",
    Licencia: "",
    Residencia: "",
    Estado_Civil: "",
    FechaNacimiento: "",
    Genero: "",
    Telefono: "",
    Email: "",
    NombresFamiliar: "",
    Parentesco: "",
    TelefonoFamiliar: "",
    Terno: null,
    Camisa: null,
    Calzado: null,
    Cabeza: null
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "Email" ? value.toLowerCase() : value.toUpperCase();
    setForm({ ...form, [name]: formattedValue });
  };

const [openDialog, setOpenDialog] = useState(false);
const handleSubmit = async(e) => { 
  e.preventDefault()
  try {
      const token = localStorage.getItem('token')
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro/agente`
      const formData = {
        ...form,
        Terno: form.Terno !== null && form.Terno !== '' ? parseInt(form.Terno) : null,
        Camisa: form.Camisa !== null && form.Camisa !== '' ? parseInt(form.Camisa) : null,
        Calzado: form.Calzado !== null && form.Calzado !== '' ? parseInt(form.Calzado) : null,
        Cabeza: form.Cabeza !== null && form.Cabeza !== '' ? parseInt(form.Cabeza) : null,
      };
      const options={
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
      }
      await axios.post(url,formData,options)
      console.log('DESPUES:', formData);
setMensaje({ respuesta:"Agente añadido a la Lista", tipo: true })
setOpenDialog(true);
setTimeout(() => {
  setOpenDialog(false);
          navigate(`/agentes`)

      }, 3000);
      
  } catch (error) {
setMensaje({respuesta: error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.msg,
  tipo: false})

setOpenDialog(true);
setTimeout(() => {
  setOpenDialog(false);
      }, 3000);
  }
}

const handleCloseDialog = () => {
  setOpenDialog(false);
}; 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline mb-5'>Información Personal</h1>
          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres</label>
            <input
              type="text"
              name="Apellido_Nombre"
              value={form.Apellido_Nombre}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Grado</label>
            <input
              type="text"
              name="Grado"
              value={form.Grado}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cédula</label>
            <input
              type="text"
              name="Cedula"
              value={form.Cedula}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Título</label>
            <input
              type="text"
              name="Titulo"
              value={form.Titulo}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Idioma Extranjero</label>
            <input
              type="text"
              name="IdiomaExtranjero"
              value={form.IdiomaExtranjero}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha Nacimiento</label>
            <input
              type="date"
              name="FechaNacimiento"
              value={form.FechaNacimiento}
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Género</label>
            <input
              type="text"
              name="Genero"
              value={form.Genero}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Estado Civil</label>
            <input
              type="text"
              name="Estado_Civil"
              value={form.Estado_Civil}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Email</label>
            <input
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Teléfono</label>
            <input
              type="text"
              name="Telefono"
              value={form.Telefono}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Licencia</label>
            <input
              type="text"
              name="Licencia"
              value={form.Licencia}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Residencia</label>
            <input
              type="text"
              name="Residencia"
              value={form.Residencia}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
        </div>
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline mb-5'>Información de Contacto</h1>
          <div className='flex mb-3'>
            <label className='mr-7'>Nombres Familiar</label>
            <input
              type="text"
              name="NombresFamiliar"
              value={form.NombresFamiliar}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Parentesco</label>
            <input
              type="text"
              name="Parentesco"
              value={form.Parentesco}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Teléfono Familiar</label>
            <input
              type="text"
              name="TelefonoFamiliar"
              value={form.TelefonoFamiliar}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
        </div>
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline mb-5'>Otros</h1>
          <div className='flex mb-3'>
            <label className='mr-7'>PaseDNTH</label>
            <input
              type="text"
              name="PaseDNTH"
              value={form.PaseDNTH}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Función</label>
            <input
              type="text"
              name="Funcion"
              value={form.Funcion}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Novedad</label>
            <input
              type="text"
              name="Novedad"
              value={form.Novedad}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Detalle</label>
            <input
              type="text"
              name="Detalle"
              value={form.Detalle}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Documento</label>
            <input
              type="text"
              name="Documento"
              value={form.Documento}
              onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Terno</label>
            <input
              type="number"
              name="Terno"
              value={form.Terno}
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Camisa</label>
            <input
              type="number"
              name="Camisa"
              value={form.Camisa}
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Calzado</label>
            <input
              type="number"
              name="Calzado"
              value={form.Calzado}
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cabeza</label>
            <input
              type="number"
              name="Cabeza"
              value={form.Cabeza}
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
        </div>
        <div className="mx-8">
          <button className="py-2 w-full block text-center bg-sky-950 text-gray-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-950 hover:text-white" type="submit">
            Agregar Agente
          </button>
        </div>
      </form>
      <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    
>
    
    <DialogContent>
        <DialogContentText id="alert-dialog-description" tipo={mensaje.tipo}>
            {mensaje.respuesta}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus>
            Ok
        </Button>
    </DialogActions>
</Dialog>
      
    </div>
  )
}

export default Agente