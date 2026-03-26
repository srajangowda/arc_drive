import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, ArrowRight, PackageOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderPlaced() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful order
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen"></div>
      
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] relative">
          <div className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-20"></div>
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Order Confirmed</h1>
        <p className="text-xl text-gray-400 mb-8">
          Thank you for securing your future with ARC Drive.
        </p>

        <div className="glass-panel p-8 rounded-xl mb-10 text-left">
          <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Order Details</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex gap-3">
              <PackageOpen className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-300">Fast Fulfillment</p>
                <p className="text-sm">Your secure hardware will ship within 24 hours.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-300">Onboarding Protocol sent to email</p>
                <p className="text-sm">Please review the setup documentation to pair your device.</p>
              </div>
            </li>
          </ul>
        </div>

        <Link to="/" className="btn-secondary inline-flex items-center gap-2 px-8 py-3">
          Return to Mission Control <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
