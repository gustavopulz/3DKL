import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import whatsappIcon from '/whatsapp.svg';
import { useNavigate } from 'react-router-dom';

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

  return [ref as React.RefObject<T>, isVisible];
}

function ClienteDepoimento({
  text,
  name,
  role,
}: {
  text: string;
  name: React.ReactNode;
  role: string;
}) {
  const [depRef, depVisible] = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={depRef}
      className={`bg-[#808080]/40 rounded-xl p-6 shadow text-white flex flex-col items-start transition-all duration-700 ease-out ${depVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="italic mb-4 text-start">{text}</p>
      <span className="font-medium text-orange-500 ">{name}</span>
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
      className={`bg-black/50 rounded-lg p-6 shadow text-white w-full cursor-pointer transition-all duration-300 ${open ? 'mb-2' : ''}`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-medium text-orange-500">{number}</span>
          <h4 className="text-lg font-medium">{question}</h4>
        </div>
        <span className="transition-transform duration-300 text-2xl text-orange-500">
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

// NOVO COMPONENTE: Carrossel de Vantagens
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
function VantagensCarousel() {
  const imagens = [
    // '/vantagens/img1.jpg',
    '/vantagens/img2.png',
    '/vantagens/img3.jpg',
    '/vantagens/img4.jpg',
    '/vantagens/img5.jpg',
    '/vantagens/img6.jpg',
    '/vantagens/img7.jpg',
  ];
  const [index, setIndex] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  // Define visibleCount dinamicamente conforme o tamanho da tela
  const getVisibleCount = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 2;
    }
    return 6;
  };
  const [visibleCount, setVisibleCount] = React.useState(getVisibleCount());

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcula os índices das imagens visíveis, centralizando a selecionada
  const getVisibleImages = () => {
    const half = Math.floor(visibleCount / 2);
    let start = index - half + (visibleCount % 2 === 0 ? 0 : 1);
    let result = [];
    for (let i = 0; i < visibleCount; i++) {
      let idx = (start + i + imagens.length) % imagens.length;
      result.push(idx);
    }
    return result;
  };

  const prev = () => setIndex((i) => (i === 0 ? imagens.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === imagens.length - 1 ? 0 : i + 1));

  const visibleImages = getVisibleImages();

  return (
    <>
      <div
        className="relative w-full max-w-[600px] h-[200px] flex items-center justify-center mx-auto"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex w-full h-full items-center justify-center gap-2">
          {visibleImages.map((imgIdx, i) => (
            <div key={imgIdx} className="relative">
              {/* Seta esquerda na primeira imagem visível */}
              {(hover ||
                (typeof window !== 'undefined' && window.innerWidth < 768)) &&
                i === 0 && (
                  <button
                    className="absolute left-[-32px] md:left-[-32px] bg-black/60 rounded-full p-2 text-white hover:bg-black/80 transition z-10 top-1/2 -translate-y-1/2 md:opacity-100"
                    onClick={prev}
                    aria-label="Anterior"
                    type="button"
                    style={{ zIndex: 20 }}
                  >
                    <FiChevronLeft size={28} />
                  </button>
                )}
              {/* Seta direita na última imagem visível */}
              {(hover ||
                (typeof window !== 'undefined' && window.innerWidth < 768)) &&
                i === visibleImages.length - 1 && (
                  <button
                    className="absolute right-[-32px] md:right-[-32px] bg-black/60 rounded-full p-2 text-white hover:bg-black/80 transition z-10 top-1/2 -translate-y-1/2 md:opacity-100"
                    onClick={next}
                    aria-label="Próximo"
                    type="button"
                    style={{ zIndex: 20 }}
                  >
                    <FiChevronRight size={28} />
                  </button>
                )}
              <div
                className={
                  'transition-all duration-300 rounded-lg shadow-md bg-cover bg-center flex-shrink-0 border-2 border-[#808080] opacity-80 cursor-pointer'
                }
                style={{
                  backgroundImage: `url(${imagens[imgIdx]})`,
                  width: '220px',
                  height: '250px',
                  ...(window.innerWidth <= 640 ? { width: '250px' } : {}),
                }}
                title="Clique para expandir"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Carrossel de Depoimentos
function DepoimentosCarousel() {
  const depoimentos = [
    {
      text: '"Atendimento excelente, personalizado, muito além das expectativas, tire todas as suas dúvidas e ainda receba seu produto em tempo recorde."',
      name: (
        <>
          Nandhe S.
          <div className="flex items-start mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
          </div>
        </>
      ),
      role: '',
    },
    {
      text: '"Empresa foi bem profissional, pontual e atendeu aos meus anseios. Em tempo oportuno recomendarei aos meus amigos."',
      name: (
        <>
          Jefferson FERREIRA DOS SANTOS
          <div className="flex items-start mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
          </div>
        </>
      ),
      role: '',
    },
    {
      text: '"Excelente atendimento, muito prestativo. Verificou todas as possibilidades para atender meu pedido. E o resultado ficou perfeito!"',
      name: (
        <>
          Barbara Arivaben Serpellone
          <div className="flex items-start mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
          </div>
        </>
      ),
      role: '',
    },
    {
      text: '"Ótima experiência! Serviço rápido, eficiente e com excelente qualidade. Recomendo a todos."',
      name: (
        <>
          Lucas Pereira
          <div className="flex items-start mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
          </div>
        </>
      ),
      role: '',
    },
    {
      text: '"Fui muito bem atendido, tiraram todas as minhas dúvidas e entregaram antes do prazo. Voltarei a fazer negócio!"',
      name: (
        <>
          Mariana Silva
          <div className="flex items-start mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
          </div>
        </>
      ),
      role: '',
    },
    {
      text: '"Qualidade impecável e ótimo custo-benefício. Superou minhas expectativas!"',
      name: (
        <>
          Rafael Costa
          <div className="flex items-start mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
          </div>
        </>
      ),
      role: '',
    },
  ];
  // Novo: responsivo para quantidade de cards
  const getGroupSize = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 1;
    }
    return 3;
  };
  const [groupSize, setGroupSize] = React.useState(getGroupSize());
  React.useEffect(() => {
    const handleResize = () => setGroupSize(getGroupSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [index, setIndex] = React.useState(0);
  const totalGroups = Math.ceil(depoimentos.length / groupSize);
  const currentGroup = Math.floor(index / groupSize);
  const prev = () =>
    setIndex((i) => (i - groupSize + depoimentos.length) % depoimentos.length);
  const next = () => setIndex((i) => (i + groupSize) % depoimentos.length);
  const visible = depoimentos.slice(
    currentGroup * groupSize,
    currentGroup * groupSize + groupSize
  );

  while (visible.length < groupSize) {
    visible.push(depoimentos[visible.length]);
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={`w-full flex items-center justify-center relative px-0 md:px-0 group`}
      >
        <button
          className="absolute left-[-32px] md:left-[-32px] bg-black/60 rounded-full p-2 text-white hover:bg-black/80 transition z-10 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto"
          onClick={prev}
          aria-label="Anterior"
          type="button"
        >
          <FiChevronLeft size={28} />
        </button>
        <div
          className={`flex-1 grid grid-cols-1 ${groupSize > 1 ? 'md:grid-cols-3' : ''} gap-8 px-0 md:px-0`}
        >
          {visible.map((dep, i) => (
            <ClienteDepoimento
              key={i + '-' + dep.text}
              text={dep.text}
              name={dep.name}
              role={dep.role}
            />
          ))}
        </div>
        <button
          className="absolute right-[-32px] md:right-[-32px] bg-black/60 rounded-full p-2 text-white hover:bg-black/80 transition z-10 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto"
          onClick={next}
          aria-label="Próximo"
          type="button"
        >
          <FiChevronRight size={28} />
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {Array(totalGroups)
          .fill(0)
          .map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === currentGroup ? 'bg-orange-500' : 'bg-gray-400'}`}
              onClick={() => setIndex(i * groupSize)}
              aria-label={`Ir para grupo ${i + 1}`}
            />
          ))}
      </div>
    </div>
  );
}

