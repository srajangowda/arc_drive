import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real app this would call Stripe or a payment gateway
    navigate('/order-placed');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="w-24 h-24 text-gray-700 mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Secure your data with ARC Drive today.</p>
          <Link to="/purchase" className="btn-primary inline-flex items-center gap-2">
            Get ARC Drive <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">Secure Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="glass-panel p-4 rounded-xl flex items-center gap-6">
                <div className="w-20 h-20 bg-cyber-dark rounded-lg flex items-center justify-center border border-white/5 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyber-neon/5"></div>
                    <div className="w-6 h-12 bg-black rounded border border-white/20"></div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-cyber-neon font-medium">₹{item.price}</p>
                </div>
                
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="flex items-center gap-3 bg-cyber-dark border border-white/10 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded">-</button>
                    <span className="w-4 text-center text-white text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-cyber-alert text-sm flex items-center gap-1 transition-colors">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="glass-panel p-6 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-cyber-neon">Free</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/10 pb-4">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-white font-bold text-xl pt-2">
                  <span>Total</span>
                  <span>₹{getCartTotal()}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-cyber-neon text-black font-bold text-lg rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] flex justify-center items-center gap-2 mb-4"
              >
                <CreditCard className="w-5 h-5" /> Proceed to Secure Payment
              </button>
              
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-cyber-dark/50 p-3 rounded border border-white/5">
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <p>256-bit AES encrypted checkout. Your payment information is never stored on our servers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
