import { ArrowRight, Star, PenTool as Tool } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Furadeira de Impacto Profissional',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400',
    rating: 5
  },
  {
    id: 2,
    name: 'Kit Chaves de Fenda Premium',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1581147036324-c1c88bb6eb4e?auto=format&fit=crop&q=80&w=400',
    rating: 4
  },
  {
    id: 3,
    name: 'Serra Circular Industrial',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400',
    rating: 5
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[500px] bg-[url('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60">
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  Ferramentas do Alemão para Construção
                </h1>
                <p className="text-xl mb-8">
                  Qualidade e durabilidade para seus projetos
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center bg-primary text-accent px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-accent">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Tool className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Produtos de Qualidade</h3>
          <p className="text-gray-600">
            Oferecemos as melhores marcas e ferramentas do mercado
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Atendimento Premium</h3>
          <p className="text-gray-600">
            Equipe especializada para melhor atendê-lo
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Tool className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Garantia Estendida</h3>
          <p className="text-gray-600">
            Produtos com garantia e suporte técnico
          </p>
        </div>
      </section>
    </div>
  );
}