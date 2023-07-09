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
  const [validacion, setValidacion] = useState({});
  const reqFieldsEdit = columns
    .filter((column) => column.requiredEdit)
    .map((column) => column.label);
  const reqFieldsCreate = columns
    .filter((column) => column.requiredCreate)
    .map((column) => column.label);

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
    for (const field in reqFieldsCreate) {
      if (e.target[field].value === '') {
        setValidacion({ ...validacion, [field]: true });
        return;
      }
    }
    createHandler(e.target);
    abrirCerrarModalInsertar();
  };

  const editarSubmit = (e) => {
    e.preventDefault();
    for (const field in reqFieldsEdit) {
      if (e.target[field].value === '') {
        setValidacion({ ...validacion, [field]: true });
        return;
      }
    }
    editHandler(e.target);
    abrirCerrarModalEditar();
  };

  const blurHandler = (e) => {
    const { name, value, id } = e.target;
    const req = id.includes('create') ? reqFieldsCreate : reqFieldsEdit;
    if (value === '' && req.includes(name)) {
      setValidacion({ ...validacion, [name]: true });
    } else {
      setValidacion({ ...validacion, [name]: false });
    }
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
                  <Input
                    type="select"
                    operation="create"
                    name={elemento.label}
                    id={`create_${elemento.label}`}
                    invalid={validacion[elemento.label]}
                    onBlur={(e) => blurHandler(e)}>
                    <option value="" disabled selected="selected">
                      Seleccione una opción
                    </option>
                    {elemento.options.map((opcion) => {
                      return <option value={opcion.value}>{opcion.label}</option>;
                    })}
                  </Input>
                ) : (
                  <Input
                    className="form-control"
                    type={elemento.type}
                    name={elemento.label}
                    id={`create_${elemento.label}`}
                    invalid={validacion[elemento.label]}
                    onBlur={(e) => blurHandler(e)}
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
                <Input
                  type="select"
                  name={elemento.label}
                  id={`edit_${elemento.label}`}
                  invalid={validacion[elemento.label]}
                  onBlur={(e) => blurHandler(e)}>
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
                <Input
                  className="form-control"
                  type={elemento.type}
                  operation="edit"
                  name={elemento.label}
                  id={`edit_${elemento.label}`}
                  defaultValue={elemento.private ? '' : dataSeleccionada[elemento.label]}
                  disabled={elemento.label === 'Id_Subsidiaria' || elemento.label === 'Id_Empleado'}
                  invalid={validacion[elemento.label]}
                  onBlur={(e) => blurHandler(e)}
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
