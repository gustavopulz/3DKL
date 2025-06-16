const TyF = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black/70 text-white px-4">
    <div className="max-w-lg w-full p-8 text-center">
      <h1 className="text-3xl mb-4 font-bold text-orange-500">
        Obrigado pelo seu contato!
      </h1>
      <p className="text-lg mb-6">
        Recebemos sua solicitação e em breve nossa equipe entrará em contato
        para dar andamento ao seu orçamento.
      </p>
      <a
        href="/"
        className="inline-block mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-normal shadow hover:bg-orange-600 transition"
      >
        Voltar para o início
      </a>
    </div>
  </div>
);

export default TyF;
