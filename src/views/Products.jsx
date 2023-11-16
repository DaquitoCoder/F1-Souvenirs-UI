import { useEffect, useState } from 'react';
import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import { getAllProducts } from '../hooks/products/products';
import Card from '../components/Card';

const Products = () => {
  const [dataProducts, setDataProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAllProducts();
      setDataProducts(res.data);
    } catch (error) {
      setDataProducts(error.response.data.errors);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-24'>
        <div className='products-title mb-8'>
          <Typography variant='h1'>Todos los productos</Typography>
        </div>
        <div className='products-category-items grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
          {dataProducts && dataProducts.length > 0 ? (
            <>
              {dataProducts.map((product) => (
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

export default Products;
