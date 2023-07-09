import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TableComp from './Table';

describe('Table', () => {
  const data = [
    {
      Id_Subsidiaria: 1,
      Nombre: 'Subsidiaria 1',
      Direccion: 'Direccion 1',
      Telefono: 'Telefono 1',
    },
    {
      Id_Subsidiaria: 2,
      Nombre: 'Subsidiaria 2',
      Direccion: 'Direccion 2',
      Telefono: 'Telefono 2',
    },
  ];
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
  const createHandler = jest.fn();
  const editHandler = jest.fn();
  const deleteHandler = jest.fn();
  const props = {
    data,
    columns,
    createHandler,
    editHandler,
    deleteHandler,
  };
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<TableComp {...props} />);
  });
  it('should render the table', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('should render the table headers', () => {
    expect(screen.getByText('Id_Subsidiaria')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Direccion')).toBeInTheDocument();
    expect(screen.getByText('Telefono')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });
  it('should render the table rows', () => {
    expect(screen.getByText('Subsidiaria 1')).toBeInTheDocument();
    expect(screen.getByText('Direccion 1')).toBeInTheDocument();
    expect(screen.getByText('Telefono 1')).toBeInTheDocument();
    expect(screen.getByText('Subsidiaria 2')).toBeInTheDocument();
    expect(screen.getByText('Direccion 2')).toBeInTheDocument();
    expect(screen.getByText('Telefono 2')).toBeInTheDocument();
  });
  it('should render the create button', () => {
    expect(screen.getByText('Crear')).toBeInTheDocument();
  });
  it('should render the edit button', () => {
    expect(screen.getAllByText('Editar')[0]).toBeInTheDocument();
  });
  it('should render the delete button', () => {
    expect(screen.getAllByText('Eliminar')[0]).toBeInTheDocument();
  });
});
