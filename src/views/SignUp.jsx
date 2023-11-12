import { Link, useNavigate } from 'react-router-dom';
import SimplePage from '../components/SimplePage';
import Alert from '../components/Alert';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const passwordValidation = {
    required: 'La contraseña es obligatoria',
    minLength: {
      value: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
    },
  };

  const navigate = useNavigate();
  const { isAuthenticated, signup, errors: serverErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      type: 'Admin',
    };

    signup(newUser);
  };

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-24'>
        {serverErrors.length > 0 && <Alert message={serverErrors[0]} />}
        <div className='login-card mx-4 min-w-fit border px-4 pt-2 pb-4 border-black rounded-xl bg-gray-300 w-[400px]'>
          <div className='login-card-title flex gap-2 flex-col sm:flex-row justify-around items-center mb-4'>
            <Link to={'/login'}>Inicio de sesión</Link>
            <p className='border border-black p-2 rounded-md bg-white'>
              Registrarse
            </p>
          </div>
          <div className='login-card-body flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                <div className='row'>
                  <label htmlFor='firstName'>Nombre</label>
                  <input
                    {...register('firstName', {
                      required: 'El nombre es obligatorio',
                    })}
                    type='text'
                    name='firstName'
                    id='firstName'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    placeholder='Ingresa tu nombre'
                  />
                  {errors.firstName && (
                    <p className='text-red-800 text-center'>
                      {errors.firstName.message?.toString()}
                    </p>
                  )}
                </div>
                <div className='row'>
                  <label htmlFor='lastName'>Apellido</label>
                  <input
                    {...register('lastName', {
                      required: 'El apellido es obligatorio',
                    })}
                    type='text'
                    name='lastName'
                    id='lastName'
                    className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    placeholder='Ingresa tu apellido'
                  />
                  {errors.lastName && (
                    <p className='text-red-800 text-center'>
                      {errors.lastName.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className='form-group mb-6'>
                <label htmlFor='email'>Correo electrónico</label>
                <input
                  {...register('email', {
                    required: 'El correo electrónico es obligatorio',
                  })}
                  type='email'
                  id='email'
                  name='email'
                  autoComplete='email'
                  className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Ingresa tu correo electrónico'
                />
                {errors.email && (
                  <p className='text-red-800 text-center'>
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
              <div className='form-group mb-6'>
                <label htmlFor='password'>Contraseña</label>
                <input
                  {...register('password', passwordValidation)}
                  type='password'
                  name='password'
                  id='password'
                  className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Ingresa tu contraseña'
                />
                {errors.password && (
                  <p className='text-red-800 text-center'>
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>
              <div className='form-group mb-6'>
                <label htmlFor='confirmPassword'>Confirma la contraseña</label>
                <input
                  {...register('confirmPassword', {
                    ...passwordValidation,
                    validate: (value) =>
                      value === getValues('password') ||
                      'Las contraseñas no coinciden',
                  })}
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Ingresa tu contraseña'
                />
                {errors.confirmPassword && (
                  <p className='text-red-800 text-center'>
                    {errors.confirmPassword.message?.toString()}
                  </p>
                )}
              </div>
              <div className='form-buttons flex items-center justify-around gap-4 flex-col sm:flex-row'>
                <input
                  type='submit'
                  value='Registrarse'
                  className='bg-[#B40500] hover:bg-red-700 py-2 px-4 rounded-xl text-white'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default SignUp;
