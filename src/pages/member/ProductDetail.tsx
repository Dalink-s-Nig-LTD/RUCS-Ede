import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, formatCurrency } from '@/data/mockData';
import { ArrowLeft, Info, PackageOpen, CheckCircle, Clock } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState(12);
  const [note, setNote] = useState('');

  if (!product) return <div>Product not found</div>;

  const totalAmount = product.price * quantity;
  const interestRate = 0.05;
  const totalRepayment = totalAmount + (totalAmount * interestRate);
  const monthlyDeduction = totalRepayment / duration;

  const handleRequest = () => {
    alert('Loan request submitted successfully!');
    navigate('/member/loans');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button onClick={() => navigate('/member/shop')} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center justify-center">
          <div className="aspect-square w-full relative">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full">{product.category}</span>
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 ${product.stock_quantity > 0 ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-600'}`}>
                {product.stock_quantity > 0 ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">{product.name}</h1>
            <p className="text-lg text-slate-500">{product.description}</p>
            <div className="text-3xl font-black text-slate-900 mt-4 mb-8">{formatCurrency(product.price)}</div>
          </div>

          <hr className="border-slate-100" />

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-emerald-600" />Loan Calculator
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity</label>
                <div className="flex items-center">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-l-lg text-slate-600 hover:bg-slate-50">-</button>
                  <input type="number" value={quantity} readOnly className="w-16 h-10 bg-white border-y border-slate-200 text-center text-sm font-semibold text-slate-900 outline-none" />
                  <button onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-r-lg text-slate-600 hover:bg-slate-50">+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration (Months)</label>
                <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none">
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={9}>9 Months</option>
                  <option value={12}>12 Months</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Principal Amount</span>
                <span className="font-semibold text-slate-900">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center">Interest <Info className="w-3.5 h-3.5 ml-1 text-slate-400" /></span>
                <span className="font-semibold text-slate-900">5% flat</span>
              </div>
              <hr className="border-slate-100" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Monthly Deduction</span>
                <span className="text-2xl font-black text-emerald-600">{formatCurrency(monthlyDeduction)}</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Optional Note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any justification or specific details..." className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none h-20" />
            </div>
            
            <button onClick={handleRequest} disabled={product.stock_quantity === 0} className="w-full mt-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
              Request on Loan
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">Subject to cooperative approval and limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
