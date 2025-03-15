import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  date: string;
  status: 'Pendente' | 'Em processamento' | 'Enviado' | 'Entregue' | 'Cancelado';
  items: OrderItem[];
  total: number;
}

const initialOrders: Order[] = [
  {
    id: 1,
    customerName: 'Albert Einstein',
    date: '2024-02-20',
    status: 'Entregue',
    items: [
      {
        id: 1,
        productName: 'Furadeira de Impacto Profissional',
        quantity: 1,
        price: 799.99
      },
      {
        id: 2,
        productName: 'Kit Chaves de Fenda Premium',
        quantity: 2,
        price: 299.99
      }
    ],
    total: 1399.97
  },
  {
    id: 2,
    customerName: 'Sigmund Freud',
    date: '2024-02-21',
    status: 'Em processamento',
    items: [
      {
        id: 3,
        productName: 'Serra Circular Industrial',
        quantity: 1,
        price: 1299.99
      }
    ],
    total: 1299.99
  }
];

const orderStatuses = [
  'Pendente',
  'Em processamento',
  'Enviado',
  'Entregue',
  'Cancelado'
] as const;

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<Order>();

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  const onSubmit = (data: Order) => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...data, id: editingOrder.id } : o));
    } else {
      setOrders([...orders, { ...data, id: orders.length + 1 }]);
    }
    setShowForm(false);
    setEditingOrder(null);
    reset();
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
    Object.entries(order).forEach(([key, value]) => {
      setValue(key as keyof Order, value);
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em processamento':
        return 'bg-blue-100 text-blue-800';
      case 'Enviado':
        return 'bg-purple-100 text-purple-800';
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Pedidos</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingOrder(null);
            reset();
          }}
          className="bg-primary text-accent px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Pedido
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Buscar pedidos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingOrder ? 'Editar Pedido' : 'Novo Pedido'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <input
                  {...register('customerName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data</label>
                <input
                  type="date"
                  {...register('date')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('total', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingOrder(null);
                  reset();
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-accent px-4 py-2 rounded-md"
              >
                {editingOrder ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    getStatusColor(order.status)
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatCurrency(order.total)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}