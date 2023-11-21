import Container from './components/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Product from './views/Product';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes';
import Profile from './views/Profile';
import Logout from './views/Logout';
import EditProfile from './views/EditProfile';
import Products from './views/Products';
import MyProducts from './views/MyProducts';
import ProductForm from './views/ProductForm';
import Checkout from './views/Checkout';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/products' element={<Products />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/category/:id' element={<h1 className='text-white'>Category</h1>} />
              <Route path='/checkout' element={<Checkout />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/profile/*'>
                  <Route path='' element={<Profile />} />
                  <Route path='new-product' element={<ProductForm />} />
                  <Route path='edit-product/:id' element={<ProductForm />} />
                  <Route path='edit-profile' element={<EditProfile />} />
                  <Route path='my-products' element={<MyProducts />} />
                </Route>
              </Route>
              <Route
                path='*'
                element={
                  <h1 className='text-black bg-white text-2xl text-center'>
                    Not Found
                  </h1>
                }
              />
            </Routes>
          </BrowserRouter>
        </Container>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
