import React, {useState} from 'react';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import databd from "./Database/db.json"

function Crud() {

  const dataP = databd

  const [data, setData] = useState(dataP);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [PSeleccionado, setPSeleccionado] = useState({
    id: '',
    nombre: '',
    precio: '',
    cantidad: ''
  });

  const seleccionarP=(elemento, caso)=>{
setPSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setPSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(producto=>{
      if(producto.id===PSeleccionado.id){
        producto.precio=PSeleccionado.precio;
        producto.nombre=PSeleccionado.nombre;
        producto.cantidad=PSeleccionado.cantidad;
      }
      return(producto)
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(producto=>producto.id!==PSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    //setPSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=PSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>PRODUCTOS</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Agregar nuevo producto</button>
    <br /><br />
      <table className="table table-bordered"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>precio</th>
            <th>Cantidad</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.precio}</td>
              <td>{elemento.cantidad}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarP(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarP(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
          </div>
        </ModalHeader> 
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={PSeleccionado && PSeleccionado.id}
            />
            <br />

            <label>Producto</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={PSeleccionado && PSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              defaultValue={PSeleccionado && PSeleccionado.precio}
              onChange={handleChange}
              />
            <br />

            <label>Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              defaultValue={PSeleccionado && PSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el producto seleccionado? {PSeleccionado & PSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              defaultValue={data[data.length-1].id+1}
            />
            <br />

            <label>Producto</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              defaultValue={PSeleccionado ? PSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="number"
              name="precio"
              defaultValue={PSeleccionado ? PSeleccionado.precio: ''}
              onChange={handleChange}
              />
              <br />

            <label>Cantidad</label>
            <input
              className="form-control"
              type="number"
              name="cantidad"
              defaultValue={PSeleccionado ? PSeleccionado.cantidad: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Agregar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Crud;