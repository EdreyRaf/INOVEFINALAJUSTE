import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import CarouselInfo from '@/components/ui/carousel-info';

const DoctorSection = () => {
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

  const doctorInfo = [
    {
      title: "Especialização",
      description: "Implantodontia, prótese dentária e reabilitação oral"
    },
    {
      title: "Experiência", 
      description: "14 anos em odontologia"
    },
    {
      title: "Formação",
      description: "Especialista em Implantes - UNIRG-TO, 2011"
    },
    {
      title: "Localização",
      description: "Garanhuns, Pernambuco"
    }
  ];

  return (
    <section
      id="doutor"
      ref={sectionRef}
      className="section-dark py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className={`text-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
              Dr. Eterno Freitas Jr.
            </h2>
            <p className="text-base sm:text-lg text-accent mb-4 font-semibold">
              CRO PE-9753
            </p>

            <p className="text-sm sm:text-base text-white/90 mb-6 leading-relaxed font-light px-4">
              Especialista em Implantodontia, prótese dentária e referência em reabilitação oral em Garanhuns.
              Dr. Eterno é reconhecido pelo cuidado com cada paciente e pela excelência nos resultados.
              Na Clínica Inove, cada caso é tratado com planejamento, empatia e precisão clínica.
            </p>
          </div>

          <div className={`mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative max-w-sm mx-auto">
              <img
                src="/lovable-uploads/e657a349-ebea-48ad-ae86-eb5f863a7e5d.png"
                alt="Dr. Eterno Freitas Jr. - CRO PE-9753"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>

          <div className={`mb-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <CarouselInfo items={doctorInfo} />
          </div>

          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button
              className="btn-accent w-full text-base font-semibold py-4"
              onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
            >
              MARCAR ATENDIMENTO
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Doctor Image */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative max-w-lg mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl transform rotate-3" />
              <img
                src="/lovable-uploads/e657a349-ebea-48ad-ae86-eb5f863a7e5d.png"
                alt="Dr. Eterno Freitas Jr. - CRO PE-9753"
                className="relative z-10 w-full rounded-3xl shadow-glow"
              />
            </div>
          </div>

          {/* Doctor Content */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h2 className="text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Dr. Eterno Freitas Jr.
            </h2>
            <p className="text-xl xl:text-2xl text-accent mb-8 font-semibold">
              CRO PE-9753
            </p>

            <p className="text-lg xl:text-xl text-white/90 mb-12 leading-relaxed font-light">
              Especialista em Implantodontia, prótese dentária e referência em reabilitação oral em Garanhuns.
              Dr. Eterno é reconhecido pelo cuidado com cada paciente e pela excelência nos resultados.
              Na Clínica Inove, cada caso é tratado com planejamento, empatia e precisão clínica.
            </p>

            <div className="mb-12">
              <CarouselInfo items={doctorInfo} />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                className="btn-accent"
                onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
              >
                MARCAR ATENDIMENTO
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
