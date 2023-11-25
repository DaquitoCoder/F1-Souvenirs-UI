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
        <div className='review-user whitespace-break-spaces'>
          {review.user.firstName + ' ' + review.user.lastName}
        </div>
        <div className='review-comment whitespace-pre-wrap'>{review.comment}</div>
      </div>
    </div>
  );
};

export default Review;
