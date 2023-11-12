import { useParams } from 'react-router-dom';
import SimplePage from '../components/SimplePage';
import { getProductById } from '../hooks/products/products';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { IconShoppingCart, IconShoppingCartOff } from '@tabler/icons-react';
import Typography from '../components/Typography';
import { useCart } from '../context/CartContext';

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

  const { removeFromCart, addToCart, checkProductInCart } = useCart();

  const isProductInCart = checkProductInCart(data);

  const fetchData = async () => {
    const res = await getProductById(id);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-12'>
        <div className='border rounded-md border-gray-400 flex items-center justify-center flex-col lg:flex-row mx-24 w-[calc(100%-6rem)]'>
          <div className='card-image p-1.5 md:w-1/2 h-max rounded-md'>
            <img
              src={data.image}
              alt={data.name}
              className='rounded-md mx-auto'
            />
          </div>
          <div className='card-body lg:w-1/2 p-1.5'>
            <div className='flex flex-col gap-2'>
              <Typography variant='h3' className='text-center'>
                {data.name}
              </Typography>
              <Typography variant='p' className='text-center'>
                Calificaciones: ☆☆☆☆☆
              </Typography>
              <Typography variant='p' className='text-center'>
                <strong>${data.price}</strong>
              </Typography>
            </div>
            <div className='card-description mx-4 md:mx-8 mt-2 text-justify'>
              {data.description}
            </div>
            <div className='card-button flex flex-col md:flex-row items-center justify-center gap-4 my-4'>
              <Button
                variant='danger'
                className='text-white px-6 h-12 uppercase tracking-wider'
              >
                Comprar ahora
              </Button>

              <Button
                type='button'
                variant={isProductInCart ? 'danger' : 'light'}
                className={`border border-gray-500 px-6 h-12 uppercase tracking-wider ${
                  isProductInCart ? 'bg-red-700 text-white' : ''
                }`}
                icon={
                  !isProductInCart ? (
                    <IconShoppingCart size={24} />
                  ) : (
                    <IconShoppingCartOff size={24} />
                  )
                }
                onClick={() => {
                  isProductInCart ? removeFromCart(data) : addToCart(data);
                }}
              >
                {isProductInCart ? 'Quitar del carrito' : 'Agregar al carrito'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default Product;
