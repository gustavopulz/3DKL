import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Hook para detectar quando o elemento entra na tela
function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.1
): [React.RefObject<T>, boolean] {
  const ref = React.useRef<T>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  // Força o tipo para evitar erro de tipagem do React
  return [ref as React.RefObject<T>, isVisible];
}

// Componente para imagem de cliente com animação ao entrar na tela
function ClienteImage({ src, alt }: { src: string; alt: string }) {
  const [imgRef, imgVisible] = useInView<HTMLImageElement>(0.2);
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`w-auto h-auto object-cover transition-all duration-700 ease-out ${imgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    />
  );
}

// Componente para depoimento com animação ao entrar na tela
function ClienteDepoimento({
  text,
  name,
  role,
}: {
  text: string;
  name: string;
  role: string;
}) {
  const [depRef, depVisible] = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={depRef}
      className={`bg-gray-800 rounded-xl p-6 shadow text-white flex flex-col items-center transition-all duration-700 ease-out ${depVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="italic mb-4 text-center">{text}</p>
      <span className="font-bold text-[#0078BE]">{name}</span>
      <span className="text-xs text-gray-300">{role}</span>
    </div>
  );
}

// Componente para animar qualquer seção ao entrar na tela
function SectionInView({
  children,
  className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  const [ref, visible] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

// Componente de F.A.Q com expansão
function FaqItem({
  number,
  question,
  answer,
}: {
  number: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={`bg-gray-800 rounded-lg p-6 shadow text-white w-full cursor-pointer transition-all duration-300 ${open ? 'mb-2' : ''}`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#0078BE]">{number}</span>
          <h4 className="text-lg font-medium">{question}</h4>
        </div>
        <span className="transition-transform duration-300 text-2xl text-[#0078BE]">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-200">{answer}</p>
      </div>
    </div>
  );
}

const Home = () => {
  const [modal, setModal] = React.useState<
    null | 'plastico' | 'engenharia' | 'flexivel'
  >(null);

  const [form, setForm] = React.useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    empresa: '',
    descricao: '',
    mensagem: '',
  });

  return (
    <div className="min-h-screen bg-gray-900 flex items-center overflow-x-hidden">
      <div className="w-full pl-12 pr-12 pt-20 lg:pl-64 lg:pr-64">
        <SectionInView>
          <h2 className="text-4xl lg:text-5xl font-medium text-white mb-6 w-full lg:w-2/5">
            Trazendo sua ideia para realidade
          </h2>
        </SectionInView>
        <SectionInView>
          <p className="text-white text-lg mb-8 w-full lg:w-2/5">
            Com a 3DKL, sua ideia ganha vida através da tecnologia de impressão
            3D FDM. Temos o objetivo de materializar ideias, desenvolver,
            melhorar ou reparar projetos. Venha fazer um orçamento com a gente
          </p>
        </SectionInView>
        <SectionInView>
          <div className="flex gap-4">
            <button className="bg-[#0078BE] text-white px-6 py-3 rounded font-normal hover:bg-[#005f94] transition">
              Peça um orçamento
            </button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded font-normal hover:bg-gray-600 transition">
              Catálogo de materiais
            </button>
          </div>
        </SectionInView>
        {/* Quadrante de serviços */}
        <SectionInView>
          <div className="mt-10 w-full bg-transparent border-2 rounded-xl border-[#0078BE] p-3 flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#0078BE] overflow-hidden">
            <div className="py-5 px-6 text-white text-lg text-center flex-1">
              Impressão em 3D personalizada
            </div>
            <div className="py-5 px-6 text-white text-lg text-center flex-1">
              Ampla variedade de materiais
            </div>
            <div className="py-5 px-6 text-white text-lg text-center flex-1">
              Qualidade garantida
            </div>
            <div className="py-5 px-6 text-white text-lg text-center flex-1">
              Entrega Rápida
            </div>
          </div>
        </SectionInView>
        {/* Seção de Serviços */}
        <SectionInView>
          <section className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] mt-16 bg-gray-800 rounded-xl p-8 pl-12 pr-12 lg:pl-64 lg:pr-64">
            <h3 className="text-3xl font-medium text-white mb-8 text-center">
              Nossos Serviços
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {[
                {
                  title: 'Prototipagem 3D',
                  desc: 'Oferecemos impressão 3D precisa e rápida para prototipagem. Transforme suas ideias em realidade com alta qualidade e custo-benefício. Trabalhamos com diversos materiais, ideal para desenvolvimento de produtos, design, pesquisa e mais. Faça seu projeto ganhar vida conosco!',
                },
                {
                  title: 'Impressão 3D personalizada',
                  desc: 'Criamos itens exclusivos com impressão 3D personalizada. Ideal para presentes, decoração e projetos especiais.',
                },
                {
                  title: 'Serviços de modelagem 3D',
                  desc: 'Oferecemos serviço completo de criação e impressão 3D. Desenvolvemos seu modelo 3D do zero e imprimimos com alta qualidade. Ideal para quem não tem um modelo pronto. Soluções personalizadas!!',
                },
                {
                  title: 'Acabamento especializado',
                  desc: 'Oferecemos acabamento premium para suas peças 3D. Cada projeto recebe tratamento personalizado, garantindo alta qualidade e detalhes perfeitos. Transforme suas impressões com um toque profissional e exclusivo.',
                },
              ].map((serv) => (
                <SectionInView key={serv.title}>
                  <div
                    className="rounded-lg p-6 shadow text-white border-2 h-full flex flex-col"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <h4 className="text-xl font-bold mb-2">{serv.title}</h4>
                    <p>{serv.desc}</p>
                  </div>
                </SectionInView>
              ))}
            </div>
            <SectionInView>
              <div className="flex justify-center mt-8">
                <button className="bg-[#0078BE] text-white px-8 py-3 rounded-full font-normal hover:bg-[#005f94] transition">
                  Peça um orçamento
                </button>
              </div>
            </SectionInView>
          </section>
        </SectionInView>
        {/* Seção de Materiais */}
        <SectionInView>
          <section className="w-screen pb-20 relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-gray-900 p-8 pl-12 pr-12 lg:pl-64 lg:pr-64">
            <h3 className="text-3xl font-medium text-white mb-8 text-center">
              Materiais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Materiais de Plástico',
                  img: '/Material_1.avif',
                  alt: 'Materiais de Plástico',
                  onClick: () => setModal('plastico'),
                },
                {
                  title: 'Materiais de Engenharia',
                  img: '/Material_3.avif',
                  alt: 'Materiais de Engenharia',
                  onClick: () => setModal('engenharia'),
                },
                {
                  title: 'Materiais Flexíveis',
                  img: '/Material_2.avif',
                  alt: 'Materiais Flexíveis',
                  onClick: () => setModal('flexivel'),
                },
              ].map((mat) => (
                <SectionInView key={mat.title}>
                  <div className="bg-gray-800 rounded-lg p-6 shadow text-white flex flex-col items-center relative">
                    <h4 className="text-xl font-bold mb-5 text-[#0078BE]">
                      {mat.title}
                    </h4>
                    <img src={mat.img} alt={mat.alt} className="mb-6 rounded" />
                    <div className="w-full flex justify-center">
                      <button
                        onClick={mat.onClick}
                        className="border border-[#0078BE] text-[#0078BE] px-6 py-2 rounded font-normal hover:bg-[#0078BE] hover:text-white transition"
                      >
                        Saiba mais
                      </button>
                    </div>
                  </div>
                </SectionInView>
              ))}
            </div>
            {/* Modais removidos daqui */}
          </section>
        </SectionInView>
        {/* Modais de Materiais - fora do SectionInView para evitar problemas de centralização */}
        {modal === 'plastico' && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl w-10 h-10 flex items-center justify-center"
                onClick={() => setModal(null)}
              >
                &times;
              </button>
              <h4 className="text-2xl font-bold mb-4 text-[#0078BE]">
                Materiais de Plástico
              </h4>
              <p>
                Os plásticos mais comuns para impressão 3D FDM são PLA e ABS. O
                PLA é biodegradável, fácil de imprimir e proporciona excelente
                acabamento superficial, sendo ideal para protótipos e peças
                decorativas. O ABS oferece alta resistência mecânica e térmica,
                sendo perfeito para peças funcionais e duráveis, mas requer
                impressora fechada para evitar deformações.
              </p>
              <div className="flex justify-center mt-8">
                <button className="bg-[#0078BE] text-white px-8 py-3 rounded font-normal hover:bg-[#005f94] transition w-full">
                  Peça um orçamento
                </button>
              </div>
            </div>
          </div>
        )}
        {modal === 'engenharia' && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl w-10 h-10 flex items-center justify-center"
                onClick={() => setModal(null)}
              >
                &times;
              </button>
              <h4 className="text-2xl font-bold mb-4 text-[#0078BE]">
                Materiais de Engenharia
              </h4>
              <p>
                Materiais como PETG, Nylon e Policarbonato (PC) são voltados
                para aplicações técnicas. O PETG alia facilidade de impressão à
                alta durabilidade e resistência química. O Nylon é flexível,
                resistente ao impacto e ao desgaste, ideal para engrenagens e
                peças móveis. O PC é extremamente robusto, suportando altas
                temperaturas e esforços mecânicos, perfeito para peças de alta
                performance.
              </p>
              <div className="flex justify-center mt-8">
                <button className="bg-[#0078BE] text-white px-8 py-3 rounded font-normal hover:bg-[#005f94] transition w-full">
                  Peça um orçamento
                </button>
              </div>
            </div>
          </div>
        )}
        {modal === 'flexivel' && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl w-10 h-10 flex items-center justify-center"
                onClick={() => setModal(null)}
              >
                &times;
              </button>
              <h4 className="text-2xl font-bold mb-4 text-[#0078BE]">
                Materiais Flexíveis
              </h4>
              <p>
                Materiais como TPU e TPE são elásticos e resistentes, ideais
                para peças que exigem flexibilidade, absorção de impacto e
                resistência à abrasão. São amplamente utilizados em protetores,
                vedações, suportes e componentes que precisam manter suas
                propriedades em diferentes condições de uso e temperatura.
              </p>
              <div className="flex justify-center mt-8">
                <button className="bg-[#0078BE] text-white px-8 py-3 rounded font-normal hover:bg-[#005f94] transition w-full">
                  Peça um orçamento
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Seção de Clientes */}
        <section className="pb-16 relative">
          <span className="absolute -top-9 left-4 px-4 py-1 rounded-t-md text-white font-medium text-lg shadow bg-[#0078BE] border-b-0 z-10">
            Clientes
          </span>
          <div className="w-full bg-transparent border-2 rounded-xl border-[#0078BE] flex flex-col md:flex-row justify-center items-center gap-y-6 md:gap-x-20 p-6 overflow-x-auto md:overflow-x-auto">
            {[
              '/Depoimento_1.avif',
              '/Depoimento_2.avif',
              '/Depoimento_3.avif',
              '/Depoimento_4.avif',
              '/Depoimento_5.avif',
            ].map((src, idx) => (
              <React.Fragment key={src}>
                <ClienteImage src={src} alt={`Cliente ${idx + 1}`} />
                {idx < 4 && (
                  <div className="h-12 md:h-12 w-full md:w-auto border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-[#0078BE] md:border-[#0078BE]" />
                )}
              </React.Fragment>
            ))}
          </div>
          <SectionInView>
            <h3 className="text-3xl font-medium text-white mb-4 mt-12 text-center">
              Depoimentos
            </h3>
          </SectionInView>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: '“A 3DKL superou minhas expectativas. Eles transformaram minha ideia em realidade de forma incrível.”',
                name: 'Leila Rosa',
                role: 'Diretora de Produtos, Tech Solutions',
              },
              {
                text: '“Estou impressionado com a qualidade e o profissionalismo da 3DKL. Recomendo seus serviços sem hesitação.”',
                name: 'Bento Dias',
                role: 'Designer Chefe, InovaDesign',
              },
              {
                text: '“A equipe da 3DKL é excepcional. Eles entenderam nossas necessidades e entregaram um trabalho excepcional.”',
                name: 'Rian Freitas',
                role: 'Engenheiro de Projetos, FutureTech',
              },
            ].map((dep) => (
              <ClienteDepoimento
                key={dep.name}
                text={dep.text}
                name={dep.name}
                role={dep.role}
              />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button className="bg-[#0078BE] text-white px-8 py-3 rounded-full font-normal hover:bg-[#005f94] transition">
              Peça um orçamento
            </button>
          </div>
        </section>
        {/* Seção de F.A.Q */}
        <SectionInView>
          <section className="w-full md:px-12 mb-20">
            <h3 className="text-3xl font-medium text-white mb-8 text-start">
              F.A.Q
            </h3>
            <div className="flex flex-col md:flex-row md:space-x-12 items-stretch w-full">
              {/* FAQ */}
              <div className="flex flex-col gap-6 w-full md:w-1/2">
                {[
                  {
                    q: 'Quais arquivos posso enviar para orçamento?',
                    a: 'Você pode enviar arquivos STL, OBJ, STEP ou imagens/desenhos para análise. Se não tiver um modelo 3D, também desenvolvemos para você.',
                  },
                  {
                    q: 'Quais materiais vocês oferecem?',
                    a: 'Trabalhamos com plásticos (PLA, ABS), materiais de engenharia (PETG, Nylon, PC) e flexíveis (TPU, TPE).',
                  },
                  {
                    q: 'Qual o prazo de produção?',
                    a: 'O prazo depende do tamanho e complexidade do projeto, mas geralmente varia de 2 a 7 dias úteis.',
                  },
                  {
                    q: 'Vocês entregam para todo o Brasil?',
                    a: 'Sim, enviamos para todo o Brasil via transportadora ou Correios.',
                  },
                ].map((item, idx) => (
                  <FaqItem
                    key={item.q}
                    number={idx + 1}
                    question={item.q}
                    answer={item.a}
                  />
                ))}
              </div>

              {/* Formulário */}
              <form className="bg-gray-800 rounded-lg p-8 shadow text-white flex flex-col gap-4 w-full md:w-1/2 justify-between mt-10 md:mt-0">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] peer placeholder-transparent"
                        placeholder="Nome"
                        required
                        value={form.nome}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, nome: e.target.value }))
                        }
                      />
                      <label
                        htmlFor="nome"
                        className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                      >
                        Nome
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="sobrenome"
                        name="sobrenome"
                        type="text"
                        className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] peer placeholder-transparent"
                        placeholder="Sobrenome"
                        required
                        value={form.sobrenome}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, sobrenome: e.target.value }))
                        }
                      />
                      <label
                        htmlFor="sobrenome"
                        className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                      >
                        Sobrenome
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] peer placeholder-transparent"
                        placeholder="E-mail"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                      >
                        E-mail
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] peer placeholder-transparent"
                        placeholder="Telefone"
                        required
                        value={form.telefone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, telefone: e.target.value }))
                        }
                      />
                      <label
                        htmlFor="telefone"
                        className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                      >
                        Telefone
                      </label>
                    </div>
                  </div>

                  <div className="relative mt-4">
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] peer placeholder-transparent"
                      placeholder="Empresa"
                      required
                      value={form.empresa}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, empresa: e.target.value }))
                      }
                    />
                    <label
                      htmlFor="empresa"
                      className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                    >
                      Empresa
                    </label>
                  </div>

                  <div className="relative mt-4">
                    <input
                      id="descricao"
                      name="descricao"
                      type="text"
                      className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] peer placeholder-transparent"
                      placeholder="Descrição do Projeto"
                      required
                      value={form.descricao}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, descricao: e.target.value }))
                      }
                    />
                    <label
                      htmlFor="descricao"
                      className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                    >
                      Descrição do Projeto
                    </label>
                  </div>

                  <div className="relative mt-4">
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={3}
                      className="w-full rounded px-3 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:border-[#0078BE] resize-none peer placeholder-transparent"
                      placeholder="Mensagem"
                      required
                      value={form.mensagem}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, mensagem: e.target.value }))
                      }
                    />
                    <label
                      htmlFor="mensagem"
                      className="absolute left-3 top-2 text-sm text-gray-400 transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#0078BE]
    peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#0078BE]"
                    >
                      Mensagem
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#0078BE] text-white px-8 py-3 rounded-full font-normal hover:bg-[#005f94] transition mt-2"
                >
                  Enviar e-mail
                </button>
              </form>
            </div>
          </section>
        </SectionInView>
      </div>
    </div>
  );
};

export default Home;
