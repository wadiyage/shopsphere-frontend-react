import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductListingPage from './pages/ProductListingPage';
import { CartProvider } from './context/CartContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider } from './context/AuthContext';
import { RegisterPage } from './pages/RegisterPage';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import OrdersPage from './pages/OrdersPage';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>

            <Route element={<MainLayout />}>
              <Route path='/' element={<HomePage />} />

              <Route path='/products' element={<ProductListingPage />} />
              <Route path='/product/:id' element={<ProductDetailsPage />} />

              <Route path='/user/cart' element={<CartPage />} />
              <Route path='/user/orders' element={<OrdersPage />} />
            </Route>

            <Route element={<PublicRoute />}>
              <Route element={<AuthLayout />}>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
              </Route>
            </Route>
            
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CartProvider>
      </AuthProvider >
    </BrowserRouter >
  );
}

export default App;
