import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import CarouselStats from '@/components/ui/carousel-stats';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const statsData = [
    {
      value: "14",
      title: "Anos de Experiência", 
      description: "Especialização e dedicação em reabilitação oral"
    },
    {
      value: "3000",
      title: "Pacientes Atendidos",
      description: "Sorrisos transformados com excelência"
    },
    {
      value: "100%",
      title: "Satisfação",
      description: "Compromisso com resultados excepcionais"
    }
  ];

  return (
    <section 
      id="clinica"
      ref={sectionRef}
      className="section-primary py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight" style={{ color: '#111827' }}>
            Sobre a Inove
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed font-light max-w-4xl mx-auto" style={{ color: '#111827' }}>
            A Inove Odontologia é um espaço dedicado à reabilitação oral com qualidade, 
            acolhimento e especialistas em cada área. Nosso foco é transformar a vida dos 
            pacientes, devolvendo função, saúde bucal e autoestima, através de técnicas 
            avançadas e uma equipe altamente capacitada.
          </p>

          <div className="mb-12">
            <CarouselStats items={statsData} />
          </div>
          
          <Button
            className="btn-dark"
            style={{ backgroundColor: '#ddaf3c', color: '#ffffff' }}
            onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
          >
            ENTRAR EM CONTATO
          </Button>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
