import { useEffect, useRef, useState } from 'react';
import CarouselTestimonials from '@/components/ui/carousel-testimonials';
import { fetchGoogleReviews } from '@/lib/googleReviews';

const testimonials = [
  {
    id: 1,
    name: "Eloísa Araujo",
    text: "Tive uma experiência excelente! Desde o primeiro contato via WhatsApp, até o atendimento na recepção e o serviço em si com o Dentista. Dr. Eterno fez um trabalho impecável, foi me esclarecendo todas as partes do meu tratamento, e me deixando muito segura ao longo dele. Recomendo muito não só o Dr. Eterno como toda a clínica.",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Ffcf39776d08c428d8065199d65d93664?format=webp&width=800",
    rating: 5
  },
  {
    id: 2,
    name: "Edy Digitals",
    text: "Clinica com ótima localização, ambiente climatizado e super aconchegante, recepção com ótimo atendimento. os drs são ótimos, super prestativos e competentes. precisei fazer um canal e estava com muito medo, mas graça a Deus, deu tudo certo, não sentir dor, e a recuperação ótima. Super indico!!!",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F19e255098b714e28ae3583648fec2c97?format=webp&width=800",
    rating: 5
  },
  {
    id: 3,
    name: "Yasmin Godoi",
    text: "Lugar ótimo! com profissionais competentes, fiz uma cirurgia de quatro sisos e a recuperação foi maravilhosa, os doutor foram muito pacientes e me deram muita confiança, nunca fui em um dentista e na primeira vez tive que fazer logo uma cirurgia, eu tava com receio, mas os doutor explicaram tudo direitinho e deu tudo certo. A recepção também é muito boa, o atendimento é ótimo, a recepcionista muito amigável.",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fad0a05d51c90459d94cfb031dbd86dc0?format=webp&width=800",
    rating: 5
  },
  {
    id: 4,
    name: "Jefferson Henrique",
    text: "Atendimento excelente, profissionais muito bem qualificados e comunicativos, recepção sempre prestativa e todos os procedimentos que tive foram sempre tranquilo e vou continuar mais e mais fazendo qualquer tratamento por aqui 10/10",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F537b9435e99440a5afd5fcf71f88d0bc?format=webp&width=800",
    rating: 5
  },
  {
    id: 5,
    name: "Recanto da Bluh",
    text: "Na clínica Inove eu tive uma ótima experiência realizei uma cirurgia para reabilitação estética sem dor, inchaço, sangramento, recuperação tranquila, para poder enfim colocar minha prótese. Desde do atendimento a todo o procedimentos foi melhor do que eu esperava, uma maravilha, estou muito feliz com o resultado, um profissional excelente super confio e indico. Agradeço a minha filha que me indicou ela já conhecia o trabalho do Doutor Eterno e agradeço carinhosamente ao doutor Eterno por todo cuidado comigo.",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F77eeea46e6454555a44272995e55511a?format=webp&width=800",
    rating: 5
  },
  {
    id: 6,
    name: "Vitória Letícia",
    text: "Inicialmente fiz a extração dos meus dois 3º molares inferiores,fui com medo,tanto no procedimento quanto no pós! Mas a realidade foi totalmente diferente do que havia pensado,uma cirurgia muito bem feita com profissionais que tiram suas dúvidas seus medos! O pós operatório super tranquilo,super atenciosos em saber como o paciente está se recuperando Indico demais,sua saúde está nas melhores mãos,profissionais excelentes Marquem a avaliação de vocês! ❤️",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F266c20f657404012af803e917f18e80c?format=webp&width=800",
    rating: 5
  },
  {
    id: 7,
    name: "Lih",
    text: "Fui atendida pelo Dr. Eterno e, desde o primeiro momento, ele demonstrou profissionalismo e carisma. Extremamente humano, fez com que eu me sentisse à vontade e acolhida em todas as consultas. Fica evidente quando o dentista realmente se importa com seus pacientes. Um dos melhores que já me atenderam, recomendo.",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F17e11c71a45d4886a64b6bd6d6dda7e2?format=webp&width=800",
    rating: 5
  },
  {
    id: 8,
    name: "Jéssica Pereira",
    text: "Com certeza foi o melhor atendimento médico que já recebi! Desde o primeiro contato com a clínica até a realização do procedimento: tudo perfeito!",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fb2d6c6a1ea25462db99d10450bb01f1e?format=webp&width=800",
    rating: 5
  },
  {
    id: 9,
    name: "Fabio Correia Silva",
    text: "Excelente, a equipe da inove é acolhedora e passa segurança para seus clientes, no meu caso em particular destaco toda equipe, em especial Dr Eterno que tem grande paciência comigo.",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fbf396f2625064a0c865ebc6aa10b5517?format=webp&width=800",
    rating: 5
  },
  {
    id: 10,
    name: "Gilvan Freitas",
    text: "O espaço Inove é um local muito acolhedor, onde nos sentimos bem cuidados por todos que compõem o ambiente. As recepcionistas extremamente atenciosas, independente se estamos na clinica ou em casa, sempre procurando saber como estamos nos sentindo, após cada atendimento. Com toda sinceridade, é um atendimento diferenciado, de alto nível, tanto no aspecto profissional, como no lado humano. É uma relação profissional-paciente, que nunca tive, e olhe que tenho 58 anos. Só tenho a agradecer toda atenção, cuidado e respeito, que todos do Inove sempre tiveram comigo. Tenho certeza que todo esse empenho e dedicação, serão compensados com muitas vitórias e sucesso! Obrigado!",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fa73a53aebf76477f843842a17f5733cd?format=webp&width=800",
    rating: 5
  }
];

type Testimonial = typeof testimonials[number];

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState<Testimonial[]>(testimonials);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const reviews = await fetchGoogleReviews();
      if (!cancelled && reviews.length) {
        const mapped: Testimonial[] = reviews.map((r, idx) => ({
          id: idx + 1,
          name: r.name,
          text: r.text,
          avatar: r.avatar && r.avatar.length > 0
            ? r.avatar
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name?.[0] || 'C')}&size=150&background=2196f3&color=ffffff`,
          rating: r.rating || 5,
        }));
        setItems(mapped);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="py-12 lg:py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-8 leading-tight tracking-tight">
            Depoimentos de Pacientes
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Veja o que nossos pacientes falam sobre os resultados alcançados
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <CarouselTestimonials testimonials={items} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
