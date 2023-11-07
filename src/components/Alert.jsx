const Alert = ({ message }) => {
  return (
    <div className='text-center py-4 lg:px-4'>
      <div
        className='p-2 bg-red-700 items-center text-white leading-none lg:rounded-full flex lg:inline-flex'
        role='alert'
      >
        <span className='font-semibold text-left flex-auto'>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
