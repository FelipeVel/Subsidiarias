import Table from '../../components/Table/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Empleados.scss';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  console.log(empleados);
  const [subsidiarias, setSubsidiarias] = useState([]);
  const [roles, setRoles] = useState([]);
  const columns = [
    {
      label: 'Id_Empleado',
      type: 'text',
      requiredCreate: false,
      requiredEdit: true,
    },
    {
      label: 'Nombre',
      type: 'text',
      requiredCreate: true,
      requiredEdit: true,
    },
    {
      label: 'Apellido',
      type: 'text',
      requiredCreate: true,
      requiredEdit: true,
    },
    {
      label: 'Usuario',
      type: 'text',
      requiredCreate: true,
      requiredEdit: true,
    },
    {
      label: 'Subsidiaria',
      type: 'select',
      options: subsidiarias.map((subsidiaria) => ({
        label: subsidiaria.Nombre,
        value: subsidiaria.Id_Subsidiaria,
      })),
      requiredCreate: true,
      requiredEdit: true,
    },
    {
      label: 'Rol',
      type: 'select',
      options: roles.map((rol) => ({
        label: rol.Nombre,
        value: rol.Id_Rol,
      })),
      requiredCreate: true,
      requiredEdit: true,
    },
    {
      label: 'Contrasena',
      type: 'password',
      private: true,
      requiredCreate: true,
      requiredEdit: false,
    },
  ];

  useEffect(() => {
    fetchEmpleados();
    fetchSubsidiarias();
    fetchRoles();
  }, []);

  const fetchSubsidiarias = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/subsidiaria`)
      .then((response) => {
        setSubsidiarias(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRoles = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rol`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEmpleados = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/empleado`)
      .then((response) => {
        setEmpleados(
          response.data.map((empleado) => ({
            ...empleado,
            Subsidiaria: empleado.Subsidiaria.Nombre,
            RolData: empleado.Rol,
            Rol: empleado.Rol.Nombre,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createHandler = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/empleado`,
        {
          nombre: values.Nombre.value,
          apellido: values.Apellido.value,
          usuario: values.Usuario.value,
          contrasena: values.Contrasena.value,
          rol: values.Rol.value,
          subsidiaria: values.Subsidiaria.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        fetchEmpleados();
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.error.message ?? err.response.data.error);
      });
  };

  const editHandler = (values) => {
    const usuario = {
      nombre: values.Nombre.value,
      apellido: values.Apellido.value,
      idSubsidiaria: values.Subsidiaria.value,
    };
    if (values.Contrasena.value) {
      usuario.contrasena = values.Contrasena.value;
    }
    axios
      .put(`${process.env.REACT_APP_API_URL}/empleado/${values.Id_Empleado.value}`, usuario, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        fetchEmpleados();
      })
      .catch((err) => {
        console.log('Error:', err);
        window.alert(
          `${err.response.data.status}: ${
            err.response.data.error.message
              ? err.response.data.error.message
              : err.response.data.error
          }`
        );
      });
  };

  const deleteHandler = (elemento) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/empleado/${elemento.Id_Empleado}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        fetchEmpleados();
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.error);
      });
  };

  return (
    <div className="Empleados">
      <div className="Empleados-Container">
        <div className="Empleados-Table">
          <Table
            title="Empleados"
            data={empleados}
            createHandler={createHandler}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default Empleados;
