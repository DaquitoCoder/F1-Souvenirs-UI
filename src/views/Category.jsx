import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../hooks/products/products';
import { useEffect, useState } from 'react';

const Category = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await getCategoryById(id);
        setData(category.data);
      } catch (error) {
        setData(error.response.data);
      }
    };
    getCategory();
  }, [id]);

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-24'>
        <div className='products-title mb-8'>
          <Typography variant='h1'>{data && data.name}</Typography>
        </div>
        {data.message && (
          <div className='products-title mb-8'>
            <Typography variant='h1'>{data.message}</Typography>
          </div>
        )}
        <div className='products-category-items grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-4 md:mx-24'>
          {data.products && data.products.length > 0 ? (
            <>
              {data.products.map((product) => (
                <Card key={product._id} item={product} storeButtons />
              ))}
            </>
          ) : (
            <p>No hay productos</p>
          )}
        </div>
      </div>
    </SimplePage>
  );
};

export default Category;
