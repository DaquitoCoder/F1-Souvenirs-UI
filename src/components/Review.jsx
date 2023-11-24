const Review = ({ review }) => {
  return (
    <div className='review border border-black rounded-md p-4 w-full'>
      <div className='review-rating'>
        <div className='star-rating'>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type='button'
                key={index}
                className={index <= review.rating ? 'on' : 'off'}
              >
                <span className='star'>&#9733;</span>
              </button>
            );
          })}
        </div>
        <div className='review-user'>
          Usuario de Internet con ID - {review.user._id}
        </div>
        <div className='review-comment'>{review.comment}</div>
      </div>
    </div>
  );
};

export default Review;
