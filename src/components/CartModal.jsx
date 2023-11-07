import Typography from './Typography';
import { useCart } from '../context/CartContext';
import Button from './Button';
import { IconMinus, IconPlus } from '@tabler/icons-react';
// import Card from './Card';

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
              <Typography variant='h2' className='text-center'>
                Carrito de compras
              </Typography>
              <div className='cart-dashboard text-center py-4 flex flex-row justify-center flex-wrap gap-4'>
                {cart.length === 0 && (
                  <Typography variant='p'>
                    No hay productos agregados.
                  </Typography>
                )}
                {cart.map((item) => (
                  <div
                    className='card-row text-center flex flex-row justify-center items-center border-b border-black max-w-[400px]'
                    key={item._id}
                  >
                    <div className='card-image m-2 text-center max-w-[150px] max-h-[150px]'>
                      <img
                        src={
                          item.image
                            ? item.image
                            : `https://via.placeholder.com/250`
                        }
                        alt={item.name}
                        className='w-25 rounded-lg object-cover'
                      />
                    </div>
                    <div className='card-text'>
                      <Typography variant='p' className='text-center mx-2'>
                        {item.name}
                      </Typography>
                      <Typography variant='p' className='text-center'>
                        ${item.price}
                      </Typography>
                    </div>
                    <div className='card-buttons flex justify-center items-center gap-2'>
                      <Button
                        type='button'
                        variant='light'
                        className='p-0.5 border border-black'
                        onClick={() => addToCart(item)}
                        icon={<IconPlus size={24} />}
                      />
                      Cantidad: {item.quantity}
                      <Button
                        type='button'
                        variant='light'
                        className='p-0.5 border border-black'
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
                Total: ${cartTotal}
              </Typography>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                onClick={onClose}
              >
                Cerrar carrito
              </button>
              <button
                type='button'
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                onClick={clearCart}
              >
                Limpiar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
