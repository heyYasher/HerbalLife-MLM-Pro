import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { Star, ShoppingCart, Info, Plus, ArrowLeft, CheckCircle, Truck, CreditCard, Wallet, MapPin } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product, onAdd: (p: Product) => void, onClick: (p: Product) => void }> = ({ product, onAdd, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-herbal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          PV: {product.pv}
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-herbal-600 font-semibold uppercase tracking-wide mb-1">{product.category}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate" title={product.name}>{product.name}</h3>
        <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
            ))}
            <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
            <div>
                <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-xs text-gray-500 block">BV: {product.bv}</span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                className="bg-herbal-600 hover:bg-herbal-700 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                aria-label="Add to Cart"
            >
                <Plus size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export const ProductDetail: React.FC<{ product: Product, onAdd: (p: Product) => void, onBack: () => void }> = ({ product, onAdd, onBack }) => {
  return (
    <div className="bg-white min-h-[calc(100vh-64px)] animate-in fade-in duration-300">
      <div className="container mx-auto px-4 py-8">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-herbal-600 mb-6 font-medium">
          <ArrowLeft size={20} className="mr-2" /> Back to Store
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover max-h-[500px]" />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-herbal-100 text-herbal-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4 self-start">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{product.rating} / 5.0 (124 reviews)</span>
            </div>
            
            <div className="text-3xl font-bold text-gray-900 mb-2">₹{product.price}</div>
            <div className="flex gap-4 mb-8">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">PV: {product.pv}</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold border border-purple-100">BV: {product.bv}</span>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => onAdd(product)}
                className="flex-1 bg-herbal-600 hover:bg-herbal-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-herbal-600/30 transition-all transform hover:-translate-y-1"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 text-gray-600">
                 <CheckCircle className="text-herbal-500" size={20} /> 100% Authentic
               </div>
               <div className="flex items-center gap-3 text-gray-600">
                 <Truck className="text-herbal-500" size={20} /> Free Shipping > ₹999
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutPage: React.FC<{ 
  cart: CartItem[], 
  total: number, 
  onBack: () => void, 
  onPlaceOrder: (details: any) => void 
}> = ({ cart, total, onBack, onPlaceOrder }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', zip: '', phone: '', paymentMethod: 'cod'
  });

  const handleChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder(formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-herbal-600 mb-6 font-medium">
          <ArrowLeft size={20} className="mr-2" /> Back to Cart
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Address Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="text-herbal-600" /> Shipping Address
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required name="name" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" placeholder="John Doe" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input required name="address" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" placeholder="123 Street Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required name="city" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" placeholder="New Delhi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input required name="zip" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" placeholder="110001" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input required name="phone" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" placeholder="+91 9876543210" />
                </div>
              </form>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="text-herbal-600" /> Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-herbal-500 transition-colors">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="w-5 h-5 text-herbal-600 accent-herbal-600" />
                  <div className="flex-1">
                    <span className="font-bold text-gray-800 block">Cash on Delivery</span>
                    <span className="text-sm text-gray-500">Pay when you receive the order</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-herbal-500 transition-colors">
                  <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} className="w-5 h-5 text-herbal-600 accent-herbal-600" />
                  <div className="flex-1">
                    <span className="font-bold text-gray-800 block">UPI / NetBanking</span>
                    <span className="text-sm text-gray-500">Secure payment via Razorpay</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-herbal-500 transition-colors bg-gray-50">
                   <input type="radio" name="paymentMethod" value="wallet" checked={formData.paymentMethod === 'wallet'} onChange={handleChange} className="w-5 h-5 text-herbal-600 accent-herbal-600" disabled />
                   <div className="flex-1">
                     <span className="font-bold text-gray-400 block">Distributor Wallet (Insufficient Balance)</span>
                     <span className="text-sm text-gray-400">Available only for distributors</span>
                   </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x {item.quantity}</span>
                      <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Subtotal</span>
                     <span className="font-medium">₹{total}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Shipping</span>
                     <span className="text-green-600 font-medium">Free</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                     <span>Total</span>
                     <span>₹{total}</span>
                   </div>
                </div>
                <button form="checkout-form" type="submit" className="w-full bg-herbal-600 hover:bg-herbal-700 text-white font-bold py-3 rounded-lg shadow-lg mt-6 transition-colors">
                  Place Order
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutUs = () => (
  <div className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About HerbalLife</h1>
        <div className="w-20 h-1 bg-herbal-500 mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div>
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="About us" className="rounded-2xl shadow-xl" />
         </div>
         <div className="space-y-6 text-lg text-gray-600">
           <p>
             Founded in 2010, HerbalLife has been at the forefront of the Ayurvedic wellness revolution. We believe that nature holds the key to a healthy and balanced life.
           </p>
           <p>
             Our mission is to bring pure, potent, and authentic herbal products to every household. We work directly with farmers to source the highest quality herbs, ensuring that every product you buy is free from harmful chemicals and additives.
           </p>
           <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-4 bg-herbal-50 rounded-lg border border-herbal-100">
                <h3 className="font-bold text-herbal-800 text-2xl mb-1">50k+</h3>
                <p className="text-sm">Happy Customers</p>
              </div>
              <div className="p-4 bg-herbal-50 rounded-lg border border-herbal-100">
                <h3 className="font-bold text-herbal-800 text-2xl mb-1">500+</h3>
                <p className="text-sm">Distributors</p>
              </div>
           </div>
         </div>
      </div>
    </div>
  </div>
);

export const ContactUs = () => (
  <div className="bg-gray-50 py-16 min-h-[80vh]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mt-2">We'd love to hear from you. Send us a message!</p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-herbal-700 p-10 text-white md:w-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <MapPin className="mt-1" />
                 <p>123 Herbal Park, Green Valley,<br/>Dehradun, India 248001</p>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-5"><span className="text-xl">📞</span></div>
                 <p>+91 98765 43210</p>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-5"><span className="text-xl">✉️</span></div>
                 <p>support@herballife.com</p>
               </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-herbal-200 text-sm">Follow us on social media for updates and offers.</p>
          </div>
        </div>
        
        <div className="p-10 md:w-2/3">
           <form className="space-y-6">
             <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                 <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                 <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" />
               </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none"></textarea>
             </div>
             <button type="submit" className="bg-herbal-600 hover:bg-herbal-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors">
               Send Message
             </button>
           </form>
        </div>
      </div>
    </div>
  </div>
);

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQty,
  onCheckout 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
  onCheckout: () => void;
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPV = items.reduce((sum, item) => sum + (item.pv * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b flex justify-between items-center bg-herbal-50">
          <h2 className="text-lg font-bold text-herbal-900 flex items-center gap-2">
            <ShoppingCart size={20} /> Your Cart
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">Your cart is empty.</div>
            ) : (
                items.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                            <div className="text-sm text-gray-500 mb-1">₹{item.price} x {item.quantity}</div>
                            <div className="text-xs text-herbal-600 font-medium">PV: {item.pv * item.quantity}</div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-herbal-600 disabled:opacity-50">-</button>
                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-herbal-600">+</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {items.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total PV</span>
                    <span className="font-bold text-herbal-600">{totalPV}</span>
                </div>
                <div className="flex justify-between mb-4 text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-herbal-600 hover:bg-herbal-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
        )}
      </div>
    </div>
  );
};