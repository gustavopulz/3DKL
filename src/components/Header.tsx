import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-black w-full">
      <nav className="flex items-center justify-between pl-6 pr-6 lg:pl-64 lg:pr-64 py-4 relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/">
            <img src="/logo-nova.png" alt="Logo 3DKL" className="h-14 w-auto" />
          </a>
        </div>
        {/* Hamburger Icon */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </button>
        {/* Links */}
        <ul
          className={`flex-1 flex-col lg:flex-row flex justify-center lg:justify-center gap-4 lg:gap-8 lg:flex lg:static absolute top-full left-0 w-full bg-black lg:bg-transparent z-20 transition-all duration-300 ${
            menuOpen ? 'flex' : 'hidden'
          } lg:flex pl-8 lg:pl-0 pb-8 lg:pb-0`}
        >
          <li>
            <a href="/" className="text-white font-normal hover:text-gray-300">
              Início
            </a>
          </li>
          <li>
            <a
              href="#servicos"
              className="text-white font-normal hover:text-gray-300"
            >
              Serviços
            </a>
          </li>
          <li>
            <a
              href="#materiais"
              className="text-white font-normal hover:text-gray-300"
            >
              Materiais
            </a>
          </li>
          <li>
            <a
              href="#sobre"
              className="text-white font-normal hover:text-gray-300"
            >
              Sobre Nós
            </a>
          </li>
          <li>
            <a
              href="#contato"
              className="text-white font-normal hover:text-gray-300"
            >
              Contato
            </a>
          </li>
          <li className="block lg:hidden mt-2 w-3/4 mx-auto">
            <a href="#contato">
              <button className="bg-white text-black px-6 py-2 rounded-full font-normal shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-full">
                Peça um orçamento
              </button>
            </a>
          </li>
        </ul>
        {/* Botão desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#contato">
            <button className="bg-white text-black px-6 py-2 rounded-full font-normal shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              Peça um orçamento
            </button>
          </a>
          <a
            href="https://wa.me/1934496536?text=Olá%2C%20tudo%20bem%3F%20Vim%20pelo%20site%2C%20gostaria%20de%20um%20orçamento%21"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-green-500 text-2xl hover:scale-110 transition-transform"
          >
            <FaWhatsapp />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
