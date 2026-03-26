import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cyber-black py-12 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <img src="/logo.jpeg" alt="ARC Drive Logo" className="w-6 h-6 rounded" />
                <span className="font-heading font-bold text-xl text-white tracking-widest">ARC<span className="text-gray-500">DRIVE</span></span>
                <span className="text-xs text-gray-600 ml-2">by Quantex</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-cyber-neon transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-cyber-neon transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-cyber-neon transition-colors">Documentation</a>
                <a href="#" className="hover:text-cyber-neon transition-colors">Contact</a>
            </div>

            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Quantex Security. All rights reserved.</p>
        </div>
    </footer>
  );
}
