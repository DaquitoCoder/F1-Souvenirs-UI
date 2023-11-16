import Button from './Button';
import { IconPlus } from '@tabler/icons-react';
import Typography from './Typography';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

import IconCart from '../assets/IconCart';
import IconNoCart from '../assets/IconNoCart';

const Card = ({ item, storeButtons, className }) => {
  const { removeFromCart, addToCart, checkProductInCart } = useCart();

  const isProductInCart = checkProductInCart(item);

  return (
    <div
      className={`flex justify-around lg:justify-between sm:flex-row lg:flex-col font-sans items-center rounded-2xl border border-black ${className}`}
    >
      <div className='card-header flex gap-2 flex-col justify-evenly items-center md:h-full'>
        <div className='card-image mx-2 my-2 flex justify-center items-center text-center max-w-[200px] max-h-[150px] overflow-hidden'>
          <img
            src={item.image ? item.image : `https://via.placeholder.com/250`}
            alt={item.name}
            className='w-25 rounded-lg object-cover'
          />
        </div>
        <div className='card-body flex flex-col justify-center w-2/3'>
          <div className='card-title w-fit m-auto'>
            <Typography variant='p' className='text-center whitespace-pre-wrap'>
              {item.name}
            </Typography>
          </div>
          <div className='card-price w-fit m-auto'>
            <Typography variant='p' className='text-center'>
              ${item.price}
            </Typography>
          </div>
        </div>
      </div>
      <div className='card-buttons flex flex-col lg:flex-row gap-2 m-2'>
        {storeButtons && (
          <>
            <Button
              type='button'
              variant={isProductInCart ? 'danger' : 'light'}
              className={`p-1 w-full flex flex-col lg:flex-row justify-center items-center text-md border border-black ${
                isProductInCart ? 'bg-red-500 text-white' : ''
              }`}
              icon={
                !isProductInCart ? (
                  <IconCart size={24} />
                ) : (
                  <IconNoCart size={24} />
                )
              }
              onClick={() => {
                isProductInCart ? removeFromCart(item) : addToCart(item);
              }}
            >
              {isProductInCart ? 'Quitar del carrito' : 'Agregar al carrito'}
            </Button>
            <Link to={'/product/' + item._id} className='flex justify-center'>
              <Button
                type='button'
                variant='light'
                className='p-1 w-full flex flex-col justify-between items-center text-md border border-black'
                icon={<IconPlus size={24} />}
              >
                Ver más
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
