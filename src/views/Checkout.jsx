import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../hooks/products/orders';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const Checkout = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const { user, isAuthenticated } = useAuth();

  const handleBuy = async () => {
    const products = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const request = {
      user: user.id,
      items: products,
      totalAmount: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    try {
      await createOrder(request);
      alert('Compra realizada con éxito!');
      localStorage.removeItem('cart');
      window.location.href = '/profile/my-orders';
    } catch (error) {
      console.log(error);
    }
  };

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
            ))
          ) : (
            <Typography variant='h2' className='text-center mb-4'>
              No hay productos agregados.
            </Typography>
          )}

          <div className='total-checkout'>
            <Typography variant='h2'>
              Total: $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
            <Button
              variant='success'
              className='w-full mt-4 px-2 justify-center items-center text-white py-2 disabled:bg-gray-400 disabled:text-gray-900 disabled:border-gray-900 disabled:cursor-not-allowed disabled:border'
              disabled={cart.length === 0 || !isAuthenticated}
              onClick={handleBuy}
            >
              Comprar
            </Button>
          </div>
          {!isAuthenticated && (
            <div className='checkout-commentary'>
              <Typography variant='p' className='text-center mt-2'>
                Recuerda estar logeado para comprar productos.
              </Typography>
            </div>
          )}
        </div>
      </div>
    </SimplePage>
  );
};

export default Checkout;
