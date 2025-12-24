import React from 'react';
import { motion } from "framer-motion";
import { Music, HandHeart, Users, Baby, Heart } from "lucide-react";

export default function MinistriesSection({ ministries }) {
  const defaultMinistries = [
    { name: "Ministère de louange", description: "Conduire l'église dans l'adoration et la présence de Dieu", icon: "Music" },
    { name: "Ministère de prière", description: "Intercéder pour l'église, les membres et les nations", icon: "HandHeart" },
    { name: "Ministère jeunesse", description: "Former et équiper la jeune génération pour Christ", icon: "Users" },
    { name: "Ministère des enfants", description: "Enseigner les enfants dans les voies du Seigneur", icon: "Baby" },
    { name: "Ministère social", description: "Servir la communauté et aider les personnes dans le besoin", icon: "Heart" }
  ];

  const displayMinistries = ministries && ministries.length > 0 ? ministries : defaultMinistries;

  const getIcon = (iconName) => {
    const icons = { Music, HandHeart, Users, Baby, Heart };
    return icons[iconName] || Heart;
  };

  const colors = [
    "from-blue-600 to-blue-700",
    "from-purple-600 to-purple-700",
    "from-green-600 to-green-700",
    "from-amber-500 to-amber-600",
    "from-rose-500 to-rose-600"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Servir ensemble</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-6">
            Nos Ministères
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Découvrez les différents ministères de notre église et trouvez votre place pour servir.
          </p>
        </motion.div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMinistries.map((ministry, index) => {
            const IconComponent = getIcon(ministry.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-slate-50 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-blue-900 hover:to-blue-800 transition-all duration-500 h-full border border-slate-100 hover:border-transparent">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-white transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="text-slate-600 group-hover:text-blue-200 transition-colors">
                    {ministry.description}
                  </p>
                  {ministry.meeting_day && ministry.meeting_time && (
                    <p className="mt-3 text-sm text-amber-600 group-hover:text-amber-400 transition-colors font-medium">
                      {ministry.meeting_day} à {ministry.meeting_time}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
