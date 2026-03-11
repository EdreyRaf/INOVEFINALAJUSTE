import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled && !isMobile
          ? 'backdrop-blur-md shadow-card'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled && !isMobile ? '#111827' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe4d9e5641bae44afb2e6b6c54e973be7%2F5089900ac19c4caa91966cf657bc3f36"
              alt="Inove Odontologia"
              className="h-16 lg:h-20 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('clinica')}
              className={`transition-colors font-semibold text-base lg:text-lg ${
                isScrolled && !isMobile
                  ? 'text-white hover:text-accent'
                  : 'text-primary hover:text-accent'
              }`}
              style={{
                backgroundColor: 'transparent',
                color: isScrolled && !isMobile ? '#ffffff' : '#111827',
              }}
            >
              Clínica
            </button>
            <button
              onClick={() => scrollToSection('procedimentos')}
              className={`transition-colors font-semibold text-base lg:text-lg ${
                isScrolled && !isMobile
                  ? 'text-white hover:text-accent'
                  : 'text-primary hover:text-accent'
              }`}
              style={{
                backgroundColor: 'transparent',
                color: isScrolled && !isMobile ? '#ffffff' : '#111827',
              }}
            >
              Procedimentos
            </button>
            <button
              onClick={() => scrollToSection('doutor')}
              className={`transition-colors font-semibold text-base lg:text-lg ${
                isScrolled && !isMobile
                  ? 'text-white hover:text-accent'
                  : 'text-primary hover:text-accent'
              }`}
              style={{
                backgroundColor: 'transparent',
                color: isScrolled && !isMobile ? '#ffffff' : '#111827',
              }}
            >
              Quem é Eterno Freitas
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className={`transition-colors font-semibold text-base lg:text-lg ${
                isScrolled && !isMobile
                  ? 'text-white hover:text-accent'
                  : 'text-primary hover:text-accent'
              }`}
              style={{
                backgroundColor: 'transparent',
                color: isScrolled && !isMobile ? '#ffffff' : '#111827',
              }}
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className={`transition-colors font-semibold text-base lg:text-lg ${
                isScrolled && !isMobile
                  ? 'text-white hover:text-accent'
                  : 'text-primary hover:text-accent'
              }`}
              style={{
                backgroundColor: 'transparent',
                color: isScrolled && !isMobile ? '#ffffff' : '#111827',
              }}
            >
              Entre em contato
            </button>
            <Button
              className="btn-hero"
              onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
            >
              AGENDAR ATENDIMENTO
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white hover:text-primary shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 rounded-xl"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-md rounded-lg mt-2 p-4 shadow-card" style={{ backgroundColor: '#111827' }}>
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('clinica')}
                className="text-left text-white hover:text-accent transition-colors font-semibold text-base"
              >
                Clínica
              </button>
              <button
                onClick={() => scrollToSection('procedimentos')}
                className="text-left text-white hover:text-accent transition-colors font-semibold text-base"
              >
                Procedimentos
              </button>
              <button
                onClick={() => scrollToSection('doutor')}
                className="text-left text-white hover:text-accent transition-colors font-semibold text-base"
              >
                Quem é Eterno Freitas
              </button>
              <button
                onClick={() => scrollToSection('depoimentos')}
                className="text-left text-white hover:text-accent transition-colors font-semibold text-base"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-left text-white hover:text-accent transition-colors font-semibold text-base"
              >
                Entre em contato
              </button>
              <Button
                className="btn-hero w-full"
                onClick={() => window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank')}
              >
                AGENDAR ATENDIMENTO
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
