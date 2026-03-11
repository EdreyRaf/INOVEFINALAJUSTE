import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleClick = () => {
    window.open('https://api.whatsapp.com/send?1=pt_BR&phone=5587981164843&text=Oi!%20Vim%20do%20site%2C%20queria%20mais%20informa%C3%A7%C3%B5es!', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-float"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </button>
  );
};

export default WhatsAppFloat;
