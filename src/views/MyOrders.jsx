import { getOrders } from '../hooks/products/orders';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import SimplePage from '../components/SimplePage';
import Typography from '../components/Typography';
import dayjs from 'dayjs';

const MyOrders = () => {
  const { user } = useAuth();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrders(user.id);
        setData(res.data);
      } catch (error) {
        setData([error.response.data.message]);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <SimplePage>
      <div className='bg-white flex flex-col items-center justify-center py-8'>
        <div className='orders-title mb-6'>
          <Typography variant='h1'>Mis ordenes</Typography>
        </div>
        <div className='orders-cards'>
          {data && data.length > 0 ? (
            <>
              {data.map((order) => (
                <div
                  className='order-card border border-radius rounded-md p-4 mb-4 flex flex-col gap-4 w-[calc(100vw-4rem)] md:w-[calc(100vw-24rem)]'
                  key={order._id}
                >
                  <div className='order-card-title'>
                    <Typography variant='h2'>Orden</Typography>
                    <Typography variant='p'>{String(order._id)}</Typography>
                    <Typography variant='p' className='text-left'>
                      Fecha de compra:{' '}
                      {dayjs(order.createdAt)
                        .locale('es')
                        .format('DD/MM/YYYY, hh:mm A')}
                    </Typography>
                  </div>
                  <div className='order-card-body'>
                    <Typography variant='h3' className='text-center mb-4'>
                      Productos
                    </Typography>
                    <div className='order-card-body-products'>
                      <table className='table-auto w-full border border-black text-center'>
                        <thead className='border border-black'>
                          <tr>
                            <th className='border border-black'>Nombre</th>
                            <th className='border border-black'>Precio</th>
                            <th className='border border-black'>Cantidad</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((product) => (
                            <tr key={product._id}>
                              <td className='border border-black'>
                                {product.product.name}
                              </td>
                              <td className='border border-black'>
                                ${product.product.price}
                              </td>
                              <td className='border border-black'>
                                {product.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='order-card-footer'>
                    <Typography variant='h3'>
                      Total: ${order.totalAmount}
                    </Typography>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Typography variant='h3' className='text-center my-4'>
              No tienes ordenes en este momento.
            </Typography>
          )}
        </div>
      </div>
    </SimplePage>
  );
};

export default MyOrders;
