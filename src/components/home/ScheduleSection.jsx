import React from 'react';
import { motion } from "framer-motion";
import { Clock, Calendar, Users, BookOpen, HandHeart } from "lucide-react";

export default function ScheduleSection() {
  const activities = [
    {
      icon: Calendar,
      title: "Culte principal (1er culte)",
      day: "Dimanche",
      time: "7h30 - 9h30",
      color: "from-blue-800 to-blue-900"
    },
    {
      icon: Calendar,
      title: "Culte principal (2ᵉ culte)",
      day: "Dimanche",
      time: "10h00 - 12h00",
      color: "from-blue-700 to-blue-800"
    },
    {
      icon: BookOpen,
      title: "Étude biblique",
      day: "Mercredi",
      time: "18h30",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: HandHeart,
      title: "Prière & intercession",
      day: "Vendredi",
      time: "19h00",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Users,
      title: "Jeunesse & enfants",
      day: "Samedi",
      time: "16h00",
      color: "from-green-600 to-green-700"
    }
  ];

  return (
    <section className="py-24 bg-blue-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Programme</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Nos Activités
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Rejoignez-nous pour des moments de communion, d'adoration et d'enseignement.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center mb-4`}>
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{activity.title}</h3>
                <div className="flex items-center gap-2 text-blue-200">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">{activity.day}</span>
                  <span className="text-amber-400">•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
