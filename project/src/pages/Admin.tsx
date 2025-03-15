import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart, Users, Package, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import Dashboard from './admin/Dashboard';
import ProductsManagement from './admin/ProductsManagement';
import CustomersManagement from './admin/CustomersManagement';
import OrdersManagement from './admin/OrdersManagement';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart },
  { name: 'Produtos', href: '/admin/products', icon: Package },
  { name: 'Clientes', href: '/admin/customers', icon: Users },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingCart },
];

export default function Admin() {
  const location = useLocation();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-4 space-y-2">
          {adminNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? 'bg-primary text-accent'
                    : 'text-gray-600 hover:bg-gray-100',
                  'flex items-center px-4 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="customers" element={<CustomersManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
        </Routes>
      </main>
    </div>
  );
}