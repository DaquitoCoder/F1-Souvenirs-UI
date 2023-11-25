import { useParams } from 'react-router-dom';
import { getProductById } from '../hooks/products/products';
import { getReviews } from '../hooks/products/reviews';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import SimplePage from '../components/SimplePage';
import Button from '../components/Button';
import IconCart from '../assets/IconCart';
import IconNoCart from '../assets/IconNoCart';
import Typography from '../components/Typography';
import ReviewForm from '../components/ReviewForm';
import Review from '../components/Review';

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);

  const { removeFromCart, addToCart, checkProductInCart } = useCart();

  const isProductInCart = checkProductInCart(data);

  const fetchData = async () => {
    const res = await getProductById(id);
    setData(res.data);
    const reviews = await getReviews(id);
    setReviews(reviews.data);
  };

  const getCalification = () => {
    let calification = 0;
    reviews.forEach((review) => {
      calification += review.rating;
    });
    calification = calification / reviews.length;
    return calification;
  };

  const stars = Array.from(
    { length: Math.round(getCalification()) },
    (_, index) => (
      <span key={index} className='star'>
        &#9733;
      </span>
    )
  );

  const handleBuy = () => {
    alert('Compra realizada con éxito');
    window.location.href = '/';
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-12'>
        <div className='border rounded-md border-gray-400 flex items-center justify-center flex-col mx-24 w-[calc(100%-6rem)]'>
          <div className='card-image p-1.5 h-max rounded-md flex justify-center'>
            <img
              src={data.image}
              alt={data.name}
              className='rounded-md mx-2 border object-cover w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-[400px] max-h-[400px]'
            />
          </div>
          <div className='card-body flex flex-col lg:w-1/2 p-1.5'>
            <div className='flex flex-col gap-2'>
              <Typography variant='h3' className='text-center'>
                {data.name}
              </Typography>
              <Typography variant='p' className='text-center'>
                Calificaciones: {getCalification() > 0 ? stars : '☆☆☆☆☆'}
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
                className='text-white px-6 h-12 uppercase tracking-wider w-full justify-center items-center'
                onClick={handleBuy}
              >
                Comprar ahora
              </Button>

              <Button
                type='button'
                variant={isProductInCart ? 'danger' : 'light'}
                className={`border w-full border-gray-500 px-6 uppercase h-full tracking-wider justify-center ${
                  isProductInCart ? 'bg-red-700 text-white' : ''
                }`}
                icon={
                  !isProductInCart ? (
                    <IconCart size={24} />
                  ) : (
                    <IconNoCart size={24} />
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
        <div className='reviews mt-4 mx-24 w-[calc(100%-6rem)]'>
          <div className='reviews-title'>
            <Typography variant='h3' className='text-left mb-2'>
              Haz una reseña
            </Typography>
          </div>
          <div className='review-form mb-4'>
            <ReviewForm productId={id} />
          </div>
          <div className='reviews'>
            <Typography variant='h3' className='text-left mb-2'>
              Todas las reseñas
            </Typography>
            {reviews && reviews.length > 0 ? (
              <div className='reviews-card flex flex-col gap-4'>
                {reviews.map((review) => (
                  <Review key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <div className='border border-black rounded-md p-4'>
                <Typography variant='p' className='text-center'>
                  No hay reseñas
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default Product;
