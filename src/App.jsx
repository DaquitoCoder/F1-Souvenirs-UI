import Container from './components/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Product from './views/Product';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/logout' element={<h1>Logout</h1>} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/cart' element={<h1>Cart</h1>} />
              <Route path='/product/:id' element={<Product />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/profile' element={<h1>User</h1>} />
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
