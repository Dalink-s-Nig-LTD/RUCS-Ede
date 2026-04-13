// ===== USERS =====
export const mockUser = {
  id: "u1",
  name: "Chidi Okafor",
  email: "chidi.o@run.edu.ng",
  staffId: "RUN-STAFF-1042",
  role: "member" as const,
  status: "active" as const,
  savings_balance: 1450000,
  voluntary_savings: 320000,
  monthly_savings: 50000,
  interest_earned_ytd: 85000,
  mandatory_target: 50000,
  mandatory_actual: 50000,
};

export const mockOfficer = {
  id: "o1",
  name: "Mr. Emmanuel Eze",
  email: "emmanuel.e@run.edu.ng",
  role: "loan_officer" as const,
  status: "active" as const,
};

export const mockAdmin = {
  id: "a1",
  name: "Mrs. Adaeze",
  email: "adaeze.admin@run.edu.ng",
  role: "admin" as const,
  status: "active" as const,
};

export const mockMembers = [
  { id: 'u1', name: 'Chidi Okafor', email: 'chidi.o@run.edu.ng', role: 'member', status: 'active', joined: '2024-03-12', savings_balance: 1450000, total_loan_balance: 1295000, monthly_contribution: 50000 },
  { id: 'm2', name: 'Sarah Bamidele', email: 'sarah.b@run.edu.ng', role: 'member', status: 'active', joined: '2023-11-05', savings_balance: 850000, total_loan_balance: 0, monthly_contribution: 50000 },
  { id: 'm3', name: 'Dr. Johnson E.', email: 'johnson.e@run.edu.ng', role: 'member', status: 'on_hold', joined: '2024-01-20', savings_balance: 320000, total_loan_balance: 550000, monthly_contribution: 30000 },
  { id: 'm4', name: 'Prof. Akinwale T.', email: 'akinwale.t@run.edu.ng', role: 'member', status: 'active', joined: '2022-09-01', savings_balance: 2100000, total_loan_balance: 0, monthly_contribution: 100000 },
  { id: 'm5', name: 'Mrs. Folake Adeyemi', email: 'folake.a@run.edu.ng', role: 'treasurer', status: 'active', joined: '2022-06-15', savings_balance: 1800000, total_loan_balance: 350000, monthly_contribution: 75000 },
  { id: 'm6', name: 'Dr. Uche Nwosu', email: 'uche.n@run.edu.ng', role: 'loan_officer', status: 'active', joined: '2023-02-10', savings_balance: 960000, total_loan_balance: 680000, monthly_contribution: 50000 },
  { id: 'a1', name: 'Mrs. Adaeze', email: 'adaeze.admin@run.edu.ng', role: 'admin', status: 'active', joined: '2022-06-15', savings_balance: 0, total_loan_balance: 0, monthly_contribution: 0 },
];

