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
              <Route path='/cart' element={<h1>Cart</h1>} />
              <Route path='/product/:id' element={<Product />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/edit-profile' element={<EditProfile />} />
                <Route path='/my-products' element={<h1>My Products</h1>} />
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
