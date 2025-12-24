import React from 'react';
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationSection() {
  const handleGetDirections = () => {
    // Open Google Maps with specific directions to the church
    window.open("https://www.google.com/maps/dir//5.32843,-4.09793/@5.3284644,-4.0981132,21z", "_blank");
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Nous trouver</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-6">
            Notre Localisation
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-slate-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.0!2d-4.09793!3d5.32843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTknNDIuMyJOIDTCsDA1JzUyLjYiVw!5e0!3m2!1sfr!2sci!4v1620000000000!5m2!1sfr!2sci&markers=color:red%7C5.32843,-4.09793&zoom=19"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:grayscale-0 transition-all duration-500"
              />
              {/* Pin Indicator Overlay */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Église Vase d'Honneur
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Informations de contact</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Adresse</h4>
                    <p className="text-slate-600">Église Vase d'Honneur</p>
                    <p className="text-slate-500 text-sm">Yopougon Niangon Terminus 27</p>
                    <p className="text-slate-500 text-sm">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Heures de culte</h4>
                    <p className="text-slate-600">Dimanche: 7h30 - 9h30 & 10h00 - 12h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Téléphone</h4>
                    <p className="text-slate-600">+225 07 48 48 34 39</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGetDirections}
                className="w-full mt-8 bg-blue-900 hover:bg-blue-800 text-white h-14 rounded-xl text-lg font-semibold shadow-lg shadow-blue-900/30"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Obtenir l'itinéraire
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
