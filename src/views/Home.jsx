import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Container from '../components/Container';
import Typography from '../components/Typography';
import { IconArrowBadgeRightFilled } from '@tabler/icons-react';
import Hero from '../components/Hero';
import SimplePage from '../components/SimplePage';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { getProductsList } from '../hooks/products/products';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getProductsList();
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <SimplePage>
      <Container className='bg-white pb-4'>
        <Hero />
        {loading && <Loader />}
        {error && <Alert message={error.message} />}

        {data && (
          <>
            {data.map((category) => (
              <div
                className='products-category mx-6 my-6 lg:mx-24'
                key={category._id}
              >
                <div className='products-category-title flex flex-wrap justify-between mb-4'>
                  <Typography variant='h2'>{category.name}</Typography>
                  <Typography variant='h2' className='text-[#FF0000]'>
                    <Link to={`/category/${category._id}`} className='flex'>
                      <div className='text'>Ver Más</div>
                      <div className='icon'>
                        <IconArrowBadgeRightFilled size={32} />
                      </div>
                    </Link>
                  </Typography>
                </div>
                <div className='products-category-items grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
                  {category.products.map((product) => (
                    <Card key={product._id} item={product} storeButtons />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </Container>
    </SimplePage>
  );
};

export default Home;
