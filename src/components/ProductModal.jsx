import Typography from './Typography';
import { deleteProductById } from '../hooks/products/products';

const truncateText = (text, length) => {
  if (text?.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

const ProductModal = ({ isOpen, onClose, product }) => {
  const deleteProduct = async () => {
    try {
      await deleteProductById(product._id);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className='modal-body'>
                <div className='modal-title mb-4'>
                  <Typography variant='h2' className='text-center'>
                    Borrar producto
                  </Typography>
                </div>
                <div className='modal-content'>
                  <Typography variant='p' className='text-center mb-4'>
                    <strong>
                      ¿Está seguro que desea borrar este producto?
                    </strong>
                    <br />
                    Esta acción no se puede deshacer.
                  </Typography>
                  <Typography variant='p'>
                    <strong>Datos del producto:</strong>
                  </Typography>
                  <Typography variant='p'>
                    <strong>Nombre: </strong>
                    {product.name}
                  </Typography>
                  <Typography variant='p'>
                    <strong>Precio: </strong>${product.price}
                  </Typography>
                  <Typography variant='p'>
                    <strong>Descripción: </strong>
                    {truncateText(product.description, 50)}
                  </Typography>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse gap-2 sm:px-6'>
                <button
                  type='button'
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <button
                  type='button'
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                  onClick={deleteProduct}
                >
                  Borrar producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
