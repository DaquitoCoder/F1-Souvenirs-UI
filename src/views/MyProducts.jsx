import { useEffect, useState } from 'react';
import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import { getAllProductsBySeller } from '../hooks/products/products';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import ProductModal from '../components/ProductModal';

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

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProductsBySeller(user.id);
        setDataProducts(res.data);
      } catch (error) {
        setDataProducts(error.response.data.errors);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-24'>
        <div className='products-title mb-8'>
          <Typography variant='h1'>Mis productos</Typography>
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
      <ProductModal
        onClose={closeModal}
        isOpen={isModalOpen}
        product={product}
      />
    </SimplePage>
  );
};

export default MyProducts;
