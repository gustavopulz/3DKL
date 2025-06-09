const TyF = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
    <div className="max-w-lg w-full bg-gray-900 rounded-lg shadow p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-[#0078BE]">
        Obrigado pelo seu contato!
      </h1>
      <p className="text-lg mb-6">
        Recebemos sua solicitação e em breve nossa equipe entrará em contato
        para dar andamento ao seu orçamento.
      </p>
      <a
        href="/"
        className="inline-block mt-4 bg-[#0078BE] text-white px-6 py-2 rounded-full font-normal shadow hover:bg-[#005f94] transition"
      >
        Voltar para o início
      </a>
    </div>
  </div>
);

export default TyF;
