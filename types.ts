export type ViewState = 'HOME' | 'STORE' | 'PRODUCT_DETAIL' | 'CART' | 'CHECKOUT' | 'LOGIN' | 'REGISTER' | 'DASHBOARD' | 'ADMIN' | 'CONTACT' | 'ABOUT' | 'ORDER_SUCCESS';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  pv: number; // Purchase Value
  bv: number; // Business Value
  description: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'DISTRIBUTOR' | 'ADMIN';
  sponsorId?: string;
  rank?: string;
}

export interface DistributorStats {
  selfPv: number;
  teamPvOrg1: number;
  teamPvOrg2: number;
  walletBalance: number;
  totalIncome: number;
  carFund: number;
  houseFund: number;
  rank: string;
  status: 'Active' | 'Inactive';
  kycStatus: 'Verified' | 'Pending' | 'Rejected' | 'Not Submitted';
}

export interface GenealogyNode {
  id: string;
  name: string;
  rank: string;
  pv: number;
  children: GenealogyNode[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}

export interface WalletTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'Credit' | 'Debit';
  description: string;
}

export interface AdminStats {
  totalUsers: number;
  totalSales: number;
  pendingKYC: number;
  activeDistributors: number;
}