import React from 'react';
import { motion } from "framer-motion";
import { Heart, Gift, Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function DonationSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-amber-100/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber-500/30">
            <Heart className="w-10 h-10 text-white" />
          </div>

          <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">Soutenir l'œuvre</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-6">
            Faire un Don
          </h2>
          
          {/* Verse */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-10 max-w-2xl mx-auto border border-amber-200/50">
            <p className="text-slate-700 text-lg italic">
              « Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde. »
            </p>
            <p className="text-amber-600 font-semibold mt-3">Luc 6:38</p>
          </div>

          {/* Donation Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Gift, title: "Offrandes", desc: "Soutien régulier de l'église" },
              { icon: Wallet, title: "Dîmes", desc: "La part de Dieu" },
              { icon: CreditCard, title: "Dons spéciaux", desc: "Projets et missions" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-amber-100/50 border border-amber-100"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <Link to={createPageUrl("Don")}>
            <Button 
              size="lg"
              className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-blue-900/30 transition-all hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              Faire un don maintenant
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
