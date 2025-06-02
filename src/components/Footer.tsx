const Footer = () => (
  <footer className="bg-gray-800 text-white py-10 overflow-x-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm px-6">
      <div>
        <h5 className="font-bold mb-2">Estamos localizados em:</h5>
        <p>
          Avenida Dom Idílio José Soares - 142
          <br />
          Jardim São Paulo
          <br />
          Limeira / SP
        </p>
      </div>
      <div>
        <h5 className="font-bold mb-2">Contato:</h5>
        <p>( 19 ) 3449-6536</p>
      </div>
      <div>
        <h5 className="font-bold mb-2">Siga-nos</h5>
        <ul className="space-y-1">
          <li>
            <button className="hover:text-[#0078BE] transition bg-transparent border-none p-0 m-0 cursor-pointer">
              Facebook
            </button>
          </li>
          <li>
            <button className="hover:text-[#0078BE] transition bg-transparent border-none p-0 m-0 cursor-pointer">
              Instagram
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-end">
        <button className="mb-1 hover:text-[#0078BE] transition bg-transparent border-none p-0 m-0 cursor-pointer">
          Políticas de privacidade e cookies
        </button>
        <span className="text-xs">
          &copy; {new Date().getFullYear()} 3DKL. Todos os direitos reservados.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;