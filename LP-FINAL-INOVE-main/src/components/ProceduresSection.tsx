import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const ProceduresSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="procedimentos"
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-gray-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 md:mb-8 leading-tight tracking-tight">
            Nossos Procedimentos
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Especialização em técnicas avançadas para devolver função, estética e confiança ao seu sorriso
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          
          {/* Implantes Dentários */}
          <div className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl transform -rotate-3" />
                <div className="relative bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-card">
                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight">
                    Implantes Dentários
                  </h3>
                  <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed font-light">
                    Recupere a função mastigatória e a estética do seu sorriso com implantes de alta qualidade. 
                    Nossa técnica minimamente invasiva garante maior conforto, cicatrização rápida e resultados 
                    naturais que duram para toda a vida.
                  </p>
                  <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Implantes unitários e múltiplos
                    </li>
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Cirurgia guiada
                    </li>
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Carga imediata quando possível
                    </li>
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Garantia e acompanhamento
                    </li>
                  </ul>
                  <Button 
                    className="btn-hero"
                    onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
                  >
                    SAIBA MAIS SOBRE IMPLANTES
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:order-1 px-2 md:px-4 lg:px-8">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full relative"
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F689c727b315c4496a89d3724c6445734?format=webp&width=800"
                        alt="Implantes Dentários - Antes"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500 rotate-180"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F000cdbc1030d4190a337dc8e8a5f69c4?format=webp&width=800"
                        alt="Implantes Dentários - Durante"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F8c43784f410e402e9ad40e2858bf05d6?format=webp&width=800"
                        alt="Implantes Dentários - Tomografia"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fe64344f784104acba3bd2a4809c63733?format=webp&width=800"
                        alt="Implantes Dentários - Caso 2 Antes"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500 rotate-180"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fdea6d2c3214245b0b00a9f42839f3b70?format=webp&width=800"
                        alt="Implantes Dentários - Caso 2 Durante"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fcd58a8d6de4d4c3ebc8a742ba77664dc?format=webp&width=800"
                        alt="Implantes Dentários - Caso 2 Tomografia"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-0 lg:-left-4" />
                <CarouselNext className="right-2 md:right-0 lg:-right-4" />
              </Carousel>
            </div>
          </div>

          {/* Prótese Protocolo */}
          <div className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="order-2 lg:order-1 px-2 md:px-4 lg:px-8">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full relative"
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F9d53ceb125ab44c0aef02038a0f5cf1a?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 1 Antes"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F6e5af1cac26249f1a4b4ab30bed78029?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 1 Prótese"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Ff9a91c1d1b524454b5123fcef676bf0b?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 1 Durante"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F22fcd3fa13e442e9b0d6e33305cf7d55?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 2 Prótese"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Ff9ed7b5c4c9f44bfbfe125ba0ec52545?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 2 Tomografia"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2Fc35772ff5b4d463db86915248e03ff4f?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 3 Antes"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F9fe8a746316f45a0a765ac3fdf9ecd8f?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 3 Prótese"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-2 md:p-3 lg:p-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F403b9360bc594a06973aa2dafa172b04%2F3fbd7d52a0ef47c69541ccb3232ae32f?format=webp&width=800"
                        alt="Prótese Protocolo - Caso 3 Tomografia"
                        className="w-full rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-0 lg:-left-4" />
                <CarouselNext className="right-2 md:right-0 lg:-right-4" />
              </Carousel>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-accent/10 rounded-3xl transform rotate-3" />
                <div className="relative bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-card">
                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight">
                    Prótese Protocolo
                  </h3>
                  <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed font-light">
                    Recupere todos os dentes com segurança e estabilidade total. A prótese protocolo é a 
                    solução definitiva para quem perdeu todos ou quase todos os dentes, oferecendo 
                    um sorriso fixo, natural e funcional.
                  </p>
                  <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Reabilitação completa em 24h
                    </li>
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Prótese fixa sobre implantes
                    </li>
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Mastigação eficiente imediata
                    </li>
                    <li className="flex items-center text-foreground text-sm md:text-lg">
                      <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                      Estética natural e confortável
                    </li>
                  </ul>
                  <Button 
                    className="btn-hero"
                    onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
                  >
                    SAIBA MAIS SOBRE PROTOCOLO
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProceduresSection;
