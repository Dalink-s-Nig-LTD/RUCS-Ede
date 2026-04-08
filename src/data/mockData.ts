export const mockUser = {
  id: "u1",
  name: "Chidi Okafor",
  email: "chidi.o@run.edu.ng",
  staffId: "RUN-STAFF-1042",
  role: "member",
  status: "active",
  savings_balance: 1450000,
  monthly_savings: 50000,
};

export const mockAdmin = {
  id: "a1",
  name: "Mrs. Adaeze",
  email: "adaeze.admin@run.edu.ng",
  role: "admin",
  status: "active",
};

export const mockMembers = [
  { id: 'u1', name: 'Chidi Okafor', email: 'chidi.o@run.edu.ng', role: 'member', status: 'active', joined: '2024-03-12', savings_balance: 1450000, total_loan_balance: 1295000 },
  { id: 'm2', name: 'Sarah Bamidele', email: 'sarah.b@run.edu.ng', role: 'member', status: 'active', joined: '2023-11-05', savings_balance: 850000, total_loan_balance: 0 },
  { id: 'm3', name: 'Dr. Johnson E.', email: 'johnson.e@run.edu.ng', role: 'member', status: 'on_hold', joined: '2024-01-20', savings_balance: 320000, total_loan_balance: 550000 },
  { id: 'a1', name: 'Mrs. Adaeze', email: 'adaeze.admin@run.edu.ng', role: 'admin', status: 'active', joined: '2022-06-15', savings_balance: 0, total_loan_balance: 0 },
];

export const products = [
  {
    id: "p1",
    name: "Apple MacBook Pro 14\"",
    description: "M3 Pro chip, 18GB RAM, 512GB SSD. Perfect for productivity and heavy tasks.",
    category: "Electronics",
    price: 1850000,
    stock_quantity: 5,
    is_active: true,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p2",
    name: "Sony WH-1000XM5",
    description: "Industry leading noise canceling wireless headphones.",
    category: "Electronics",
    price: 350000,
    stock_quantity: 12,
    is_active: true,
    image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p3",
    name: "Samsung 65\" QLED 4K Smart TV",
    description: "Immersive viewing experience with Quantum Dot technology.",
    category: "Household",
    price: 950000,
    stock_quantity: 3,
    is_active: true,
    image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p4",
    name: "LG Double Door Refrigerator",
    description: "Energy efficient cooling with smart inverter compressor.",
    category: "Household",
    price: 680000,
    stock_quantity: 8,
    is_active: true,
    image_url: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p5",
    name: "AirPods Max",
    description: "High-fidelity audio. Active Noise Cancellation with Transparency mode.",
    category: "Electronics",
    price: 550000,
    stock_quantity: 0,
    is_active: true,
    image_url: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800",
  }
];

export const mockLoans = [
  {
    id: "l1",
    member_id: "u1",
    product_id: "p1",
    product: products[0],
    quantity: 1,
    total_loan_amount: 1850000,
    total_repayment_amount: 1942500,
    monthly_installment: 161875,
    repayment_duration_months: 12,
    status: "active",
    amount_paid: 647500,
    created_at: "2025-10-15T10:00:00Z",
  },
  {
    id: "l2",
    member_id: "u1",
    product_id: "p2",
    product: products[1],
    quantity: 1,
    total_loan_amount: 350000,
    total_repayment_amount: 367500,
    monthly_installment: 61250,
    repayment_duration_months: 6,
    status: "cleared",
    amount_paid: 367500,
    created_at: "2025-01-10T14:30:00Z",
  },
  {
    id: "l3",
    member_id: "u1",
    product_id: "p4",
    product: products[3],
    quantity: 1,
    total_loan_amount: 680000,
    total_repayment_amount: 714000,
    monthly_installment: 119000,
    repayment_duration_months: 6,
    status: "pending",
    amount_paid: 0,
    created_at: "2026-04-05T09:15:00Z",
  }
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};
