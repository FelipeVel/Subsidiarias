import React, { useCallback, useState } from 'react';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Form,
  Input,
} from 'reactstrap';
import './Table.scss';

const TableComp = ({ data, createHandler, editHandler, deleteHandler, columns }) => {
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [dataSeleccionada, setDataSeleccionada] = useState({});

  const abrirCerrarModalInsertar = useCallback(() => {
    setModalInsertar(!modalInsertar);
  }, [modalInsertar]);

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const crear = useCallback(() => {
    abrirCerrarModalInsertar();
  }, [abrirCerrarModalInsertar]);

  const crearSubmit = (e) => {
    e.preventDefault();
    createHandler(e.target);
    abrirCerrarModalInsertar();
  };

  const editarSubmit = (e) => {
    e.preventDefault();
    editHandler(e.target);
    abrirCerrarModalEditar();
  };

  const ModalCrear = (
    <Modal isOpen={modalInsertar}>
      <ModalHeader>
        <div>
          <h3>Insertar</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <Form onSubmit={crearSubmit}>
          {columns.map((elemento) => {
            if (elemento.label === 'Id_Subsidiaria' || elemento.label === 'Id_Empleado') {
              return null;
            }
            return (
              <FormGroup>
                <label>{elemento.label}:</label>
                {elemento.options ? (
                  <Input type="select" name={elemento.label} id={elemento.label}>
                    <option value="" disabled selected="selected">
                      Seleccione una opción
                    </option>
                    {elemento.options.map((opcion) => {
                      return <option value={opcion.value}>{opcion.label}</option>;
                    })}
                  </Input>
                ) : (
                  <input
                    className="form-control"
                    type={elemento.type}
                    name={elemento.label}
                    id={elemento.label}
                  />
                )}
              </FormGroup>
            );
          })}
          <Button color="primary" type="submit">
            Insertar
          </Button>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );

  console.log('columns', columns);

  const ModalModificar = (
    <Modal isOpen={modalEditar}>
      <ModalHeader>
        <div>
          <h3>Editar</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <Form onSubmit={editarSubmit}>
          {columns.map((elemento) => (
            <FormGroup>
              <label>{elemento.label}:</label>
              {elemento.options ? (
                <Input type="select" name={elemento.label} id={elemento.label}>
                  <option value="" disabled selected="selected">
                    Seleccione una opción
                  </option>
                  {elemento.options.map((opcion) => (
                    <option
                      value={opcion.value}
                      selected={
                        dataSeleccionada[elemento.label] === opcion.label ? 'selected' : false
                      }>
                      {opcion.label}
                    </option>
                  ))}
                </Input>
              ) : (
                <input
                  className="form-control"
                  type={elemento.type}
                  name={elemento.label}
                  id={elemento.label}
                  defaultValue={elemento.private ? '' : dataSeleccionada[elemento.label]}
                  disabled={elemento.label === 'Id_Subsidiaria' || elemento.label === 'Id_Empleado'}
                />
              )}
            </FormGroup>
          ))}
          <Button color="primary" type="submit">
            Actualizar
          </Button>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );

  const editarHandler = (elemento) => {
    setDataSeleccionada(elemento);
    abrirCerrarModalEditar();
  };

  const eliminarHandler = (elemento) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('¿Estas seguro de eliminar el registro?')) return;
    setDataSeleccionada(elemento);
    deleteHandler(elemento);
  };

  return (
    <div className="Table">
      <Container>
        <br />
        <Button color="success" onClick={() => crear()}>
          Crear
        </Button>
        <br />
        <br />
        <Table className="table table-bordered">
          <thead>
            <tr>
              {columns.map((elemento) => (elemento.private ? null : <th>{elemento.label}</th>))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elemento) => (
              <tr>
                {columns.map((tag) => (tag.private ? null : <td>{elemento[tag.label]}</td>))}
                <td>
                  <Button color="primary" onClick={() => editarHandler(elemento)}>
                    Editar
                  </Button>{' '}
                  <Button color="danger" onClick={() => eliminarHandler(elemento)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {ModalCrear}
      {ModalModificar}
    </div>
  );
};

export default TableComp;
