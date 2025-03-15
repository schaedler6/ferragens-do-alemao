import { useEffect, useState } from 'react';
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Package, 
  AlertCircle,
  DollarSign,
  Users,
  ShoppingCart
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { formatCurrency, cn } from '../../lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const salesData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Vendas Mensais',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      backgroundColor: '#FFD700',
      borderColor: '#E6C200',
      borderWidth: 1,
    },
  ],
};

const stockData = {
  labels: ['Ferramentas Elétricas', 'Ferramentas Manuais', 'Equipamentos', 'Acessórios'],
  datasets: [
    {
      label: 'Quantidade em Estoque',
      data: [150, 200, 80, 300],
      backgroundColor: [
        '#FFD700',
        '#1E40AF',
        '#111827',
        '#4B5563',
      ],
    },
  ],
};

const metrics = [
  {
    name: 'Vendas Totais',
    value: 'R$ 156.789,00',
    change: '+12.5%',
    icon: DollarSign,
  },
  {
    name: 'Clientes Ativos',
    value: '1.234',
    change: '+3.2%',
    icon: Users,
  },
  {
    name: 'Pedidos Pendentes',
    value: '42',
    change: '-5.1%',
    icon: ShoppingCart,
  },
  {
    name: 'Produtos em Baixa',
    value: '15',
    change: '+2.3%',
    icon: AlertCircle,
  },
];

const lowStockProducts = [
  { id: 1, name: 'Furadeira de Impacto', stock: 3, minStock: 5 },
  { id: 2, name: 'Serra Circular', stock: 2, minStock: 5 },
  { id: 3, name: 'Chave de Fenda Phillips', stock: 4, minStock: 10 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{metric.name}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              </div>
              <metric.icon className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4">
              <span className={cn(
                "text-sm font-medium",
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              )}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500"> vs mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Vendas Mensais</h2>
          <Line data={salesData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Distribuição do Estoque</h2>
          <Bar data={stockData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Produtos com Estoque Baixo</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Mínimo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Estoque Baixo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}