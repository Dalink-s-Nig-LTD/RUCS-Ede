import { useState } from 'react';
import { products as initialProducts, formatCurrency } from '@/data/mockData';
import { Search, Plus, Edit, Trash2, ImageIcon, X, Check } from 'lucide-react';

export const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productList, setProductList] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form, setForm] = useState({ name: '', category: 'Electronics', price: 0, stock_quantity: 0, description: '', image_url: '' });

  const filteredProducts = productList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenModal = (product?: any) => {
    if (product) { setEditingProduct(product); setForm({ name: product.name, category: product.category, price: product.price, stock_quantity: product.stock_quantity, description: product.description || '', image_url: product.image_url || '' }); }
    else { setEditingProduct(null); setForm({ name: '', category: 'Electronics', price: 0, stock_quantity: 0, description: '', image_url: '' }); }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || form.price <= 0) return;
    if (editingProduct) { setProductList(productList.map(p => p.id === editingProduct.id ? { ...p, ...form } : p)); }
    else { setProductList([...productList, { id: `p${Date.now()}`, ...form, is_active: true }]); }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => { if(window.confirm('Are you sure?')) setProductList(productList.filter(p => p.id !== id)); };

  return (
    <div className="space-y-8 relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name</label><input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder='e.g. HP Laptop 15.6"' /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label><select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}><option value="Electronics">Electronics</option><option value="Household">Household</option><option value="Groceries">Groceries</option></select></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (₦)</label><input type="number" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.price || ''} onChange={(e) => setForm({...form, price: Number(e.target.value)})} /></div>
              </div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock Quantity</label><input type="number" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.stock_quantity || ''} onChange={(e) => setForm({...form, stock_quantity: Number(e.target.value)})} /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label><textarea className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-24" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Image URL</label><input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="https://..." /></div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!form.name || form.price <= 0} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"><Check className="w-4 h-4" /> {editingProduct ? 'Save Changes' : 'Add Product'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div><h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h1><p className="text-slate-500 mt-1">Manage the cooperative shop catalogue.</p></div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px] md:w-72"><Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <button onClick={() => handleOpenModal()} className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-sm transition-colors shrink-0"><Plus className="w-5 h-5 mr-2" />Add Product</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Product Info</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-right text-xs font-extrabold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-200 shadow-sm">
                        {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-400" />}
                      </div>
                      <div><p className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</p><p className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-xs">{product.description}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">{product.category}</span></td>
                  <td className="px-6 py-5"><p className="text-sm font-extrabold text-slate-900">{formatCurrency(product.price)}</p></td>
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${product.stock_quantity > 5 ? 'bg-emerald-500' : product.stock_quantity > 0 ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                      <span className={`text-sm font-bold ${product.stock_quantity > 0 ? 'text-slate-700' : 'text-red-600'}`}>{product.stock_quantity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(product)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && <div className="text-center py-12 text-slate-500">No products found.</div>}
      </div>
    </div>
  );
};
