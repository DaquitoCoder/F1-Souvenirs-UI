import { useEffect, useState } from 'react';
import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import { getAllProductsBySeller } from '../hooks/products/products';
import Card from '../components/Card';
import { IconPlus } from '@tabler/icons-react';
import ProductModal from '../components/ProductModal';
import Button from '../components/Button';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

const MyProducts = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});

  const closeModal = () => {
    setProduct({});
    setIsModalOpen(false);
  };

  const openModal = (product) => {
    setProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProductsBySeller();
        setDataProducts(res.data);
      } catch (error) {
        setDataProducts(error.response.data.errors);
      }
    };
    fetchData();
  }, []);

  return (
    <SimplePage>
      <Container className='bg-white pb-4'>
        <div className='products-category mx-6 py-6 lg:mx-24'>
          <div className='products-category-title flex flex-wrap justify-between mb-4'>
            <Typography variant='h1'>Mis productos</Typography>
            <Link to='/profile/new-product' className='flex'>
              <Button
                variant='success'
                icon={<IconPlus size={24} />}
                className='text-white p-2'
              >
                Nuevo producto
              </Button>
            </Link>
          </div>
          <div className='products-category-items grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
            {dataProducts && dataProducts.length > 0 ? (
              <>
                {dataProducts.map((product) => (
                  <Card
                    key={product._id}
                    item={product}
                    editButtons
                    buttonDeleteAction={openModal}
                  />
                ))}
              </>
            ) : (
              <p>No hay productos</p>
            )}
          </div>
        </div>
      </Container>
      <ProductModal
        onClose={closeModal}
        isOpen={isModalOpen}
        product={product}
      />
    </SimplePage>
  );
};

export default MyProducts;
