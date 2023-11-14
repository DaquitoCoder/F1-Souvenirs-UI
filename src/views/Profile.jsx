import SimplePage from '../components/SimplePage';
import { IconUserCircle } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-12'>
        <div className='border rounded-md border-gray-400 flex items-center justify-center md:justify-around flex-col lg:flex-row mx-24 w-[calc(100%-6rem)] gap-4'>
          <div className='login-icon w-fit p-2 text-center rounded-full border border-black bg-white'>
            <IconUserCircle size='128px' />
          </div>
          <div className='card-body'>
            <div className='card-body-title mb-2'>
              <Typography variant='h2' className='text-center'>
                ¡Bienvenido {user.firstName}!
              </Typography>
            </div>
            <div className='card-body-subtitle mb-4'>
              <Typography variant='h3' className='text-center'>
                {user.type === 'Admin'
                  ? 'Datos del administrador'
                  : 'Datos del usuario'}
              </Typography>
            </div>
            <div className='card-body-content mb-4'>
              <Typography variant='body1' className='text-center'>
                <strong>Nombre: </strong>
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <br />
              <Typography variant='body1' className='text-center'>
                <strong>Correo electrónico: </strong>
                {user.email}
              </Typography>
            </div>
            <div className='card-body-buttons flex flex-col md:flex-row gap-2 mb-4'>
              <Link to='/edit-profile' className='w-full'>
                <Button
                  variant='danger'
                  className='w-full px-2 py-4 text-white justify-center'
                >
                  Editar perfil
                </Button>
              </Link>
              <Link to='/my-products' className='w-full'>
                <Button
                  variant='light'
                  className='w-full px-2 py-4 text-black border border-gray-300 justify-center'
                >
                  Ver mis productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default Profile;