// ===== PRODUCTS =====
export const products = [
  {
    id: "p1",
    name: 'Apple MacBook Pro 14"',
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
    name: 'Samsung 65" QLED 4K Smart TV',
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

// ===== LOANS =====
export const mockLoans = [
  {
    id: "l1",
    member_id: "u1",
    member_name: "Chidi Okafor",
    member_email: "chidi.o@run.edu.ng",
    product_id: "p1",
    product: products[0],
    quantity: 1,
    total_loan_amount: 1850000,
    total_repayment_amount: 1942500,
    monthly_installment: 161875,
    repayment_duration_months: 12,
    interest_rate: 12,
    purpose: "school_fees",
    status: "active" as const,
    amount_paid: 647500,
    created_at: "2025-10-15T10:00:00Z",
    approved_by: "Mrs. Adaeze",
    approved_at: "2025-10-16T14:00:00Z",
    next_emi_date: "2026-05-01",
  },
  {
    id: "l2",
    member_id: "u1",
    member_name: "Chidi Okafor",
    member_email: "chidi.o@run.edu.ng",
    product_id: "p2",
    product: products[1],
    quantity: 1,
    total_loan_amount: 350000,
    total_repayment_amount: 367500,
    monthly_installment: 61250,
    repayment_duration_months: 6,
    interest_rate: 12,
    purpose: "business",
    status: "cleared" as const,
    amount_paid: 367500,
    created_at: "2025-01-10T14:30:00Z",
    approved_by: "Mrs. Adaeze",
    approved_at: "2025-01-11T09:00:00Z",
    next_emi_date: null,
  },
  {
    id: "l3",
    member_id: "u1",
    member_name: "Chidi Okafor",
    member_email: "chidi.o@run.edu.ng",
    product_id: "p4",
    product: products[3],
    quantity: 1,
    total_loan_amount: 680000,
    total_repayment_amount: 714000,
    monthly_installment: 119000,
    repayment_duration_months: 6,
    interest_rate: 12,
    purpose: "emergency",
    status: "pending" as const,
    amount_paid: 0,
    created_at: "2026-04-05T09:15:00Z",
    approved_by: null,
    approved_at: null,
    next_emi_date: null,
  },
  {
    id: "l4",
    member_id: "m2",
    member_name: "Sarah Bamidele",
    member_email: "sarah.b@run.edu.ng",
    product_id: "p3",
    product: products[2],
    quantity: 1,
    total_loan_amount: 950000,
    total_repayment_amount: 997500,
    monthly_installment: 83125,
    repayment_duration_months: 12,
    interest_rate: 12,
    purpose: "school_fees",
    status: "pending" as const,
    amount_paid: 0,
    created_at: "2026-04-10T11:00:00Z",
    approved_by: null,
    approved_at: null,
    next_emi_date: null,
  },
  {
    id: "l5",
    member_id: "m3",
    member_name: "Dr. Johnson E.",
    member_email: "johnson.e@run.edu.ng",
    product_id: "p5",
    product: products[4],
    quantity: 1,
    total_loan_amount: 550000,
    total_repayment_amount: 577500,
    monthly_installment: 96250,
    repayment_duration_months: 6,
    interest_rate: 12,
    purpose: "business",
    status: "active" as const,
    amount_paid: 192500,
    created_at: "2026-02-01T08:30:00Z",
    approved_by: "Mr. Emmanuel Eze",
    approved_at: "2026-02-02T10:00:00Z",
    next_emi_date: "2026-05-01",
  },
];

// ===== TRANSACTIONS =====
export const mockTransactions = [
  { id: 't1', member_id: 'u1', title: 'Monthly Savings Deposit', type: 'deposit' as const, amount: 50000, date: 'May 1, 2026', reference: 'TXN-2026-0501' },
  { id: 't2', member_id: 'u1', title: 'Loan Repayment - MacBook Pro', type: 'loan_repayment' as const, amount: -161875, date: 'May 1, 2026', reference: 'TXN-2026-0502' },
  { id: 't3', member_id: 'u1', title: 'Voluntary Savings', type: 'deposit' as const, amount: 20000, date: 'Apr 25, 2026', reference: 'TXN-2026-0425' },
  { id: 't4', member_id: 'u1', title: 'Monthly Savings Deposit', type: 'deposit' as const, amount: 50000, date: 'Apr 1, 2026', reference: 'TXN-2026-0401' },
  { id: 't5', member_id: 'u1', title: 'Loan Repayment - MacBook Pro', type: 'loan_repayment' as const, amount: -161875, date: 'Apr 1, 2026', reference: 'TXN-2026-0402' },
  { id: 't6', member_id: 'u1', title: 'Interest Credit (Q1 2026)', type: 'interest_credit' as const, amount: 18125, date: 'Mar 31, 2026', reference: 'TXN-2026-0331' },
  { id: 't7', member_id: 'u1', title: 'Monthly Savings Deposit', type: 'deposit' as const, amount: 50000, date: 'Mar 1, 2026', reference: 'TXN-2026-0301' },
  { id: 't8', member_id: 'u1', title: 'Loan Repayment - MacBook Pro', type: 'loan_repayment' as const, amount: -161875, date: 'Mar 1, 2026', reference: 'TXN-2026-0302' },
  { id: 't9', member_id: 'u1', title: 'Monthly Savings Deposit', type: 'deposit' as const, amount: 50000, date: 'Feb 1, 2026', reference: 'TXN-2026-0201' },
  { id: 't10', member_id: 'u1', title: 'Loan Repayment - MacBook Pro', type: 'loan_repayment' as const, amount: -161875, date: 'Feb 1, 2026', reference: 'TXN-2026-0202' },
];

// ===== CONTRIBUTIONS =====
export const mockContributions = [
  { id: 'c1', member_id: 'u1', amount: 50000, type: 'mandatory' as const, date: 'May 2026' },
  { id: 'c2', member_id: 'u1', amount: 50000, type: 'mandatory' as const, date: 'Apr 2026' },
  { id: 'c3', member_id: 'u1', amount: 20000, type: 'voluntary' as const, date: 'Apr 2026' },
  { id: 'c4', member_id: 'u1', amount: 50000, type: 'mandatory' as const, date: 'Mar 2026' },
  { id: 'c5', member_id: 'u1', amount: 50000, type: 'mandatory' as const, date: 'Feb 2026' },
  { id: 'c6', member_id: 'u1', amount: 50000, type: 'mandatory' as const, date: 'Jan 2026' },
];

// ===== FINANCIAL SETTINGS =====
export const mockSettings = {
  mandatory_savings_amount: 50000,
  savings_interest_rate: 5,
  loan_interest_rate: 12,
  max_loan_multiplier: 3, // max loan = 3x savings
  max_repayment_months: 12,
};

// ===== OVERDUE LOANS =====
export const mockOverdueLoans = [
  { id: 'od1', member_name: 'Dr. Johnson E.', email: 'johnson.e@run.edu.ng', loan_product: 'AirPods Max', emi_amount: 96250, due_date: '2026-04-01', days_overdue: 12 },
  { id: 'od2', member_name: 'Mrs. Grace Obi', email: 'grace.o@run.edu.ng', loan_product: 'Samsung TV', emi_amount: 83125, due_date: '2026-03-25', days_overdue: 19 },
];

// ===== HELPERS =====
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

export const calculateEMI = (principal: number, annualRate: number, months: number) => {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};
