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
    if (editingProduct) setProductList(productList.map(p => p.id === editingProduct.id ? { ...p, ...form } : p));
    else setProductList([...productList, { id: `p${Date.now()}`, ...form, is_active: true }]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => { if (window.confirm('Are you sure?')) setProductList(productList.filter(p => p.id !== id)); };

  return (
    <div className="space-y-6 relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-card rounded-xl w-full max-w-lg border border-border shadow-xl overflow-hidden animate-fade-in">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-secondary/50">
              <h3 className="font-heading font-bold text-foreground text-sm">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
              <div><label className="block text-xs font-medium text-muted-foreground mb-1">Product Name</label><input type="text" className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder='e.g. HP Laptop 15.6"' /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-muted-foreground mb-1">Category</label><select className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option value="Electronics">Electronics</option><option value="Household">Household</option><option value="Groceries">Groceries</option></select></div>
                <div><label className="block text-xs font-medium text-muted-foreground mb-1">Price (₦)</label><input type="number" className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} /></div>
              </div>
              <div><label className="block text-xs font-medium text-muted-foreground mb-1">Stock Quantity</label><input type="number" className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={form.stock_quantity || ''} onChange={e => setForm({ ...form, stock_quantity: Number(e.target.value) })} /></div>
              <div><label className="block text-xs font-medium text-muted-foreground mb-1">Description</label><textarea className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-muted-foreground mb-1">Image URL</label><input type="text" className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
            </div>
            <div className="px-5 py-3 bg-secondary/50 border-t border-border flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-md transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!form.name || form.price <= 0} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md flex items-center gap-1.5 hover:opacity-90 transition-all disabled:opacity-40"><Check className="w-3.5 h-3.5" />{editingProduct ? 'Save' : 'Add Product'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the cooperative shop catalogue.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[140px] sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all shrink-0">
            <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden shrink-0 flex items-center justify-center border border-border">
                {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{product.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-heading font-bold text-foreground">{formatCurrency(product.price)}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-secondary text-muted-foreground border border-border">{product.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${product.stock_quantity > 5 ? 'bg-success' : product.stock_quantity > 0 ? 'bg-warning' : 'bg-destructive'}`} />
                  <span className="text-xs font-semibold text-foreground">{product.stock_quantity}</span>
                </div>
                <button onClick={() => handleOpenModal(product)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="bg-card rounded-xl border border-border overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden shrink-0 flex items-center justify-center border border-border">
                        {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <ImageIcon className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1 max-w-xs">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground border border-border">{product.category}</span></td>
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatCurrency(product.price)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${product.stock_quantity > 5 ? 'bg-success' : product.stock_quantity > 0 ? 'bg-warning' : 'bg-destructive'}`} />
                      <span className={`text-sm font-semibold ${product.stock_quantity > 0 ? 'text-foreground' : 'text-destructive'}`}>{product.stock_quantity}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleOpenModal(product)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground">No products found.</div>}
      </div>

      {filteredProducts.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground md:hidden">No products found.</div>}
    </div>
  );
};
