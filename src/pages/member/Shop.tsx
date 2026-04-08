import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, formatCurrency } from '@/data/mockData';
import { Search, Filter, ShoppingCart } from 'lucide-react';

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = category === 'All' || p.category === category;
    return matchesSearch && matchesCat && p.is_active;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cooperative Shop</h1>
          <p className="text-slate-500 mt-1">Browse available products and request on loan.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="flex items-center justify-center w-11 h-11 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} onClick={() => navigate(`/member/shop/${product.id}`)} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              {product.stock_quantity === 0 && (
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-4 py-2 bg-white/90 text-slate-900 font-bold rounded-full text-sm uppercase tracking-wider">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{product.category}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.stock_quantity > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Unavailable'}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <p className="text-lg font-extrabold text-slate-900">{formatCurrency(product.price)}</p>
                  <p className="text-xs text-slate-500">From {formatCurrency(product.price / 12)}/mo</p>
                </div>
                <button disabled={product.stock_quantity === 0} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 transition-colors group-hover:bg-emerald-600 group-hover:text-white disabled:opacity-50 disabled:group-hover:bg-slate-100 disabled:group-hover:text-slate-400">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
