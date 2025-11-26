import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  FileText, 
  TrendingUp, 
  Award,
  Download,
  LogOut,
  ChevronDown,
  ChevronRight,
  UserPlus,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  User,
  LogIn,
  Box,
  ArrowLeftRight,
  RotateCw,
  Repeat,
  ShoppingCart,
  Package,
  ShoppingBag,
  Settings
} from 'lucide-react';
import { DistributorStats, GenealogyNode, Order, WalletTransaction } from '../types';
import { MOCK_ORDERS, MOCK_WALLET_TRANSACTIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Sidebar ---
export const DashboardSidebar = ({ 
  activeTab, 
  onTabChange, 
  onLogout 
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'register', label: 'Add New Associate', icon: LogIn },
    { id: 'genealogy', label: 'My Team', icon: Users, hasSubmenu: true },
    { id: 'ranks', label: 'Rank Achievers', icon: Box },
    { id: 'wallet', label: 'Fund Management', icon: ArrowLeftRight, hasSubmenu: true },
    { id: 'topup', label: 'Topup', icon: RotateCw, hasSubmenu: true },
    { id: 'reports', label: 'My Incentive', icon: Repeat, hasSubmenu: true },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart, hasSubmenu: true },
    { id: 'stock', label: 'Track Stock Point', icon: Package },
    { id: 'repurchase', label: 'Repurchase Now', icon: ShoppingBag },
    { id: 'application', label: 'Application Center', icon: FileText, hasSubmenu: true },
    { id: 'downloads', label: 'Print / Download', icon: Download, hasSubmenu: true },
    { id: 'settings', label: 'My Setting', icon: Settings, hasSubmenu: true },
  ];

  return (
    <div className="w-64 bg-blue-700 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-50 shadow-xl">
      <div className="p-6 border-b border-blue-600">
        <h2 className="text-xl font-bold text-white">Distributor<span className="text-blue-200">Panel</span></h2>
        <p className="text-xs text-blue-200 mt-1">ID: DIST-883920</p>
      </div>
      
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-6 py-3 transition-all duration-200 border-l-4 ${
                isActive 
                  ? 'border-yellow-400 bg-blue-800 text-yellow-400 font-bold' 
                  : 'border-transparent text-white hover:bg-blue-600'
              }`}
            >
              <div className="flex items-center gap-3">
                 <Icon size={20} strokeWidth={1.5} />
                 <span className="text-sm tracking-wide">{item.label}</span>
              </div>
              {item.hasSubmenu && (
                  <ChevronRight size={16} className={`transition-transform duration-200 ${isActive ? 'text-yellow-400 rotate-90' : 'text-blue-300'}`} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-600 bg-blue-800/50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-red-500/20 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// --- Stats Card ---
export const StatCard = ({ title, value, icon: Icon, colorClass, subValue }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {subValue && <p className="text-xs text-green-600 mt-1">{subValue}</p>}
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

// --- Genealogy Tree Renderer ---
const TreeNode: React.FC<{ node: GenealogyNode }> = ({ node }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          flex flex-col items-center justify-center p-3 rounded-lg border-2 w-40 cursor-pointer transition-all hover:shadow-md
          ${node.rank === 'Diamond' ? 'border-blue-400 bg-blue-50' : 
            node.rank === 'Gold' ? 'border-yellow-400 bg-yellow-50' : 
            'border-gray-300 bg-white'}
        `}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="font-bold text-gray-800 text-sm truncate w-full text-center">{node.name}</div>
        <div className="text-xs text-gray-500">{node.id}</div>
        <div className="mt-1 text-xs font-semibold text-herbal-700 bg-herbal-100 px-2 py-0.5 rounded-full">
            PV: {node.pv}
        </div>
        <div className="mt-1 text-[10px] uppercase text-gray-400 font-bold tracking-wider">{node.rank}</div>
        
        {node.children.length > 0 && (
           <div className="mt-1 text-gray-400">
             {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
           </div>
        )}
      </div>

      {expanded && node.children.length > 0 && (
        <div className="flex items-start mt-8 relative">
           <div className="absolute top-0 left-1/2 -mt-8 w-px h-8 bg-gray-300"></div>
          <div className="flex gap-8 pt-4 border-t border-gray-300">
             {node.children.map((child) => (
               <TreeNode key={child.id} node={child} />
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const GenealogyView = ({ root }: { root: GenealogyNode }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 overflow-x-auto min-h-[500px]">
      <div className="min-w-[800px] flex justify-center pb-10">
        <TreeNode node={root} />
      </div>
    </div>
  );
};

// --- Registration Form for Downline ---
export const AddAssociateForm = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <UserPlus className="text-herbal-600" /> Register New Distributor
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor ID</label>
                    <input type="text" value="DIST-883920" readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
                    <p className="text-xs text-gray-500 mt-1">You are the sponsor for this registration.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none" placeholder="First Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none" placeholder="Last Name" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none" placeholder="associate@example.com" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none uppercase" placeholder="ABCDE1234F" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none" placeholder="1234 5678 9012" />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 focus:border-herbal-500 outline-none" rows={3} placeholder="Full residential address"></textarea>
                </div>

                <div className="col-span-2 pt-4">
                    <button type="button" className="w-full bg-herbal-600 hover:bg-herbal-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors">
                        Register Associate
                    </button>
                </div>
            </form>
        </div>
    )
}

// --- Modules ---
export const WalletSection = ({ balance, transactions }: { balance: number, transactions: WalletTransaction[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount);
    if (!val || val <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (val > balance) {
        alert("Insufficient wallet balance.");
        return;
    }
    
    alert(`Withdrawal Request Submitted!\nAmount: ₹${amount}\nReason: ${reason || 'N/A'}`);
    setIsModalOpen(false);
    setAmount('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      {/* Withdraw Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-herbal-600 p-4 flex justify-between items-center text-white">
                 <h3 className="font-bold text-lg flex items-center gap-2"><Wallet size={20} /> Withdraw Funds</h3>
                 <button onClick={() => setIsModalOpen(false)} className="hover:bg-herbal-700 p-1 rounded-full transition-colors"><XCircle size={20} /></button>
              </div>
              <div className="p-6">
                 <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 flex justify-between items-center">
                    <span className="text-sm text-blue-800">Available Balance:</span>
                    <span className="font-bold text-blue-900">₹{balance.toLocaleString()}</span>
                 </div>
                 <form onSubmit={handleWithdraw} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Withdraw (₹)</label>
                        <input 
                           type="number" 
                           required 
                           min="1"
                           max={balance}
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-herbal-500 outline-none text-lg font-bold text-gray-800"
                           placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
                        <textarea 
                           rows={3}
                           value={reason}
                           onChange={(e) => setReason(e.target.value)}
                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-herbal-500 outline-none resize-none"
                           placeholder="e.g. Monthly expense, Bank transfer..."
                        ></textarea>
                    </div>
                    <div className="pt-2 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)} 
                            className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-3 bg-herbal-600 text-white rounded-lg font-bold hover:bg-herbal-700 shadow-md transition-colors"
                        >
                            Submit Request
                        </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-gradient-to-r from-herbal-600 to-herbal-800 rounded-xl p-6 text-white shadow-lg">
            <div className="text-herbal-100 mb-1">Total Wallet Balance</div>
            <div className="text-4xl font-bold mb-4">₹{balance.toLocaleString()}</div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
               <Wallet size={16} /> Request Withdraw
            </button>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <h4 className="text-gray-500 text-sm font-medium mb-1">Total Withdrawn</h4>
                <p className="text-2xl font-bold text-gray-900">₹45,000.00</p>
             </div>
             <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <TrendingUp size={24} />
             </div>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100">
           <h3 className="font-bold text-gray-900">Transaction History</h3>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                 <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3 text-center">Type</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {transactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 text-sm text-gray-600">{txn.date}</td>
                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{txn.description}</td>
                       <td className={`px-6 py-4 text-sm font-bold text-right ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.type === 'Credit' ? '+' : '-'} ₹{txn.amount}
                       </td>
                       <td className="px-6 py-4 text-center">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${txn.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {txn.type}
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export const OrderHistory = ({ orders }: { orders: Order[] }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
       <div className="p-6 border-b border-gray-100 flex justify-between items-center">
         <h3 className="font-bold text-gray-900">My Purchase History</h3>
         <div className="relative">
            <input type="text" placeholder="Search orders..." className="pl-8 pr-4 py-2 border rounded-lg text-sm" />
            <Search size={16} className="absolute left-2.5 top-3 text-gray-400" />
         </div>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
               <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Items</th>
                  <th className="px-6 py-3 text-right">Total</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                     <td className="px-6 py-4 text-sm font-medium text-herbal-600">{order.id}</td>
                     <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                     <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} Items</td>
                     <td className="px-6 py-4 text-sm font-bold text-right">₹{order.total}</td>
                     <td className="px-6 py-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium 
                           ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                             order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                             'bg-yellow-100 text-yellow-700'}`}>
                           {order.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-center">
                        <button className="text-herbal-600 hover:text-herbal-800 text-sm font-medium">View</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
       </div>
    </div>
);

export const KYCSection = ({ status }: { status: string }) => (
    <div className="max-w-4xl mx-auto">
        <div className={`p-4 rounded-lg border mb-8 flex items-center gap-3 ${status === 'Verified' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
            {status === 'Verified' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            <div>
                <h4 className="font-bold">{status === 'Verified' ? 'KYC Verified' : 'KYC Pending'}</h4>
                <p className="text-sm">{status === 'Verified' ? 'Your identity has been verified. You can now withdraw earnings.' : 'Please submit your documents to activate withdrawals.'}</p>
            </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-herbal-500 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-herbal-50">
                        <Upload size={24} className="text-gray-400 group-hover:text-herbal-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">PAN Card</h4>
                    <p className="text-sm text-gray-500 mb-4">Upload clear front image</p>
                    <button className="text-herbal-600 font-medium text-sm">Select File</button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-herbal-500 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-herbal-50">
                        <Upload size={24} className="text-gray-400 group-hover:text-herbal-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Aadhaar Card</h4>
                    <p className="text-sm text-gray-500 mb-4">Upload Front & Back merged</p>
                    <button className="text-herbal-600 font-medium text-sm">Select File</button>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="bg-herbal-600 hover:bg-herbal-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg" disabled={status === 'Verified'}>
                   {status === 'Verified' ? 'Documents Submitted' : 'Submit for Verification'}
                </button>
            </div>
        </div>
    </div>
);

export const ReportsSection = () => {
    const data = [
        { name: 'Direct Bonus', value: 400 },
        { name: 'Team Bonus', value: 300 },
        { name: 'Matching Bonus', value: 300 },
        { name: 'Rewards', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Income Breakdown</h3>
                <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {data.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                            <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="font-bold text-gray-900 mb-4">Monthly PV Growth</h3>
               <IncomeChart />
            </div>
        </div>
    );
};

export const DownloadsSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Resource Center</h3>
        </div>
        <div className="divide-y divide-gray-100">
            {[
                "Business Plan Presentation (PDF)",
                "Product Catalog 2023",
                "Welcome Letter",
                "Distributor Agreement Form",
                "TDS Certificate Q1 2023"
            ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <FileText className="text-herbal-500" size={20} />
                        <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                    <button className="text-herbal-600 hover:text-herbal-800">
                        <Download size={20} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);


// --- Charts ---
export const IncomeChart = () => {
    const data = [
        { name: 'Jan', income: 4000 },
        { name: 'Feb', income: 3000 },
        { name: 'Mar', income: 2000 },
        { name: 'Apr', income: 2780 },
        { name: 'May', income: 1890 },
        { name: 'Jun', income: 2390 },
        { name: 'Jul', income: 3490 },
    ];

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{fill: '#f3f4f6'}}
                    />
                    <Bar dataKey="income" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}