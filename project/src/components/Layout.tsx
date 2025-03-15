import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool as Tool, Users, ShoppingCart, Settings, Phone, Home } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Produtos', href: '/products', icon: Tool },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Pedidos', href: '/orders', icon: ShoppingCart },
  { name: 'Admin', href: '/admin', icon: Settings },
  { name: 'Contato', href: '/contact', icon: Phone },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-accent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Tool className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-white">
                Ferramentas do Alemão
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        isActive
                          ? 'bg-accent-light text-white'
                          : 'text-gray-300 hover:bg-accent-light hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium flex items-center'
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-accent mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-300">
            <p>© 2024 Ferramentas do Alemão para Construção. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}