const Home = () => {
  const [modal, setModal] = React.useState<
    null | 'plastico' | 'engenharia' | 'flexivel' | 'resina'
  >(null);

  const [form, setForm] = React.useState({
    name: '',
    sobrenome: '',
    email: '',
    phone: '',
    empresa: '',
    descricao: '',
    message: '',
    temProjeto: false,
  });
  const [file, setFile] = React.useState<File | null>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<any>({});

  function formatPhone(value: string) {
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6)
      return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 0) return `(${v}`;
    return '';
  }

  function validateForm() {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = 'O campo Nome é obrigatório';
    if (!form.sobrenome.trim())
      newErrors.sobrenome = 'O campo Sobrenome é obrigatório';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = 'O E-mail inserido é inválido';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
      newErrors.phone = 'O campo Telefone é obrigatório';
    if (!form.descricao.trim())
      newErrors.descricao = 'O campo Descrição é obrigatório';
    if (!form.message.trim())
      newErrors.message = 'O campo Mensagem é obrigatório';
    if (form.temProjeto && !file) newErrors.anexo = 'Anexe um arquivo';
    return newErrors;
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm((f) => ({ ...f, phone: formatPhone(value) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('sobrenome', form.sobrenome);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('empresa', form.empresa);
      formData.append('descricao', form.descricao);
      formData.append('message', form.message);
      if (file) {
        formData.append('file', file); // Garante que o campo é 'file'
      }
      try {
        const response = await fetch(
          'https://3dklbackend.netlify.app/.netlify/functions/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        if (response.ok) {
          navigate('/Ty-F');
        } else {
          alert('Erro ao enviar o formulário. Tente novamente.');
        }
      } catch (err) {
        alert('Erro ao enviar o formulário. Tente novamente.');
      }
    }
  }

  return (
    <div className="min-h-screen bg-black/70 flex items-center overflow-x-hidden">
      <div className="w-full">
        {/* Primeira dobra com vídeo de fundo */}
        <div className="relative w-full min-h-[700px] flex flex-col justify-start items-start mb-12">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="./file.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="relative z-10 w-full pb-10 lg:pb-4 pl-12 pr-12 pt-20 lg:pl-64 lg:pr-64">
            <SectionInView>
              <div className="w-full lg:w-2/5 mb-6 flex items-center">
                <h2
                  id="inicio"
                  className="text-4xl lg:text-5xl font-medium text-white w-full"
                >
                  Trazendo sua ideia para realidade
                </h2>
              </div>
            </SectionInView>
            <SectionInView>
              <p className="text-white text-lg mb-8 w-full lg:w-2/5">
                Com a 3DKL, sua ideia ganha vida através da tecnologia de
                impressão 3D FDM e SLA. Temos o objetivo de materializar ideias,
                desenvolver, melhorar ou reparar projetos. Venha fazer um
                orçamento com a gente
              </p>
            </SectionInView>
            <SectionInView>
              <div className="flex gap-4">
                <a href="#contato">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded font-normal hover:bg-orange-600 transition">
                    Peça um orçamento
                  </button>
                </a>
                <a href="#materiais">
                  <button className="bg-[#808080]/50 text-white px-6 py-3 rounded font-normal hover:bg-[#808080] transition">
                    Catálogo de materiais
                  </button>
                </a>
              </div>
            </SectionInView>
            {/* Quadrante de serviços */}
            <SectionInView>
              <div
                id="servicos"
                className="mt-10 w-full bg-transparent border-2 rounded-xl border-orange-500 p-3 flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-orange-500 overflow-hidden"
              >
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
          </div>
          <div className="absolute inset-0 bg-black opacity-40 z-0 pointer-events-none" />
        </div>
        <div className="pl-12 pr-12 lg:pl-64 lg:pr-64">
          <SectionInView>
            <h3 className="text-3xl font-medium text-white mb-8 text-center">
              Serviços
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {[
                {
                  title: 'Prototipagem 3D',
                  desc: 'Oferecemos impressão 3D precisa e rápida para prototipagem. Transforme suas ideias em realidade com alta qualidade e custo-benefício. Trabalhamos com diversos materiais, ideal para desenvolvimento de produtos, design, pesquisa e mais. Faça seu projeto ganhar vida conosco!',
                  img: '/prototipagem.png',
                  alt: 'Prototipagem 3D',
                },
                {
                  title: 'Impressão 3D personalizada',
                  desc: 'Criamos itens exclusivos com impressão 3D personalizada. Ideal para presentes, decoração e projetos especiais.',
                  img: '/impressao.png',
                  alt: 'Impressão 3D personalizada',
                },
                {
                  title: 'Serviços de modelagem 3D',
                  desc: 'Oferecemos serviço completo de criação e impressão 3D. Desenvolvemos seu modelo 3D do zero e imprimimos com alta qualidade. Ideal para quem não tem um modelo pronto. Soluções personalizadas!!',
                  img: '/modelagem.png',
                  alt: 'Serviços de modelagem 3D',
                },
                {
                  title: 'Acabamento especializado',
                  desc: 'Oferecemos acabamento premium para suas peças 3D. Cada projeto recebe tratamento personalizado, garantindo alta qualidade e detalhes perfeitos. Transforme suas impressões com um toque profissional e exclusivo.',
                  img: '/acabamento.png',
                  alt: 'Acabamento especializado',
                },
                {
                  title: 'Impressão de Resina',
                  desc: 'Impressão 3D de alta resolução com resinas para peças detalhadas, prototipagem visual, joalheria, odontologia e aplicações técnicas. Acabamento superior e precisão para projetos exigentes.',
                  img: '/resinaa.png',
                  alt: 'Impressão de Resina',
                },
                {
                  title: 'Manutenção de impressoras 3D',
                  desc: 'Realizamos manutenção preventiva e corretiva em impressoras 3D FDM e SLA. Diagnóstico, troca de peças, calibração e otimização para garantir o melhor desempenho do seu equipamento. Conte com nossa experiência para manter sua impressora sempre pronta para produzir.',
                  img: '/wrench.png',
                  alt: 'Manutenção de impressoras 3D',
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
                    <div className="flex items-center gap-3 mb-2">
                      <img src={serv.img} alt={serv.alt} className="w-8 h-8" />
                      <h4 className="text-xl font-medium">{serv.title}</h4>
                    </div>
                    <p>{serv.desc}</p>
                  </div>
                </SectionInView>
              ))}
            </div>
            <SectionInView>
              <div className="flex justify-center mt-8">
                <a href="#contato">
                  <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-normal hover:bg-orange-600 transition">
                    Peça um orçamento
                  </button>
                </a>
              </div>
            </SectionInView>
          </SectionInView>
          {/* Seção de Materiais */}
          <SectionInView>
            <section
              id="materiais"
              className="w-screen mb-0 pb-20 relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] p-8 pl-12 pr-12 lg:pl-64 lg:pr-64"
            >
              <h3 className="text-3xl font-medium text-white mb-8 text-center">
                Materiais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  {
                    title: 'Materiais de Resina',
                    img: '/resina.png',
                    alt: 'Materiais de Resina',
                    onClick: () => setModal('resina'),
                  },
                ].map((mat) => (
                  <SectionInView key={mat.title}>
                    <div className="bg-black/50 rounded-lg p-6 shadow text-white flex flex-col items-center relative">
                      <h4 className="text-xl font-medium mb-5 text-[#808080]">
                        {mat.title}
                      </h4>
                      <img
                        src={mat.img}
                        alt={mat.alt}
                        className="mb-6 rounded"
                      />
                      <div className="w-full flex justify-center">
                        <button
                          onClick={mat.onClick}
                          className="border border-[#808080] text-[#808080] px-6 py-2 rounded font-normal hover:bg-[#808080] hover:text-white transition"
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
          {modal === 'plastico' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-black rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
                <button
                  className="absolute top-2 right-2 text-white hover:text-orange-500 text-3xl w-10 h-10 flex items-center justify-center"
                  onClick={() => setModal(null)}
                >
                  &times;
                </button>
                <h4 className="text-2xl font-medium mb-4 text-orange-500">
                  Materiais de Plástico
                </h4>
                <p>
                  Os plásticos mais comuns para impressão 3D FDM são PLA e ABS.
                  O PLA é biodegradável, fácil de imprimir e proporciona
                  excelente acabamento superficial, sendo ideal para protótipos
                  e peças decorativas. O ABS oferece alta resistência mecânica e
                  térmica, sendo perfeito para peças funcionais e duráveis, mas
                  requer impressora fechada para evitar deformações.
                </p>
                <div className="flex justify-start mt-8">
                  <a href="#contato">
                    <button className="bg-orange-500 text-white px-8 py-3 rounded font-normal hover:bg-orange-600 transition w-full">
                      Peça um orçamento
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
          {modal === 'engenharia' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-black rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
                <button
                  className="absolute top-2 right-2 text-white hover:text-orange-500 text-3xl w-10 h-10 flex items-center justify-center"
                  onClick={() => setModal(null)}
                >
                  &times;
                </button>
                <h4 className="text-2xl font-medium mb-4 text-orange-500">
                  Materiais de Engenharia
                </h4>
                <p>
                  Materiais como PETG, Nylon e Policarbonato (PC) são voltados
                  para aplicações técnicas. O PETG alia facilidade de impressão
                  à alta durabilidade e resistência química. O Nylon é flexível,
                  resistente ao impacto e ao desgaste, ideal para engrenagens e
                  peças móveis. O PC é extremamente robusto, suportando altas
                  temperaturas e esforços mecânicos, perfeito para peças de alta
                  performance.
                </p>
                <div className="flex justify-start mt-8">
                  <a href="#contato">
                    <button className="bg-orange-500 text-white px-8 py-3 rounded font-normal hover:bg-orange-600 transition w-full">
                      Peça um orçamento
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
          {modal === 'flexivel' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-black rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
                <button
                  className="absolute top-2 right-2 text-white hover:text-orange-500 text-3xl w-10 h-10 flex items-center justify-center"
                  onClick={() => setModal(null)}
                >
                  &times;
                </button>
                <h4 className="text-2xl font-medium mb-4 text-orange-500">
                  Materiais Flexíveis
                </h4>
                <p>
                  Materiais como TPU e TPE são elásticos e resistentes, ideais
                  para peças que exigem flexibilidade, absorção de impacto e
                  resistência à abrasão. São amplamente utilizados em
                  protetores, vedações, suportes e componentes que precisam
                  manter suas propriedades em diferentes condições de uso e
                  temperatura.
                </p>
                <div className="flex justify-start mt-8">
                  <a href="#contato">
                    <button className="bg-orange-500 text-white px-8 py-3 rounded font-normal hover:bg-orange-600 transition w-full">
                      Peça um orçamento
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
          {modal === 'resina' && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-black rounded-lg p-8 max-w-md w-full text-white relative transition-transform duration-300 ease-out animate-modal-drop mx-4">
                <button
                  className="absolute top-2 right-2 text-white hover:text-orange-500 text-3xl w-10 h-10 flex items-center justify-center"
                  onClick={() => setModal(null)}
                >
                  &times;
                </button>
                <h4 className="text-2xl font-medium mb-4 text-orange-500">
                  Materiais de Resina
                </h4>
                <p>
                  Materiais de resina são utilizados em impressoras 3D do tipo
                  SLA, DLP ou LCD, proporcionando peças com altíssima resolução,
                  detalhes finos e excelente acabamento superficial. São ideais
                  para prototipagem visual, joalheria, odontologia e aplicações
                  que exigem precisão. Oferecemos diferentes tipos de resinas,
                  incluindo resinas padrão, flexíveis, resistentes e para uso
                  técnico, garantindo versatilidade e qualidade para o seu
                  projeto.
                </p>
                <div className="flex justify-start mt-8">
                  <a href="#contato">
                    <button className="bg-orange-500 text-white px-8 py-3 rounded font-normal hover:bg-orange-600 transition w-full">
                      Peça um orçamento
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
          {/* NOVA SEÇÃO: Vantagens em escolher a 3DKL Impressões 3D */}
          <SectionInView>
            <section
              className="w-screen z-0 pb-10 relative overflow-hidden left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]"
              style={{
                backgroundImage: 'url(/vantagens_fundo.avif)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', // impede repetição da imagem
              }}
            >
              <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
              <div className="relative z-10 p-8 pl-12 pr-12 lg:pl-64 lg:pr-64">
                <h3 className="text-3xl font-medium text-white mb-8 text-start flex items-center justify-center gap-4">
                  Vantagens em escolher nossos serviços
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  {/* Card 1 */}
                  <div className="bg-[#808080]/40 border-2 border-[#808080] rounded-lg p-6 shadow text-white flex flex-col items-start h-full">
                    <div className="flex items-start gap-2 mb-3">
                      <img
                        src="/vantagem1.png"
                        alt="Tecnologia de ponta"
                        className="w-8 h-8"
                      />
                      <h4 className="text-lg font-medium">
                        Tecnologia de ponta
                      </h4>
                    </div>
                    <p className="text-start text-gray-200">
                      Contamos com equipamentos de última geração para garantir
                      resultados excepcionais.
                    </p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-[#808080]/40 border-2 border-[#808080] rounded-lg p-6 shadow text-white flex flex-col items-start h-full">
                    <div className="flex items-start gap-2 mb-3">
                      <img
                        src="/vantagem2.png"
                        alt="Projetos exclusivos"
                        className="w-8 h-8"
                      />
                      <h4 className="text-lg font-medium">
                        Projetos exclusivos
                      </h4>
                    </div>
                    <p className="text-start text-gray-200">
                      Desenvolvemos soluções sob medida, atendendo às
                      necessidades específicas de cada cliente.
                    </p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-[#808080]/40 border-2 border-[#808080] rounded-lg p-6 shadow text-white flex flex-col items-start h-full">
                    <div className="flex items-start gap-2 mb-3">
                      <img
                        src="/vantagem3.png"
                        alt="Materiais premium"
                        className="w-8 h-8"
                      />
                      <h4 className="text-lg font-medium">Materiais premium</h4>
                    </div>
                    <p className="text-start text-gray-200">
                      Utilizamos apenas materiais de alta qualidade, assegurando
                      durabilidade e desempenho superior.
                    </p>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-[#808080]/40 border-2 border-[#808080] rounded-lg p-6 shadow text-white flex flex-col items-start h-full">
                    <div className="flex items-start gap-2 mb-3">
                      <img
                        src="/vantagem4.png"
                        alt="Consultoria especializada"
                        className="w-8 h-8"
                      />
                      <h4 className="text-lg font-medium">
                        Consultoria especializada
                      </h4>
                    </div>
                    <p className="text-start text-gray-200">
                      Nossa equipe oferece suporte técnico e consultoria para
                      garantir a melhor aplicação da tecnologia 3D em seus
                      projetos.
                    </p>
                  </div>
                </div>
                {/* Slide de imagens */}
                <div className="w-full flex justify-center">
                  <VantagensCarousel />
                </div>
              </div>
            </section>
          </SectionInView>

          {/* Seção de Clientes */}
          <section
            id="sobre"
            className="bg-black/40 z-0 w-screen -mt-12 mb-0 pb-20 relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] pl-12 pr-12 lg:pl-64 lg:pr-64"
          >
            <SectionInView>
              <h3 className="text-3xl font-medium text-white mb-4 mt-12 text-center">
                Depoimentos
              </h3>
            </SectionInView>
            <div className="mt-12 flex justify-center">
              <DepoimentosCarousel />
            </div>
            <div className="flex justify-center mt-12">
              <a href="#contato">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-normal hover:bg-orange-600 transition">
                  Peça um orçamento
                </button>
              </a>
            </div>
          </section>
          {/* Seção de F.A.Q */}
          <SectionInView>
            <section id="contato" className="w-full mb-20 pt-10">
              <div className="flex flex-col md:flex-row w-full gap-12">
                {/* Títulos lado a lado (apenas md+) */}
                <div className="hidden md:flex w-full flex-row gap-12 mb-8">
                  <div className="w-1/2 flex items-center">
                    <h3 className="text-3xl font-medium text-white text-start">
                      Perguntas Frequentes
                    </h3>
                  </div>
                  <div className="w-1/2 flex items-center justify-between">
                    <h4 className="text-2xl font-medium text-white">
                      Peça um Orçamento
                    </h4>
                    <a
                      href="https://wa.me/19997404451" // Substitua pelo número real
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow transition"
                    >
                      <img
                        src={whatsappIcon}
                        alt="WhatsApp"
                        className="w-6 h-6"
                      />
                      Whatsapp
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-12">
                {/* FAQ */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 mb-10">
                  {/* Título FAQ mobile */}
                  <h3 className="text-3xl font-medium text-white text-start mb-4 md:hidden">
                    Perguntas frequentes
                  </h3>
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
                    {
                      q: 'Vocês oferecem serviço de modelagem 3D para quem não tem o arquivo pronto?',
                      a: 'Sim! Desenvolvemos o modelo 3D do zero para você, conforme sua necessidade, e também realizamos a impressão.',
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
                <div className="w-full md:w-1/2 flex flex-col h-full">
                  {/* Título e botão do form mobile */}
                  <div className="flex items-center justify-between mb-4 md:hidden">
                    <h4 className="text-2xl font-medium text-white">
                      Peça um orçamento
                    </h4>
                  </div>
                  <a
                    href="https://wa.me/19997404451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex md:hidden items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow transition mb-4"
                  >
                    <img
                      src={whatsappIcon}
                      alt="WhatsApp"
                      className="w-6 h-6"
                    />
                    Whatsapp
                  </a>
                  <form
                    className="bg-black/50 rounded-lg p-8 shadow text-white flex flex-col gap-4 w-full justify-between border-0 border-[#808080] mt-0 h-full"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <input
                            id="nome"
                            name="name"
                            type="text"
                            className={`w-full rounded px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 peer placeholder-transparent bg-transparent`}
                            placeholder="Nome"
                            value={form.name}
                            onChange={(e) => {
                              setForm((f) => ({ ...f, name: e.target.value }));
                              if (errors.name && e.target.value.trim()) {
                                setErrors((errs: any) => ({
                                  ...errs,
                                  name: undefined,
                                }));
                              }
                            }}
                          />
                          <label
                            htmlFor="nome"
                            className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
            peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
            peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
            peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs flex items-center gap-1"
                          >
                            Nome <span className="text-red-500">*</span>
                          </label>
                          {errors.name && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.name}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            id="sobrenome"
                            name="sobrenome"
                            type="text"
                            className={`w-full rounded px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 peer placeholder-transparent bg-transparent`}
                            placeholder="Sobrenome"
                            value={form.sobrenome}
                            onChange={(e) => {
                              setForm((f) => ({
                                ...f,
                                sobrenome: e.target.value,
                              }));
                              if (errors.sobrenome && e.target.value.trim()) {
                                setErrors((errs: any) => ({
                                  ...errs,
                                  sobrenome: undefined,
                                }));
                              }
                            }}
                          />
                          <label
                            htmlFor="sobrenome"
                            className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
            peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
            peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
            peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs flex items-center gap-1"
                          >
                            Sobrenome <span className="text-red-500">*</span>
                          </label>
                          {errors.sobrenome && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.sobrenome}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="relative">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className={`w-full rounded px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 peer placeholder-transparent bg-transparent`}
                            placeholder="E-mail"
                            value={form.email}
                            onChange={(e) => {
                              setForm((f) => ({ ...f, email: e.target.value }));
                              if (
                                errors.email &&
                                /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
                                  e.target.value
                                )
                              ) {
                                setErrors((errs: any) => ({
                                  ...errs,
                                  email: undefined,
                                }));
                              }
                            }}
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
            peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
            peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
            peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs flex items-center gap-1"
                          >
                            E-mail <span className="text-red-500">*</span>
                          </label>
                          {errors.email && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.email}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            id="telefone"
                            name="phone"
                            type="tel"
                            className={`w-full rounded px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 peer placeholder-transparent bg-transparent`}
                            placeholder="Telefone"
                            value={form.phone}
                            onChange={(e) => {
                              handleChangeTelefone(e);
                              if (
                                errors.phone &&
                                e.target.value.replace(/\D/g, '').length >= 10
                              ) {
                                setErrors((errs: any) => ({
                                  ...errs,
                                  phone: undefined,
                                }));
                              }
                            }}
                          />
                          <label
                            htmlFor="telefone"
                            className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
            peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
            peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
            peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs flex items-center gap-1"
                          >
                            Telefone <span className="text-red-500">*</span>
                          </label>
                          {errors.phone && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative mt-6">
                        <input
                          id="empresa"
                          name="empresa"
                          type="text"
                          className="w-full rounded px-3 py-2 border border-[#808080] focus:outline-none focus:border-orange-500 peer placeholder-transparent bg-transparent"
                          placeholder="Empresa"
                          value={form.empresa}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, empresa: e.target.value }))
                          }
                        />
                        <label
                          htmlFor="empresa"
                          className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs"
                        >
                          Empresa
                        </label>
                      </div>

                      <div className="relative mt-6">
                        <input
                          id="descricao"
                          name="descricao"
                          type="text"
                          className={`w-full rounded px-3 py-2 border ${errors.descricao ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 peer placeholder-transparent bg-transparent`}
                          placeholder="Descrição do Projeto"
                          value={form.descricao}
                          onChange={(e) => {
                            setForm((f) => ({
                              ...f,
                              descricao: e.target.value,
                            }));
                            if (errors.descricao && e.target.value.trim()) {
                              setErrors((errs: any) => ({
                                ...errs,
                                descricao: undefined,
                              }));
                            }
                          }}
                        />
                        <label
                          htmlFor="descricao"
                          className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs flex items-center gap-1"
                        >
                          Descrição do Projeto{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.descricao && (
                          <span className="text-red-500 text-xs mt-1 block">
                            {errors.descricao}
                          </span>
                        )}
                      </div>
                      <div className="relative mt-6">
                        <textarea
                          id="mensagem"
                          name="message"
                          rows={3}
                          className={`w-full rounded px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 resize-none peer placeholder-transparent bg-transparent`}
                          placeholder="Mensagem"
                          value={form.message}
                          onChange={(e) => {
                            setForm((f) => ({
                              ...f,
                              message: e.target.value,
                            }));
                            if (errors.message && e.target.value.trim()) {
                              setErrors((errs: any) => ({
                                ...errs,
                                message: undefined,
                              }));
                            }
                          }}
                        />
                        <label
                          htmlFor="mensagem"
                          className="absolute left-3 top-2 text-sm text-[#808080] transition-all duration-200 pointer-events-none bg-transparent
    peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-[#808080]
    peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500
    peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs flex items-center gap-1"
                        >
                          Mensagem <span className="text-red-500">*</span>
                        </label>
                        {errors.message && (
                          <span className="text-red-500 text-xs mt-1 block">
                            {errors.message}
                          </span>
                        )}
                      </div>
                      {/* Checkbox para anexar arquivo */}
                      <div className="flex items-center mt-4">
                        <input
                          id="temProjeto"
                          name="temProjeto"
                          type="checkbox"
                          checked={form.temProjeto || false}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              temProjeto: e.target.checked,
                            }))
                          }
                          className="mr-2 accent-[#0078BE]"
                        />
                        <label
                          htmlFor="temProjeto"
                          className="text-sm text-gray-200 select-none cursor-pointer"
                        >
                          Já tem um projeto? Clique para anexar um arquivo.
                        </label>
                      </div>
                      {/* Input de anexo visível apenas se checkbox marcada */}
                      {form.temProjeto && (
                        <div className="relative mt-6">
                          <label
                            htmlFor="anexo"
                            className="mb-1 -mt-3 text-sm text-[#808080] flex items-center gap-1"
                          >
                            Anexar arquivo{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="anexo"
                            name="file"
                            type="file"
                            accept=".stl,.obj,.step,.jpg,.jpeg,.png,.gif,.bmp,.svg,.pdf"
                            className={`w-full rounded px-3 py-2 border ${errors.anexo ? 'border-red-500' : 'border-[#808080]'} focus:outline-none focus:border-orange-500 bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer file:cursor-pointer`}
                            onChange={(e) => {
                              const selectedFile =
                                e.target.files && e.target.files[0]
                                  ? e.target.files[0]
                                  : null;
                              setFile(selectedFile);
                              if (errors.anexo && selectedFile) {
                                setErrors((errs: any) => ({
                                  ...errs,
                                  anexo: undefined,
                                }));
                              }
                            }}
                          />
                          {errors.anexo && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.anexo}
                            </span>
                          )}
                          <span className="text-xs text-[#808080] block mt-1">
                            Aceitamos apenas STL, OBJ, STEP ou imagens/desenhos.
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-8 py-3 rounded-full font-normal hover:bg-orange-600 transition mt-2"
                    >
                      Enviar e-mail
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </SectionInView>
        </div>
      </div>
    </div>
  );
};

export default Home;
