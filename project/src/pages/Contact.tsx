import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Entre em Contato</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-start space-x-4">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Telefone</h2>
            <p className="text-gray-600">(11) 93333-7777</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-600">contato@ferramentasdoalemao.com.br</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Endereço</h2>
            <p className="text-gray-600">
              Rua das Ferramentas, 33<br />
              Vila Industrial<br />
              São Paulo - SP<br />
              CEP: 03333-777
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Envie uma Mensagem</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-accent px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
}