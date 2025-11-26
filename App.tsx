import React, { useState } from 'react';
import { 
  Menu, X, Search, ShoppingCart, User as UserIcon, LogOut, 
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, ChevronRight, Info, Wrench, Settings 
} from 'lucide-react';
import { 
  ViewState, Product, User, CartItem, 
  DistributorStats 
} from './types';
import { 
  MOCK_PRODUCTS, MOCK_DISTRIBUTOR_STATS, MOCK_GENEALOGY, MOCK_ORDERS, MOCK_WALLET_TRANSACTIONS 
} from './constants';
import { ProductCard, CartDrawer, ProductDetail, CheckoutPage, AboutUs, ContactUs } from './components/StoreComponents';
import { 
  DashboardSidebar, StatCard, GenealogyView, 
  AddAssociateForm, IncomeChart, WalletSection, OrderHistory, KYCSection, ReportsSection, DownloadsSection 
} from './components/DistributorDashboard';
import { AdminPanel } from './components/AdminPanel';
import { Wallet, TrendingUp, Users, Award } from 'lucide-react';

const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-gray-400 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Wrench size={32} className="text-gray-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-500">This module is currently under development.</p>
    </div>
);

const App: React.FC = () => {
  // Global State
  const [view, setView] = useState<ViewState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Dashboard State
  const [dashboardTab, setDashboardTab] = useState('overview');

  // Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: 'CUSTOMER' | 'DISTRIBUTOR' | 'ADMIN') => {
    if (role === 'ADMIN') {
        setUser({
            id: 'ADMIN-01',
            name: 'Super Admin',
            email: 'admin@herballife.com',
            role: 'ADMIN'
        });
        setView('ADMIN');
        return;
    }

    setUser({
      id: role === 'DISTRIBUTOR' ? 'DIST-883920' : 'CUST-001',
      name: role === 'DISTRIBUTOR' ? 'Rahul Sharma' : 'Guest Customer',
      email: 'user@example.com',
      role: role,
      rank: role === 'DISTRIBUTOR' ? 'Diamond' : undefined
    });
    setView(role === 'DISTRIBUTOR' ? 'DASHBOARD' : 'HOME');
  };

  const handleLogout = () => {
    setUser(null);
    setView('HOME');
    setDashboardTab('overview');
  };

  const handlePlaceOrder = (details: any) => {
    alert(`Order Placed Successfully! \nOrder ID: #ORD-${Math.floor(Math.random() * 10000)} \nTotal: ₹${cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)}`);
    setCart([]);
    setView('HOME');
  };

  // --- Views ---

  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('HOME')}
        >
          <div className="w-8 h-8 bg-herbal-600 rounded-tl-xl rounded-br-xl"></div>
          <span className="text-2xl font-bold text-herbal-800 tracking-tight">Herbal<span className="text-herbal-500">Life</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <button onClick={() => setView('HOME')} className={`hover:text-herbal-600 ${view === 'HOME' ? 'text-herbal-600' : ''}`}>Home</button>
          <button onClick={() => setView('STORE')} className={`hover:text-herbal-600 ${view === 'STORE' ? 'text-herbal-600' : ''}`}>Shop Products</button>
          <button onClick={() => setView('ABOUT')} className={`hover:text-herbal-600 ${view === 'ABOUT' ? 'text-herbal-600' : ''}`}>About Us</button>
          <button onClick={() => setView('CONTACT')} className={`hover:text-herbal-600 ${view === 'CONTACT' ? 'text-herbal-600' : ''}`}>Contact</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
             <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-4 py-1.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-herbal-500 w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             />
             <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
          </div>

          <button 
            className="relative p-2 text-gray-600 hover:text-herbal-600 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {user ? (
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => setView(user.role === 'DISTRIBUTOR' ? 'DASHBOARD' : (user.role === 'ADMIN' ? 'ADMIN' : 'HOME'))}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-herbal-600"
                >
                  <div className="w-8 h-8 bg-herbal-100 rounded-full flex items-center justify-center text-herbal-700">
                    <UserIcon size={16} />
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-500 hover:text-red-600 p-2 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
             </div>
          ) : (
            <button 
              onClick={() => setView('LOGIN')}
              className="bg-herbal-600 hover:bg-herbal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white text-xl font-bold mb-4">HerbalLife</h4>
            <p className="text-sm leading-relaxed mb-4">Bringing the ancient wisdom of Ayurveda to the modern world with our premium herbal products and business opportunities.</p>
            <div className="flex gap-4">
               <Facebook size={20} className="hover:text-herbal-500 cursor-pointer" />
               <Twitter size={20} className="hover:text-herbal-500 cursor-pointer" />
               <Instagram size={20} className="hover:text-herbal-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li onClick={() => setView('ABOUT')} className="hover:text-herbal-400 cursor-pointer">About Us</li>
              <li onClick={() => setView('STORE')} className="hover:text-herbal-400 cursor-pointer">Products</li>
              <li className="hover:text-herbal-400 cursor-pointer">Business Plan</li>
              <li className="hover:text-herbal-400 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-herbal-500 mt-0.5" />
                <span>123 Herbal Park, Green Valley,<br/>Dehradun, India 248001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-herbal-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-herbal-500" />
                <span>support@herballife.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Your email address" className="bg-gray-800 border-none rounded px-4 py-2 text-sm focus:ring-1 focus:ring-herbal-500" />
              <button className="bg-herbal-600 text-white py-2 rounded font-semibold text-sm hover:bg-herbal-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          &copy; 2023 HerbalLife Wellness Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative bg-herbal-50 h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-herbal-200/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-herbal-600 font-bold tracking-wider text-sm uppercase mb-2 block animate-in fade-in slide-in-from-bottom-4 duration-700">Natural Wellness</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Revitalize Life With <span className="text-herbal-600">Nature's Best</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Discover our range of authentic Ayurvedic products designed to heal, nourish, and rejuvenate your body and mind.
            </p>
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <button onClick={() => setView('STORE')} className="bg-herbal-600 hover:bg-herbal-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-herbal-600/30 transition-all transform hover:-translate-y-1">
                Shop Now
              </button>
              <button onClick={() => setView('LOGIN')} className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3 rounded-full font-bold shadow-sm transition-all">
                Become Distributor
              </button>
            </div>
          </div>
          <div className="hidden md:block relative animate-in fade-in zoom-in duration-1000">
             <img 
               src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Herbal Products" 
               className="rounded-3xl shadow-2xl object-cover h-[400px] w-full transform rotate-2 hover:rotate-0 transition-transform duration-500"
             />
          </div>
        </div>
      </section>

      {/* Categories / Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
            <div className="w-16 h-1 bg-herbal-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "100% Natural", desc: "Sourced directly from organic farms.", icon: "🌿" },
              { title: "Lab Tested", desc: "Certified quality for your safety.", icon: "🔬" },
              { title: "Secure Payments", desc: "Safe and fast transaction gateways.", icon: "🔒" }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-2xl text-center hover:bg-herbal-50 transition-colors border border-transparent hover:border-herbal-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
           <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
               <div className="w-16 h-1 bg-herbal-500 mt-4 rounded-full"></div>
             </div>
             <button onClick={() => setView('STORE')} className="text-herbal-600 font-semibold hover:text-herbal-800 flex items-center gap-1">
               View All <span className="text-lg">&rarr;</span>
             </button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {MOCK_PRODUCTS.slice(0, 4).map(product => (
               <ProductCard key={product.id} product={product} onAdd={addToCart} onClick={handleProductClick} />
             ))}
           </div>
        </div>
      </section>
    </>
  );

  const renderStore = () => (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Store</h1>
            <p className="text-gray-500">Browse our premium collection of herbal supplements.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar (Mobile Hidden simplified) */}
          <div className="w-full md:w-64 flex-shrink-0">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
               <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li className="flex items-center gap-2 cursor-pointer text-herbal-600 font-medium">
                   <div className="w-2 h-2 rounded-full bg-herbal-600"></div> All Products
                 </li>
                 {['Health Supplements', 'Juices', 'Personal Care', 'Teas', 'Skincare'].map(cat => (
                   <li key={cat} className="flex items-center gap-2 cursor-pointer hover:text-herbal-600 transition-colors">
                     <div className="w-2 h-2 rounded-full bg-transparent border border-gray-300"></div> {cat}
                   </li>
                 ))}
               </ul>

               <h3 className="font-bold text-gray-900 mt-8 mb-4">Price Range</h3>
               <div className="space-y-2">
                 <input type="range" className="w-full accent-herbal-600" />
                 <div className="flex justify-between text-xs text-gray-500">
                   <span>₹0</span>
                   <span>₹5000</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                  <ProductCard key={product.id} product={product} onAdd={addToCart} onClick={handleProductClick} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderLogin = () => (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-herbal-100 text-herbal-600 rounded-full flex items-center justify-center mb-4">
             <UserIcon size={24} />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Sign in to account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or <button onClick={() => setView('REGISTER')} className="font-medium text-herbal-600 hover:text-herbal-500">register new account</button>
          </p>

          <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800 text-left">
            <span className="font-bold block mb-2 flex items-center gap-2"><Info size={16}/> Demo Access Mode:</span>
            <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Click <strong>Distributor Login</strong> to access the Backoffice.</li>
                <li>Click <strong>Customer Login</strong> to shop as a user.</li>
                <li>Click <strong>Admin Access</strong> (bottom link) for the Admin panel.</li>
            </ul>
            <p className="mt-2 text-xs italic text-blue-600 opacity-75">* Password validation is disabled for this demo.</p>
          </div>
        </div>
        <div className="mt-8 space-y-6">
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
               <input type="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-herbal-500 focus:border-herbal-500 focus:z-10 sm:text-sm" placeholder="Email address / Distributor ID" />
             </div>
             <div>
               <input type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-herbal-500 focus:border-herbal-500 focus:z-10 sm:text-sm" placeholder="Password" />
             </div>
           </div>

           <div className="flex items-center justify-between">
             <div className="flex items-center">
               <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-herbal-600 focus:ring-herbal-500 border-gray-300 rounded" />
               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
             </div>
             <div className="text-sm">
               <a href="#" className="font-medium text-herbal-600 hover:text-herbal-500">Forgot password?</a>
             </div>
           </div>

           <div className="flex flex-col gap-4">
              <button onClick={() => handleLogin('CUSTOMER')} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Customer Login
              </button>
              <button onClick={() => handleLogin('DISTRIBUTOR')} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-herbal-600 hover:bg-herbal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-herbal-500">
                Distributor Login
              </button>
              <div className="text-center mt-2">
                 <span className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 underline" onClick={() => handleLogin('ADMIN')}>Admin Access (Demo)</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center">
             <h2 className="text-2xl font-bold mb-4">Register New Account</h2>
             <p className="text-gray-600 mb-6">For this demo, please use the Login screen to access different roles directly.</p>
             <button onClick={() => setView('LOGIN')} className="bg-herbal-600 text-white px-6 py-2 rounded-lg font-medium">Back to Login</button>
        </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="flex min-h-screen bg-slate-50">
       <DashboardSidebar activeTab={dashboardTab} onTabChange={setDashboardTab} onLogout={handleLogout} />
       
       <div className="ml-64 flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, Rahul Sharma</h1>
              <p className="text-gray-500">Diamond Director | Status: <span className="text-green-600 font-semibold">Active</span></p>
            </div>
            <div className="flex items-center gap-4">
               <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                 <span className="text-xs text-gray-500 block">Current Rank</span>
                 <span className="font-bold text-herbal-600">Diamond</span>
               </div>
               <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                 <span className="text-xs text-gray-500 block">Date Joined</span>
                 <span className="font-bold text-gray-700">12 Jan 2022</span>
               </div>
            </div>
          </header>

          {dashboardTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Wallet Balance" value={`₹${MOCK_DISTRIBUTOR_STATS.walletBalance.toLocaleString()}`} icon={Wallet} colorClass="bg-blue-500" />
                 <StatCard title="Total Income" value={`₹${MOCK_DISTRIBUTOR_STATS.totalIncome.toLocaleString()}`} icon={TrendingUp} colorClass="bg-green-500" subValue="+12% this month" />
                 <StatCard title="Self PV (Current)" value={MOCK_DISTRIBUTOR_STATS.selfPv} icon={UserIcon} colorClass="bg-purple-500" />
                 <StatCard title="Total Team PV" value={MOCK_DISTRIBUTOR_STATS.teamPvOrg1 + MOCK_DISTRIBUTOR_STATS.teamPvOrg2} icon={Users} colorClass="bg-orange-500" />
               </div>

               {/* Middle Section: Chart & Leg Stats */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                     <h3 className="text-lg font-bold text-gray-800 mb-4">Income History</h3>
                     <IncomeChart />
                  </div>
                  <div className="space-y-6">
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Organization Stats</h3>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <div>
                                <span className="text-xs text-blue-600 font-bold uppercase">Org 1 (Left)</span>
                                <div className="font-bold text-xl">{MOCK_DISTRIBUTOR_STATS.teamPvOrg1} PV</div>
                              </div>
                              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">L</div>
                           </div>
                           <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                              <div>
                                <span className="text-xs text-green-600 font-bold uppercase">Org 2 (Right)</span>
                                <div className="font-bold text-xl">{MOCK_DISTRIBUTOR_STATS.teamPvOrg2} PV</div>
                              </div>
                              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold">R</div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gradient-to-br from-herbal-600 to-herbal-800 p-6 rounded-xl text-white shadow-lg">
                        <h3 className="font-bold mb-2">Next Rank: Crown</h3>
                        <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                          <div className="bg-white h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <p className="text-sm text-herbal-100">You need 5,000 more matching PV to achieve Crown Director rank.</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {dashboardTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-xl font-bold text-gray-800 mb-6">My Profile & Status</h2>
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">RS</div>
                     <div>
                        <h3 className="text-2xl font-bold text-gray-900">Rahul Sharma</h3>
                        <p className="text-gray-500">ID: DIST-883920</p>
                        <span className="inline-block bg-herbal-100 text-herbal-700 px-3 py-1 rounded-full text-xs font-bold mt-2">Diamond Director</span>
                     </div>
                  </div>
                  <KYCSection status={MOCK_DISTRIBUTOR_STATS.kycStatus} />
               </div>
            </div>
          )}

          {dashboardTab === 'register' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <AddAssociateForm />
            </div>
          )}

          {dashboardTab === 'genealogy' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-xl font-bold text-gray-800 mb-4">Genealogy Tree View</h2>
               <GenealogyView root={MOCK_GENEALOGY} />
            </div>
          )}

          {dashboardTab === 'ranks' && <PlaceholderPage title="Rank Achievers" />}

          {dashboardTab === 'wallet' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Fund Management</h2>
                  <WalletSection balance={MOCK_DISTRIBUTOR_STATS.walletBalance} transactions={MOCK_WALLET_TRANSACTIONS} />
              </div>
          )}

          {dashboardTab === 'topup' && <PlaceholderPage title="Wallet Topup" />}

          {dashboardTab === 'reports' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">My Incentive Reports</h2>
                  <ReportsSection />
              </div>
          )}

          {dashboardTab === 'orders' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">My Orders</h2>
                  <OrderHistory orders={MOCK_ORDERS} />
              </div>
          )}

          {dashboardTab === 'stock' && <PlaceholderPage title="Track Stock Point" />}

          {dashboardTab === 'repurchase' && (
              <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center animate-in fade-in zoom-in duration-300">
                  <ShoppingCart size={48} className="mx-auto text-herbal-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Repurchase?</h3>
                  <p className="text-gray-500 mb-8">Browse our catalog and order new stock for your business.</p>
                  <button onClick={() => setView('STORE')} className="bg-herbal-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-herbal-700 transition-colors">
                      Go to Store
                  </button>
              </div>
          )}

          {dashboardTab === 'application' && <PlaceholderPage title="Application Center" />}

          {dashboardTab === 'downloads' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Print / Download</h2>
                  <DownloadsSection />
              </div>
          )}

          {dashboardTab === 'settings' && <PlaceholderPage title="My Settings" />}
       </div>
    </div>
  );

  return (
    <>
      {view === 'ADMIN' ? (
        <AdminPanel onLogout={handleLogout} />
      ) : view === 'DASHBOARD' ? (
        renderDashboard()
      ) : (
        <div className="font-sans text-gray-800">
          {renderHeader()}
          <main>
            {view === 'HOME' && renderHome()}
            {view === 'STORE' && renderStore()}
            {view === 'PRODUCT_DETAIL' && selectedProduct && (
                <ProductDetail 
                    product={selectedProduct} 
                    onAdd={addToCart} 
                    onBack={() => setView('STORE')} 
                />
            )}
            {view === 'CHECKOUT' && (
                <CheckoutPage 
                    cart={cart} 
                    total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                    onBack={() => setIsCartOpen(true)}
                    onPlaceOrder={handlePlaceOrder}
                />
            )}
            {view === 'LOGIN' && renderLogin()}
            {view === 'REGISTER' && renderRegister()}
            {view === 'ABOUT' && <AboutUs />}
            {view === 'CONTACT' && <ContactUs />}
            {/* Fallback for others */}
            {(view !== 'HOME' && view !== 'STORE' && view !== 'LOGIN' && view !== 'REGISTER' && view !== 'PRODUCT_DETAIL' && view !== 'CHECKOUT' && view !== 'ABOUT' && view !== 'CONTACT') && renderHome()} 
          </main>
          {renderFooter()}
        </div>
      )}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
        onUpdateQty={updateQty}
        onCheckout={() => {
            setIsCartOpen(false);
            setView('CHECKOUT');
        }}
      />
    </>
  );
};

export default App;