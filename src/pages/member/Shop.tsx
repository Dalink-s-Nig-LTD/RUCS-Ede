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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Cooperative Shop</h1>
          <p className="text-muted-foreground text-sm mt-1">Browse available products and request on loan.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="w-9 h-9 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-1 -mx-1 px-1 gap-1.5">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${category === cat ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} onClick={() => navigate(`/member/shop/${product.id}`)} className="group bg-card rounded-xl border border-border overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              {product.stock_quantity === 0 && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-3 py-1.5 bg-card/90 text-foreground font-bold rounded-full text-xs uppercase tracking-wider">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{product.category}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${product.stock_quantity > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Unavailable'}
                </span>
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm line-clamp-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <p className="text-base font-heading font-bold text-foreground">{formatCurrency(product.price)}</p>
                  <p className="text-[10px] text-muted-foreground">From {formatCurrency(product.price / 12)}/mo</p>
                </div>
                <button disabled={product.stock_quantity === 0} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground disabled:opacity-40 disabled:group-hover:bg-secondary disabled:group-hover:text-muted-foreground">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-muted-foreground mb-3">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-1">No products found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
