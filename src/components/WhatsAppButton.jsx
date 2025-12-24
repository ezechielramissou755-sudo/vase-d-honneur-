import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '+2250748483439';
  const message = 'Bonjour, je vous contacte depuis le site de l\'église Vase d\'Honneur.';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </button>
  );
}
