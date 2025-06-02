const Header = () => (
  <header className="bg-[#0078BE] w-full">
    <nav className="flex items-center justify-between pl-12 pr-12 lg:pl-64 lg:pr-64 py-4">
      {/* Logo */}
      <div className="flex-shrink-0 text-white text-2xl font-bold">3DKL</div>
      {/* Links */}
      <ul className="flex-1 flex justify-center gap-8">
        <li><a href="/" className="text-white font-normal hover:text-gray-900">Início</a></li>
        <li><a href="#servicos" className="text-white font-normal hover:text-gray-900">Serviços</a></li>
        <li><a href="#materiais" className="text-white font-normal hover:text-gray-900">Materiais</a></li>
        <li><a href="#sobre" className="text-white font-normal hover:text-gray-900">Sobre Nós</a></li>
        <li><a href="#contato" className="text-white font-normal hover:text-gray-900">Contato</a></li>
      </ul>
      {/* Botão */}
      <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-normal shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Peça um orçamento</button>
    </nav>
  </header>
);

export default Header;