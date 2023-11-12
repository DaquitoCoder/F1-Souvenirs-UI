import { useParams } from 'react-router-dom';
import SimplePage from '../components/SimplePage';
import { getProductById } from '../hooks/products/products';
import { useState, useEffect } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

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
        <Container className='border rounded-md border-gray-400 flex items-center justify-center flex-col md:flex-row mx-8'>
          <div className='card-image p-1.5 bg-gray-400 md:w-1/2 rounded-md'>
            <img src={data.image} alt={data.name} className='rounded-md' />
          </div>
          <div className='card-body w-auto md:w-1/2 p-1.5'>
            <div className='flex justify-around items-center gap-2'>
              <Typography variant='h3' className='text-center'>
                {data.name}
              </Typography>
              <Typography variant='h3' className='text-center text-bold'>
                ${data.price}
              </Typography>
            </div>
            <div className='card-description mx-8 mt-2 text-justify'>{data.description}</div>
            <div className='card-button flex items-center justify-center gap-4 my-4'>
              <Button
                variant='danger'
                className='text-white px-6 h-12 uppercase tracking-wider'
              >
                Comprar ahora
              </Button>
              <Button
                variant='light'
                className='border border-gray-500 px-6 h-12 uppercase tracking-wider'
              >
                Añadir al carrito
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SimplePage>
  );
};

export default Product;
