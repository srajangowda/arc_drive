import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Purchase from './pages/Purchase';
import Cart from './pages/Cart';
import OrderPlaced from './pages/OrderPlaced';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <CartProvider>
          <div className="flex flex-col min-h-screen transition-colors duration-500">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-placed" element={<OrderPlaced />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
