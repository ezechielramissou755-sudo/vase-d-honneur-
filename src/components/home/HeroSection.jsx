import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/70 to-blue-950/90" />
      </div>

      {/* Animated Decorative Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Floating Light Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
      
      {/* Divine Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200/20 via-amber-300/10 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 left-1/3 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200/15 via-blue-300/5 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-0 left-2/3 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200/15 via-amber-300/5 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Icon */}
          <motion.div 
            className="mb-6 flex justify-center"
            animate={{ 
              y: [0, -10, 0],
              filter: ["drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))", "drop-shadow(0 0 40px rgba(251, 191, 36, 0.5))", "drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69487ef15a1926a33e78de51/a221c9c8a_Sanstitre-1-Rcupr.png"
              alt="Vase d'Honneur"
              className="h-32 w-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(251, 191, 36, 0.5)",
                "0 0 40px rgba(251, 191, 36, 0.8)",
                "0 0 20px rgba(251, 191, 36, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Vase d'Honneur
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-amber-300 text-xl md:text-2xl font-light italic mb-8"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Débordement d'amour divin
          </motion.p>

          {/* Welcome Message */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Bienvenue sur le site officiel de l'église Vase d'Honneur — Débordement d'amour divin.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
              >
                <Bell className="w-5 h-5 mr-2" />
                S'inscrire aux notifications
              </Button>
            </Link>
            <Link to={createPageUrl("Evenements")}>
              <Button 
                size="lg" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 font-semibold shadow-lg"
              >
                Nos événements
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
