import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createReview } from '../hooks/products/reviews';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { user, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (rating === 0) {
      alert('Debes calificar el producto');
      return;
    }
    data.rating = rating;
    data.user = user.id;
    data.product = productId;

    try {
      await createReview(data);
      alert('Reseña creada con éxito');
      window.location.reload();
    } catch (error) {
      alert('Error al crear la reseña');
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control border border-black rounded-md p-4'>
          <div className='form-group mb-3 flex flex-col'>
            <label htmlFor='rating'>Calificación:</label>
            <div className='star-rating'>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type='button'
                    key={index}
                    className={index <= (hover || rating) ? 'on' : 'off'}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className='star text-2xl'>&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className='form-group mb-3 flex flex-col gap-4'>
            <label htmlFor='comment'>Comentario:</label>
            <textarea
              id='comment'
              className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 resize-none'
              rows='3'
              cols='4'
              {...register('comment', { required: true })}
            />
            {errors.comment && errors.comment.type === 'required' && (
              <span className='text-red-500'>Este campo es requerido</span>
            )}
          </div>
          <div className='form-group flex flex-col gap-4'>
            <button
              type='submit'
              className='bg-[#B40500] hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:bg-red-800 p-2 text-white
              disabled:bg-gray-300 disabled:cursor-not-allowed'
              disabled={!isAuthenticated}
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
