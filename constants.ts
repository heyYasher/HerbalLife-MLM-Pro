import { Product, GenealogyNode, DistributorStats, Order, WalletTransaction, AdminStats } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Herbal Immunity Booster",
    category: "Health Supplements",
    price: 499,
    pv: 20,
    bv: 100,
    description: "A powerful blend of Tulsi, Giloy, and Ashwagandha to boost your immunity naturally. Helps fight cold, flu, and infections.",
    image: "https://picsum.photos/400/400?random=1",
    rating: 4.8
  },
  {
    id: 2,
    name: "Aloe Vera Detox Juice",
    category: "Juices",
    price: 350,
    pv: 15,
    bv: 80,
    description: "Pure Aloe Vera juice for detoxification and digestive health. Rich in fiber and essential nutrients.",
    image: "https://picsum.photos/400/400?random=2",
    rating: 4.5
  },
  {
    id: 3,
    name: "Ayurvedic Joint Pain Oil",
    category: "Personal Care",
    price: 299,
    pv: 10,
    bv: 50,
    description: "Relief from joint pain with ancient ayurvedic formula containing Mahanarayan Oil and Wintergreen.",
    image: "https://picsum.photos/400/400?random=3",
    rating: 4.9
  },
  {
    id: 4,
    name: "Herbal Slimming Tea",
    category: "Teas",
    price: 599,
    pv: 25,
    bv: 150,
    description: "Natural weight loss tea with Garcinia Cambogia and Green Tea extract. Boosts metabolism.",
    image: "https://picsum.photos/400/400?random=4",
    rating: 4.6
  },
  {
    id: 5,
    name: "Neem & Tulsi Face Wash",
    category: "Skincare",
    price: 199,
    pv: 5,
    bv: 20,
    description: "Anti-acne face wash for clear and glowing skin. Removes impurities and excess oil.",
    image: "https://picsum.photos/400/400?random=5",
    rating: 4.7
  },
  {
    id: 6,
    name: "Triphala Powder",
    category: "Health Supplements",
    price: 150,
    pv: 5,
    bv: 30,
    description: "Classic digestive aid and colon cleanser. Balances the three doshas.",
    image: "https://picsum.photos/400/400?random=6",
    rating: 4.8
  }
];

export const MOCK_DISTRIBUTOR_STATS: DistributorStats = {
  selfPv: 150,
  teamPvOrg1: 12500,
  teamPvOrg2: 9800,
  walletBalance: 4500.00,
  totalIncome: 124500.00,
  carFund: 15000,
  houseFund: 8000,
  rank: "Diamond Director",
  status: "Active",
  kycStatus: "Verified"
};

export const MOCK_GENEALOGY: GenealogyNode = {
  id: "DIST-001",
  name: "You (Root)",
  rank: "Diamond",
  pv: 150,
  children: [
    {
      id: "DIST-002",
      name: "Amit Kumar",
      rank: "Gold",
      pv: 100,
      children: [
        { id: "DIST-004", name: "Rahul Singh", rank: "Silver", pv: 50, children: [] },
        { id: "DIST-005", name: "Priya Sharma", rank: "Silver", pv: 60, children: [] }
      ]
    },
    {
      id: "DIST-003",
      name: "Sneha Gupta",
      rank: "Gold",
      pv: 120,
      children: [
         { id: "DIST-006", name: "Vikram Raj", rank: "Silver", pv: 80, children: [] }
      ]
    }
  ]
};

export const MOCK_ORDERS: Order[] = [
  { 
    id: "ORD-7829", 
    date: "2023-10-25", 
    total: 1249, 
    status: "Delivered", 
    items: [
        { ...MOCK_PRODUCTS[0], quantity: 1 },
        { ...MOCK_PRODUCTS[1], quantity: 1 }
    ] 
  },
  { 
    id: "ORD-7880", 
    date: "2023-11-02", 
    total: 599, 
    status: "Shipped", 
    items: [
        { ...MOCK_PRODUCTS[3], quantity: 1 }
    ] 
  },
  { 
    id: "ORD-7912", 
    date: "2023-11-10", 
    total: 2450, 
    status: "Pending", 
    items: [
        { ...MOCK_PRODUCTS[0], quantity: 2 },
        { ...MOCK_PRODUCTS[3], quantity: 1 },
        { ...MOCK_PRODUCTS[5], quantity: 1 }
    ] 
  },
];

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: "TXN-001", date: "2023-11-01", amount: 5000, type: "Credit", description: "Monthly Payout - Oct" },
  { id: "TXN-002", date: "2023-11-05", amount: 2000, type: "Debit", description: "Repurchase Order #ORD-7912" },
  { id: "TXN-003", date: "2023-11-15", amount: 1500, type: "Credit", description: "Level Income Bonus" },
];

export const MOCK_ADMIN_STATS: AdminStats = {
  totalUsers: 12450,
  totalSales: 8500000,
  pendingKYC: 45,
  activeDistributors: 8200
};

export const TESTIMONIALS = [
  { name: "Anita Roy", role: "Customer", text: "The Aloe Vera juice changed my digestion completely. Highly recommended!" },
  { name: "Rajesh Verma", role: "Distributor", text: "Best business opportunity. The payout system is transparent and on time." },
  { name: "Dr. S. Mehta", role: "Ayurveda Expert", text: "Authentic herbs used in all products. Great quality control." }
];