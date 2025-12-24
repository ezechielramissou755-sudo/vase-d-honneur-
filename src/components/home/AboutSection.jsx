import React from 'react';
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Notre Mission",
      description: "Annoncer l'Évangile de Jésus-Christ, former des disciples solides dans la foi et aider chaque personne à devenir un vase utile entre les mains de Dieu."
    },
    {
      icon: Eye,
      title: "Notre Vision",
      description: "Être une église vivante qui impacte positivement les vies et la société, en manifestant l'amour et la puissance de Dieu."
    },
    {
      icon: Users,
      title: "Notre Communauté",
      description: "Une famille spirituelle unie dans l'amour, l'adoration et le service, où chacun trouve sa place et grandit dans la foi."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">À propos de nous</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-6">
            Église Vase d'Honneur
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Une communauté chrétienne dédiée à l'adoration de Dieu, à l'enseignement biblique et à l'accompagnement spirituel des fidèles.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
