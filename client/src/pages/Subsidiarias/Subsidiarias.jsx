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
    },
    {
      label: 'Nombre',
      type: 'text',
    },
    {
      label: 'Direccion',
      type: 'text',
    },
    {
      label: 'Telefono',
      type: 'text',
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
