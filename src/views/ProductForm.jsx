import { useParams } from 'react-router-dom';
import SimplePage from '../components/SimplePage';
import Container from '../components/Container';
import Typography from '../components/Typography';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import {
  getProductById,
  getAllCategories,
  editProduct,
  addProduct,
} from '../hooks/products/products';
import Alert from '../components/Alert';

const ProductForm = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const timer = setTimeout(() => {
        setData([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductById(id);
        const categories = await getAllCategories();
        setCategories(categories.data);
        setProduct(res.data);
        setValue('name', res.data.name);
        setValue('description', res.data.description);
        setValue('price', res.data.price);
        setValue('image', res.data.image);
        setValue('category', res.data.category);
      } catch (error) {
        setProduct(error.response.data.errors);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (id) {
      // Edit product
      const newData = {
        ...data,
        _id: id,
      };
      try {
        await editProduct(newData);
        setData(['Producto editado correctamente']);
      } catch (error) {
        setData(error.response.data.errors);
      }
    } else {
      // Add product
      try {
        await addProduct(data);
        setData(['Producto agregado correctamente']);
        reset();
      } catch (error) {
        setData(error.response.data.errors);
      }
    }
  };

  return (
    <SimplePage>
      <Container className='bg-white pb-4'>
        <div className='product-form flex flex-col justify-center items-center'>
          <div className='title items-center justify-center py-8'>
            <Typography variant='h1' className='text-center'>
              {id ? 'Editar producto' : 'Nuevo producto'}
            </Typography>
          </div>
          {data && data.length > 0 && (
            <Alert message={data[0]} variant='success' />
          )}
          <div className='product-form-card mx-4 min-w-fit border px-4 pt-2 pb-4 border-black rounded-xl bg-gray-300 w-[calc(100vw-2rem)] max-w-[400px]'>
            <div className='product-form-card-body flex flex-col justify-center items-center'>
              <form autoComplete='off'>
                <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                  <div className='w-full'>
                    <label htmlFor='name'>Nombre:</label>
                    <input
                      {...register('name', {
                        required: true,
                        value: product && product.name,
                      })}
                      type='text'
                      id='name'
                      name='name'
                      className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      placeholder='Nombre'
                      required
                    />
                    {errors.name && (
                      <p className='text-red-800 text-center'>
                        {errors.name.message?.toString()}
                        {errors.name.type === 'required' &&
                          'El nombre es requerido'}
                      </p>
                    )}
                  </div>
                </div>
                <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                  <div className='w-full'>
                    <label htmlFor='description'>Descripción:</label>
                    <textarea
                      {...register('description', {
                        required: true,
                        value: product.description,
                      })}
                      type='text'
                      id='description'
                      name='description'
                      className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      placeholder='Descripción'
                      required
                    />
                    {errors.description && (
                      <p className='text-red-800 text-center'>
                        {errors.description.message?.toString()}
                        {errors.description.type === 'required' &&
                          'La descripción es requerida'}
                      </p>
                    )}
                  </div>
                </div>
                <div className='form-group w:full mb-6 flex flex-col md:flex-row gap-4'>
                  <div className='w-full'>
                    <label htmlFor='price'>Precio:</label>
                    <input
                      {...register('price', {
                        required: true,
                        value: product.price,
                      })}
                      type='number'
                      id='price'
                      name='price'
                      className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      placeholder='Precio'
                      required
                    />
                    {errors.price && (
                      <p className='text-red-800 text-center'>
                        {errors.price.message?.toString()}
                        {errors.price.type === 'required' &&
                          'El precio es requerido'}
                      </p>
                    )}
                  </div>
                  <div className='w-full'>
                    <label htmlFor='image'>URL de la imagen: </label>
                    <input
                      {...register('image', {
                        required: true,
                        value: product.image,
                      })}
                      type='text'
                      id='image'
                      name='image'
                      className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      placeholder='URL de la imagen'
                      required
                    />
                    {errors.image && (
                      <p className='text-red-800 text-center'>
                        {errors.image.message?.toString()}
                        {errors.image.type === 'required' &&
                          'La imagen es requerida'}
                      </p>
                    )}
                  </div>
                </div>
                <div className='form-group mb-6 flex flex-col md:flex-row gap-4'>
                  <div className='w-full'>
                    <label htmlFor='category'>Categoría:</label>
                    <select
                      className='bg-gray-50 border border-black text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      {...register('category', {
                        required: true,
                        value: id ? product.category : '',
                        validate: (value) =>
                          value !== '' || 'Selecciona una categoría',
                      })}
                    >
                      <option value=''>Selecciona una categoría</option>
                      {categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className='text-red-800 text-center'>
                        {errors.category.message?.toString()}
                        {errors.category.type === 'required' &&
                          'Selecciona una categoría válida'}
                      </p>
                    )}
                  </div>
                </div>
                <div className='form-buttons flex flex-col md:flex-row gap-2'>
                  <Button
                    variant='danger'
                    className='w-full px-2 py-4 justify-center text-white'
                    onClick={handleSubmit(onSubmit)}
                  >
                    {id ? 'Editar producto' : 'Agregar producto'}
                  </Button>
                  <Link to={'/profile/my-products'} className='w-full'>
                    <Button
                      variant='light'
                      className='w-full px-2 py-4 text-black border border-gray-400 justify-center'
                    >
                      Atrás
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </SimplePage>
  );
};

export default ProductForm;
