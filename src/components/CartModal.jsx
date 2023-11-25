import Typography from './Typography';
import { useCart } from '../context/CartContext';
import Button from './Button';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, clearCart, cartTotal, removeFromCart, addToCart } = useCart();

  return (
    <div
      className={`relative z-10 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } inter-events-none`}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      {/* <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
          {/* <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          --> */}
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-screen-lg sm:my-8 sm:w-full sm:max-w-xl'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='flex justify-between items-center'>
                <Typography variant='h2' className='text-center'>
                  Carrito de compras
                </Typography>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-700 focus:outline-none'
                  onClick={onClose}
                >
                  <IconX size={24} />
                </button>
              </div>
              <div className='cart-dashboard text-center py-4 flex flex-row justify-center flex-wrap gap-4'>
                {cart.length === 0 && (
                  <Typography variant='p'>
                    No hay productos agregados.
                  </Typography>
                )}
                {cart.map((item) => (
                  <div
                    className='card flex flex-col justify-around md:flex-row items-center mb-4 w-[calc(100%)]'
                    key={item._id}
                  >
                    <div className='card-image rounded-2xl border border-black'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-cover rounded-2xl h-48 w-48'
                      />
                    </div>
                    <div className='card-text md:w-1/3'>
                      <Typography variant='h3' className='text-center mb-3'>
                        {item.name}
                      </Typography>
                      <Typography variant='p' className='text-center mb-3'>
                        ${item.price}
                      </Typography>
                    </div>
                    <div className='card-buttons flex flex-row items-center gap-2'>
                      <Button
                        type='button'
                        variant='light'
                        className='p-0.5 border border-black h-[32px] w-[32px] justify-center'
                        onClick={() => addToCart(item)}
                        icon={<IconPlus size={24} />}
                      />
                      Cantidad: {item.quantity}
                      <Button
                        type='button'
                        variant='light'
                        className='p-0.5 border border-black h-[32px] w-[32px] justify-center'
                        onClick={() => removeFromCart(item)}
                        icon={<IconMinus size={24} />}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6'>
              <Typography variant='h2' className='text-center'>
                Total: ${cartTotal.toFixed(2)}
              </Typography>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <Link to='/checkout'>
                <Button
                  type='button'
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                >
                  Ir al Checkout
                </Button>
              </Link>
              <Button
                type='button'
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                onClick={clearCart}
              >
                Limpiar carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
