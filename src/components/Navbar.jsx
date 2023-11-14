import { useState } from 'react';
import Button from './Button';
import Typography from './Typography';
import { Link } from 'react-router-dom';
import CartModal from './CartModal';
import { IconMenu2, IconMenuDeep } from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { cartQuantity } = useCart();

  return (
    <>
      <nav
        className='relative flex w-full flex-nowrap items-center justify-between bg-slate-900 py-2 text-white shadow-lg 
      lg:flex-wrap lg:justify-start lg:py-4'
        data-te-navbar-ref
      >
        <div className='flex w-full flex-wrap items-center justify-between lg:mx-24 mx-6'>
          <div className=''>
            <Typography variant='h2'>
              <Link to='/'>F1 SOUVENIRS</Link>
            </Typography>
          </div>
          <button
            className='block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden'
            type='button'
            data-te-collapse-init
            data-te-target='#navbarSupportedContent3'
            aria-controls='navbarSupportedContent3'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className='[&>svg]:w-7'>
              {!isOpen ? <IconMenuDeep size={24} /> : <IconMenu2 size={24} />}
            </span>
          </button>
          <div
            className={`!visible mt-2 ${
              isOpen ? 'hidden' : ''
            } flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto`}
            id='navbarSupportedContent3'
            data-te-collapse-item
          >
            <div
              className='list-style-none ms-auto items-center flex flex-col pl-0 lg:mt-1 lg:flex-row'
              data-te-navbar-nav-ref
            >
              <div
                className='mb-4 pl-2 lg:mb-0 lg:me-4 lg:pl-0 lg:pr-1'
                data-te-nav-item-ref
              >
                <Button
                  type='button'
                  variant='link'
                  className='text-white'
                  onClick={openModal}
                >
                  Carrito ({cartQuantity})
                </Button>
              </div>
              {!isAuthenticated ? (
                <>
                  <div
                    className='mb-4 pl-2 lg:mb-0 lg:me-4 lg:pl-0 lg:pr-1'
                    data-te-nav-item-ref
                  >
                    <Button type='button' variant='link' className='text-white'>
                      <Link to='/signup'>Registrarse</Link>
                    </Button>
                  </div>

                  <div
                    className='mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1'
                    data-te-nav-item-ref
                  >
                    <Button
                      type='button'
                      variant='danger'
                      className='text-white px-2 py-2'
                    >
                      <Link to='/login'>Inicio de sesión</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className='mb-4 pl-2 lg:mb-0 lg:me-4 lg:pl-0 lg:pr-1'
                    data-te-nav-item-ref
                  >
                    <Link to='/profile'>Hola, {user && user.firstName}!</Link>
                  </div>
                  <div
                    className='mb-4 pl-2 lg:mb-0 lg:me-4 lg:pl-0 lg:pr-1'
                    data-te-nav-item-ref
                  >
                    <Button
                      type='button'
                      variant='danger'
                      className='text-white px-2 py-2'
                    >
                      <Link to='/logout'>Cerrar sesión</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <CartModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
