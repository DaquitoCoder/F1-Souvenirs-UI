import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const Checkout = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleBuy = () => {
    alert('Compra realizada con éxito');
    window.location.href = '/';
    localStorage.removeItem('cart');
  }

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-24'>
        <div className='title mb-4'>
          <Typography variant='h1'>Checkout</Typography>
        </div>

        <div className='checkout border rounded-lg p-4 border-black w-[calc(100vw-4rem)] md:w-[calc(100vw-24rem)]'>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div
                className='card flex flex-col justify-around md:flex-row items-center mb-4 w-[calc(100%)]'
                key={item.id}
              >
                <div className='card-image rounded-2xl border border-black'>
                  <img
                    src={item.image}
                    className='object-cover rounded-2xl h-48 w-48'
                  />
                </div>
                <div className='card-text md:w-1/3'>
                  <Typography variant='h3' className='text-center mb-3'>{item.name}</Typography>
                  <Typography variant='p' className='text-center mb-3'>${item.price}</Typography>
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
            ))
          ) : (
            <Typography variant='p'>No hay productos agregados.</Typography>
          )}

          <div className='total-checkout'>
            <Typography variant='h2'>
              Total: $
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </Typography>

            <Button
              variant='success'
              className='w-full mt-4 px-2 justify-center items-center text-white py-2'
              onClick={handleBuy}
            >
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default Checkout;
