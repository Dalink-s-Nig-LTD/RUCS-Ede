import {
  Users, Shield, TrendingUp, Wallet, GraduationCap, Home, Briefcase, Heart,
  Target, BookOpen, HandCoins, PiggyBank, Clock,
} from "lucide-react";

export const stats = [
  { value: "2,500+", label: "Active Members", icon: Users },
  { value: "15+", label: "Years in Operation", icon: Clock },
  { value: "₦3.2B+", label: "Total Savings", icon: PiggyBank },
  { value: "₦1.8B+", label: "Loans Disbursed", icon: HandCoins },
];

export const benefits = [
  { title: "Competitive Returns", description: "Earn up to 5% annual interest on your savings — higher than most commercial banks.", icon: TrendingUp },
  { title: "Affordable Loans", description: "Access loans at 12% annual rate, far below market rates, with flexible repayment.", icon: Wallet },
  { title: "Financial Discipline", description: "Mandatory monthly contributions help you build a strong savings habit.", icon: Target },
  { title: "Welfare & Support", description: "Emergency grants, bereavement support, and member welfare programs.", icon: Heart },
  { title: "Transparency", description: "Open books, regular AGMs, and elected governance you can trust.", icon: Shield },
  { title: "Community", description: "Join a network of Redeemer's University staff committed to mutual growth.", icon: Users },
];

export const loanTypes = [
  { title: "Emergency Loan", description: "Quick disbursement for urgent needs. Up to 2× savings balance.", icon: Heart, rate: "12%", tenure: "3–6 months" },
  { title: "Education Loan", description: "Fund tuition, training, or professional development.", icon: GraduationCap, rate: "12%", tenure: "6–12 months" },
  { title: "Business Loan", description: "Start or grow a side business with affordable capital.", icon: Briefcase, rate: "12%", tenure: "6–12 months" },
  { title: "Housing & Asset", description: "Acquire household items, electronics, or housing support.", icon: Home, rate: "12%", tenure: "12 months" },
];

export const howItWorksSteps = [
  { step: "01", title: "Join & Contribute", description: "Register and start monthly contributions (min. ₦50,000).", icon: Users },
  { step: "02", title: "Save & Earn", description: "Your savings earn 5% annual interest, credited quarterly.", icon: PiggyBank },
  { step: "03", title: "Borrow Affordably", description: "After 3 months, access loans up to 3× your savings at 12% p.a.", icon: HandCoins },
  { step: "04", title: "Repay & Grow", description: "Repay via monthly deductions. Your limit grows as you save.", icon: TrendingUp },
];

export const executives = [
  { name: "Prof. Akinwale Thompson", role: "President", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300" },
  { name: "Mrs. Folake Adeyemi", role: "Treasurer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300" },
  { name: "Dr. Uche Nwosu", role: "Secretary", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300" },
  { name: "Mr. Emmanuel Eze", role: "Loan Officer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300" },
];

export const testimonials = [
  { name: "Dr. Sarah Bamidele", role: "Lecturer, Sciences", quote: "RUNSMSL helped me fund my PhD research when I needed it most. The process was seamless and the rate unbeatable." },
  { name: "Mr. Chidi Okafor", role: "IT Department", quote: "I've been saving with RUNSMSL for 3 years. The discipline it instills and the returns I earn are worth every naira." },
  { name: "Mrs. Grace Obi", role: "Admin Officer", quote: "When my family faced an emergency, RUNSMSL disbursed my loan within 48 hours. This cooperative truly cares." },
];

export const news = [
  { date: "April 2026", title: "2025 Dividends Declared!", description: "Members to receive 8.5% dividend on savings. Payments commence May 15th." },
  { date: "March 2026", title: "Annual General Meeting", description: "AGM scheduled for March 28th at the University Auditorium." },
  { date: "February 2026", title: "New Housing Loan Scheme", description: "Up to ₦5M housing support loan for qualifying members." },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
];

export const faqs = [
  { q: "Who can join RUNSMSL?", a: "All confirmed staff of Redeemer's University with a valid @run.edu.ng email are eligible." },
  { q: "What is the minimum monthly contribution?", a: "₦50,000 per month, deducted from your salary. You can also make voluntary top-ups." },
  { q: "How much can I borrow?", a: "Up to 3× your total savings balance. E.g. ₦500,000 saved → up to ₦1,500,000 access." },
  { q: "How long does loan approval take?", a: "Most loans are reviewed within 24–48 hours. Emergencies may be same-day." },
  { q: "Can I withdraw my savings anytime?", a: "Mandatory savings on exit only. Voluntary savings: 30 days notice." },
  { q: "What if I miss a repayment?", a: "Reminder after 3 days. After 7 days, 1% penalty applies. We work with members on solutions." },
];

export const joinSteps = [
  { step: "1", title: "Apply", description: "Fill out the membership form with your staff ID." },
  { step: "2", title: "Pay Fee", description: "One-time ₦10,000 registration to activate." },
  { step: "3", title: "Setup Deduction", description: "Authorize monthly salary deduction via Bursary." },
  { step: "4", title: "Start Earning", description: "Account active! Save and access loans after 3 months." },
];
