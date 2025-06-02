import React from "react";

const Home = () => {
  const [modal, setModal] = React.useState<null | 'plastico' | 'engenharia' | 'flexivel'>(null);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center overflow-x-hidden">
      <div className="w-full pl-12 pr-12 pt-20 lg:pl-64 lg:pr-64">
        <h2 className="text-4xl lg:text-5xl font-medium text-white mb-6 w-full lg:w-2/5">Trazendo sua ideia para realidade</h2>
        <p className="text-white text-lg mb-8 w-full lg:w-2/5">Com a 3DKL, sua ideia ganha vida através da tecnologia de impressão 3D FDM. Temos o objetivo de materializar ideias, desenvolver, melhorar ou reparar projetos. Venha fazer um orçamento com a gente</p>
        <div className="flex gap-4">
          <button className="bg-[#0078BE] text-white px-6 py-3 rounded font-normal hover:bg-[#005f94] transition">Peça um orçamento</button>
          <button className="bg-gray-700 text-white px-6 py-3 rounded font-normal hover:bg-gray-600 transition">Catálogo de materiais</button>
        </div>
        {/* Quadrante de serviços */}
        <div className="mt-10 w-full bg-transparent border-2 rounded-xl border-[#0078BE] p-3 flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#0078BE] overflow-hidden">
          <div className="py-5 px-6 text-white text-lg text-center flex-1">Impressão em 3D personalizada</div>
          <div className="py-5 px-6 text-white text-lg text-center flex-1">Ampla variedade de materiais</div>
          <div className="py-5 px-6 text-white text-lg text-center flex-1">Qualidade garantida</div>
          <div className="py-5 px-6 text-white text-lg text-center flex-1">Entrega Rápida</div>
        </div>
        {/* Seção de Serviços */}
                
        <section className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] mt-16 bg-gray-800 rounded-xl p-8 pl-12 pr-12 lg:pl-64 lg:pr-64">
          <h3 className="text-3xl font-semibold text-white mb-8 text-center">Nossos Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6 shadow text-white border-2" style={{ background: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <h4 className="text-xl font-bold mb-2">Prototipagem 3D</h4>
              <p>Oferecemos impressão 3D precisa e rápida para prototipagem. Transforme suas ideias em realidade com alta qualidade e custo-benefício. Trabalhamos com diversos materiais, ideal para desenvolvimento de produtos, design, pesquisa e mais. Faça seu projeto ganhar vida conosco!</p>
            </div>
            <div className="rounded-lg p-6 shadow text-white border-2" style={{ background: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <h4 className="text-xl font-bold mb-2">Impressão 3D personalizada</h4>
              <p>Criamos itens exclusivos com impressão 3D personalizada. Ideal para presentes, decoração e projetos especiais.</p>
            </div>
            <div className="rounded-lg p-6 shadow text-white border-2" style={{ background: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <h4 className="text-xl font-bold mb-2">Serviços de modelagem 3D</h4>
              <p>Oferecemos serviço completo de criação e impressão 3D. Desenvolvemos seu modelo 3D do zero e imprimimos com alta qualidade. Ideal para quem não tem um modelo pronto. Soluções personalizadas!!</p>
            </div>
            <div className="rounded-lg p-6 shadow text-white border-2" style={{ background: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <h4 className="text-xl font-bold mb-2">Acabamento especializado</h4>
              <p>Oferecemos acabamento premium para suas peças 3D. Cada projeto recebe tratamento personalizado, garantindo alta qualidade e detalhes perfeitos. Transforme suas impressões com um toque profissional e exclusivo.</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-[#0078BE] text-white px-8 py-3 rounded-full font-normal hover:bg-[#005f94] transition">Peça um orçamento</button>
          </div>
        </section>
        {/* Seção de Materiais */}
        <section className="w-screen pb-20 relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-gray-900 p-8 pl-12 pr-12 lg:pl-64 lg:pr-64">
          <h3 className="text-3xl font-semibold text-white mb-8 text-center">Materiais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow text-white flex flex-col items-center relative">
              <h4 className="text-xl font-bold mb-5 text-[#0078BE]">Materiais de Plástico</h4>
              <img src="/Material_1.avif" alt="Materiais de Plástico" className="mb-6 rounded" />
              <div className="w-full flex justify-center">
                <button onClick={() => setModal('plastico')} className="border border-[#0078BE] text-[#0078BE] px-6 py-2 rounded font-normal hover:bg-[#0078BE] hover:text-white transition">Saiba mais</button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow text-white flex flex-col items-center relative">
              <h4 className="text-xl font-bold mb-5 text-[#0078BE]">Materiais de Engenharia</h4>
              <img src="/Material_3.avif" alt="Materiais de Engenharia" className="mb-6 rounded" />
              <div className="w-full flex justify-center">
                <button onClick={() => setModal('engenharia')} className="border border-[#0078BE] text-[#0078BE] px-6 py-2 rounded font-normal hover:bg-[#0078BE] hover:text-white transition">Saiba mais</button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow text-white flex flex-col items-center relative">
              <h4 className="text-xl font-bold mb-5 text-[#0078BE]">Materiais Flexíveis</h4>
              <img src="/Material_2.avif" alt="Materiais Flexíveis" className="mb-6 rounded" />
              <div className="w-full flex justify-center">
                <button onClick={() => setModal('flexivel')} className="border border-[#0078BE] text-[#0078BE] px-6 py-2 rounded font-normal hover:bg-[#0078BE] hover:text-white transition">Saiba mais</button>
              </div>
            </div>
          </div>
          {/* Modais */}
          {modal === 'plastico' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl w-10 h-10 flex items-center justify-center" onClick={() => setModal(null)}>&times;</button>
                <h4 className="text-2xl font-bold mb-4 text-[#0078BE]">Materiais de Plástico</h4>
                <p>Os plásticos mais comuns para impressão 3D FDM são PLA e ABS. O PLA é biodegradável, fácil de imprimir e proporciona excelente acabamento superficial, sendo ideal para protótipos e peças decorativas. O ABS oferece alta resistência mecânica e térmica, sendo perfeito para peças funcionais e duráveis, mas requer impressora fechada para evitar deformações.</p>
                <div className="flex justify-center mt-8">
                  <button className="bg-[#0078BE] text-white px-8 py-3 rounded font-normal hover:bg-[#005f94] transition w-full">Peça um orçamento</button>
                </div>
              </div>
            </div>
          )}
          {modal === 'engenharia' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl w-10 h-10 flex items-center justify-center" onClick={() => setModal(null)}>&times;</button>
                <h4 className="text-2xl font-bold mb-4 text-[#0078BE]">Materiais de Engenharia</h4>
                <p>Materiais como PETG, Nylon e Policarbonato (PC) são voltados para aplicações técnicas. O PETG alia facilidade de impressão à alta durabilidade e resistência química. O Nylon é flexível, resistente ao impacto e ao desgaste, ideal para engrenagens e peças móveis. O PC é extremamente robusto, suportando altas temperaturas e esforços mecânicos, perfeito para peças de alta performance.</p>
                <div className="flex justify-center mt-8">
                  <button className="bg-[#0078BE] text-white px-8 py-3 rounded font-normal hover:bg-[#005f94] transition w-full">Peça um orçamento</button>
                </div>
              </div>
            </div>
          )}
          {modal === 'flexivel' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl w-10 h-10 flex items-center justify-center" onClick={() => setModal(null)}>&times;</button>
                <h4 className="text-2xl font-bold mb-4 text-[#0078BE]">Materiais Flexíveis</h4>
                <p>Materiais como TPU e TPE são elásticos e resistentes, ideais para peças que exigem flexibilidade, absorção de impacto e resistência à abrasão. São amplamente utilizados em protetores, vedações, suportes e componentes que precisam manter suas propriedades em diferentes condições de uso e temperatura.</p>
                <div className="flex justify-center mt-8">
                  <button className="bg-[#0078BE] text-white px-8 py-3 rounded font-normal hover:bg-[#005f94] transition w-full">Peça um orçamento</button>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* Seção de Clientes */}
        <section className="pb-16 relative">
          <span className="absolute -top-9 left-4 px-4 py-1 rounded-t-md text-white font-medium text-lg shadow bg-[#0078BE] border-b-0 z-10">Clientes</span>
          <div className="w-full bg-transparent border-2 rounded-xl border-[#0078BE] flex flex-col md:flex-row justify-center items-center gap-y-6 md:gap-x-20 p-6 overflow-x-auto md:overflow-x-auto">
            <img src="/Depoimento_1.avif" alt="Cliente 1" className="w-auto h-auto object-cover" />
            <div className="h-12 md:h-12 w-full md:w-auto border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-[#0078BE] md:border-[#0078BE]" />
            <img src="/Depoimento_2.avif" alt="Cliente 2" className="w-auto h-auto object-cover" />
            <div className="h-12 md:h-12 w-full md:w-auto border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-[#0078BE] md:border-[#0078BE]" />
            <img src="/Depoimento_3.avif" alt="Cliente 3" className="w-auto h-auto object-cover" />
            <div className="h-12 md:h-12 w-full md:w-auto border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-[#0078BE] md:border-[#0078BE]" />
            <img src="/Depoimento_4.avif" alt="Cliente 4" className="w-auto h-auto object-cover" />
            <div className="h-12 md:h-12 w-full md:w-auto border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-[#0078BE] md:border-[#0078BE]" />
            <img src="/Depoimento_5.avif" alt="Cliente 5" className="w-auto h-auto object-cover" />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow text-white flex flex-col items-center">
              <p className="italic mb-4 text-center">“A 3DKL superou minhas expectativas. Eles transformaram minha ideia em realidade de forma incrível.”</p>
              <span className="font-bold text-[#0078BE]">Leila Rosa</span>
              <span className="text-xs text-gray-300">Diretora de Produtos, Tech Solutions</span>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow text-white flex flex-col items-center">
              <p className="italic mb-4 text-center">“Estou impressionado com a qualidade e o profissionalismo da 3DKL. Recomendo seus serviços sem hesitação.”</p>
              <span className="font-bold text-[#0078BE]">Bento Dias</span>
              <span className="text-xs text-gray-300">Designer Chefe, InovaDesign</span>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow text-white flex flex-col items-center">
              <p className="italic mb-4 text-center">“A equipe da 3DKL é excepcional. Eles entenderam nossas necessidades e entregaram um trabalho excepcional.”</p>
              <span className="font-bold text-[#0078BE]">Rian Freitas</span>
              <span className="text-xs text-gray-300">Engenheiro de Projetos, FutureTech</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

// Tailwind CSS animation (adicione no seu arquivo global de estilos caso necessário):
// @keyframes modal-drop { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
// .animate-modal-drop { animation: modal-drop 0.3s ease-out; }