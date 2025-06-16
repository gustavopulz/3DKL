import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Footer = () => (
  <footer className="bg-black text-white pt-12 pb-6 px-4 md:px-0 overflow-x-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm items-start">
      <div className="flex flex-col items-center gap-2">
        <img
          src="/logo-nova.png"
          alt="Logo 3DKL"
          className="h-20 w-auto mb-2"
        />
      </div>
      <div className="flex flex-col items-start md:items-center">
        <h5 className="font-bold mb-2 text-orange-500 text-base md:text-lg w-full text-left md:text-center">
          Localização
        </h5>
        <p className="text-gray-300 w-full text-left md:text-center">
          Av. Dom Idílio José Soares, 142
          <br />
          Jardim São Paulo
          <br />
          Limeira / SP
        </p>
      </div>
      <div className="flex flex-col items-start md:items-center">
        <h5 className="font-bold mb-2 text-orange-500 text-base md:text-lg w-full text-left md:text-center">
          Contato
        </h5>
        <p className="text-gray-300 w-full text-left md:text-center">
          (19) 3449-6536
        </p>
        <p className="text-gray-300 mt-1 w-full text-left md:text-center">
          contato@3dkl.com.br
        </p>
      </div>
      <div className="flex flex-col items-start md:items-center">
        <h5 className="font-bold mb-2 text-orange-500 text-base md:text-lg w-full text-left md:text-center">
          Siga-nos
        </h5>
        <div className="flex gap-4 mt-1 w-full justify-start md:justify-center">
          <a
            href="https://www.facebook.com/people/3D-KL-impress%C3%B5es-3D/100083399313905/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-orange-500 transition text-xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/3dklimpressao3d/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[#E4405F] transition text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@3dklimpressao3d"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:text-blue-300 transition text-xl"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-[#808080] mt-10 pt-6 flex flex-col items-center space-y-2 text-xs">
      <a
        href="politica-de-privacidade"
        className="hover:text-orange-500 transition"
      >
        Políticas de privacidade e cookies
      </a>
      <span className="text-gray-400">
        &copy; {new Date().getFullYear()} 3D KL Impressão 3D. Todos os direitos
        reservados.
      </span>
    </div>
  </footer>
);

export default Footer;
