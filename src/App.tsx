import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductListingPage from './pages/ProductListingPage';
import { CartProvider } from './context/CartContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './pages/LoginPage';

function App() {
  console.log("App rendered")
  return (
    <BrowserRouter>
      <CartProvider>
        <MainLayout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route path='/products' element={<ProductListingPage />} />
            <Route path='/product/:id' element={<ProductDetailsPage />} />
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
        </MainLayout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
