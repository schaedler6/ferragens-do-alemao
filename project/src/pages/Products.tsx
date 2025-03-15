import { useState } from 'react';
import { Search } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Furadeira de Impacto Profissional',
    price: 799.99,
    category: 'Ferramentas Elétricas',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Kit Chaves de Fenda Premium',
    price: 299.99,
    category: 'Ferramentas Manuais',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1581147036324-c1c88bb6eb4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Serra Circular Industrial',
    price: 1299.99,
    category: 'Ferramentas Elétricas',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400'
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-accent">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)}
                </p>
                <span className="text-sm text-gray-600">
                  Estoque: {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}