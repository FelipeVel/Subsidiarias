import axios from 'axios';

import TableComp from '../../components/Table/Table';
import './Subsidiarias.scss';
import { useEffect, useState } from 'react';

const Subsidiarias = () => {
  const [subsidiarias, setSubsidiarias] = useState([]);
  const columns = [
    {
      label: 'Id_Subsidiaria',
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
      label: 'Direccion',
      type: 'text',
      requiredCreate: true,
      requiredEdit: true,
    },
    {
      label: 'Telefono',
      type: 'text',
      requiredCreate: true,
      requiredEdit: true,
    },
  ];
  useEffect(() => {
    fetchSubsidiarias();
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

  const createHandler = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/subsidiaria`,
        {
          nombre: values.Nombre.value,
          direccion: values.Direccion.value,
          telefono: values.Telefono.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        fetchSubsidiarias();
      })
      .catch((err) => {
        console.log(err);
        window.alert('No se pudo registrar la subsidiaria: ' + err.response.data.error.message);
      });
  };

  const editHandler = (values) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/subsidiaria/${values.Id_Subsidiaria.value}`,
        {
          nombre: values.Nombre.value,
          direccion: values.Direccion.value,
          telefono: values.Telefono.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        fetchSubsidiarias();
      })
      .catch((err) => {
        console.log(err);
        window.alert('No se pudo editar la subsidiaria: ' + err.response.data.error.message);
      });
  };

  const deleteHandler = (values) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/subsidiaria/${values.Id_Subsidiaria}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        fetchSubsidiarias();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.name === 'RequestError') {
          window.alert('No se puede eliminar una subsidiaria con empleados asignados');
        } else {
          window.alert('No se pudo eliminar la subsidiaria: ' + err.response.data.error.message);
        }
      });
  };

  return (
    <div className="subsidiarias">
      <TableComp
        data={subsidiarias}
        createHandler={createHandler}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        columns={columns}
      />
    </div>
  );
};

export default Subsidiarias;
