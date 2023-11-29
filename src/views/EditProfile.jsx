import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import SimplePage from '../components/SimplePage';
import { useAuth } from '../context/AuthContext';
import { editUserDataRequest } from '../hooks/user/auth';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordValidation = {
    required: 'La contraseña es obligatoria',
    minLength: {
      value: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
    },
  };

  const { user } = useAuth();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const timer = setTimeout(() => {
        setData([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const onSubmit = async (data) => {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      newPassword: data.newPassword,
      password: data.password,
      type: user.type,
      _id: user._id,
    };
    try {
      const res = await editUserDataRequest(newUser);
      setData([...res.data.message, 'Se te dirigirá al login en 5 segundos']);

      const timer = setTimeout(() => {
        navigate('/logout');
      }, 5000);
      return () => clearTimeout(timer);
    } catch (error) {
      setData([error.response.data.message]);
    }
  };

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-24'>
        {data.length > 0 && <Alert message={data} />}
        <div className='login-card mx-4 min-w-fit border px-4 pt-2 pb-4 border-black rounded-xl bg-gray-300 w-[calc(100vw-2rem)] max-w-[400px]'>
          <div className='login-card-title flex gap-2 flex-col sm:flex-row justify-around items-center mb-4'>
            <p className='border border-black p-2 rounded-md bg-white'>
              Editar perfil
            </p>
          </div>
          <div className='login-card-body flex flex-col justify-center items-center'>
            <form autoComplete='off'>
              <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                  <label htmlFor='firstName'>Nombre:</label>
                  <input
                    {...register('firstName', {
                      required: true,
                      value: user.firstName,
                    })}
                    type='text'
                    id='firstName'
                    name='firstName'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    placeholder='Nombre'
                    required
                  />
                  {errors.firstName && (
                    <p className='text-red-800 text-center'>
                      {errors.firstName.message?.toString()}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label htmlFor='lastName'>Apellido:</label>
                  <input
                    {...register('lastName', {
                      required: true,
                      value: user.lastName,
                    })}
                    type='text'
                    id='lastName'
                    name='lastName'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    placeholder='Apellido'
                    required
                  />
                  {errors.lastName && (
                    <p className='text-red-800 text-center'>
                      {errors.lastName.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className='form-group w:full mb-6 flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                  <label htmlFor='email'>Correo electrónico:</label>
                  <input
                    {...register('email', {
                      required: true,
                      value: user.email,
                    })}
                    type='email'
                    id='email'
                    name='email'
                    autoComplete='email'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    placeholder='Correo electrónico'
                    required
                  />
                  {errors.email && (
                    <p className='text-red-800 text-center'>
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                  <label htmlFor='newPassword'>Contraseña: </label>
                  <input
                    {...register('newPassword', passwordValidation)}
                    type='password'
                    id='newPassword'
                    name='newPassword'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    placeholder='Contraseña'
                    required
                  />
                  {errors.newPassword && (
                    <p className='text-red-800 text-center'>
                      {errors.newPassword.message?.toString()}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label htmlFor='confirmPassword'>Confirmar contraseña:</label>
                  <input
                    {...register('confirmPassword', {
                      ...passwordValidation,
                      validate: (value) =>
                        value === getValues('newPassword') ||
                        'Las contraseñas no coinciden',
                    })}
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    placeholder='Confirmar contraseña'
                    required
                  />
                  {errors.confirmPassword && (
                    <p className='text-red-800 text-center'>
                      {errors.confirmPassword.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                  <label htmlFor='password'>
                    Contraseña actual para confirmar cambios:
                  </label>
                  <input
                    {...register('password', { ...passwordValidation })}
                    type='password'
                    id='password'
                    name='password'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    placeholder='Confirmar contraseña actual'
                    required
                  />
                  {errors.password && (
                    <p className='text-red-800 text-center'>
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className='form-buttons flex flex-col md:flex-row gap-2'>
                <Button
                  variant='danger'
                  className='w-full px-2 py-4 justify-center text-white'
                  onClick={handleSubmit(onSubmit)}
                >
                  Guardar cambios
                </Button>
                <Link to={'/profile'} className='w-full'>
                  <Button
                    variant='light'
                    className='w-full px-2 py-4 text-black border border-gray-400 justify-center'
                  >
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default EditProfile;
