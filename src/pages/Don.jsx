import React from 'react';
import { motion } from "framer-motion";
import { Heart, Gift, Wallet, CreditCard, Copy, Check, Sparkles, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import FooterSection from "@/components/home/FooterSection";

export default function Don() {
  const [copied, setCopied] = React.useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success("Copié dans le presse-papiers");
    setTimeout(() => setCopied(null), 2000);
  };

  const donationTypes = [
    {
      icon: Gift,
      title: "Offrandes",
      description: "Votre soutien régulier permet à l'église de fonctionner et de servir la communauté.",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: Wallet,
      title: "Dîmes",
      description: "La dîme est la part de Dieu. Elle représente 10% de vos revenus dédiés à l'œuvre du Seigneur.",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: CreditCard,
      title: "Dons spéciaux",
      description: "Soutenez des projets spécifiques, des missions ou des événements de l'église.",
      color: "from-purple-600 to-purple-700"
    }
  ];

  // Positions fixes pour les cœurs flottants
  const heartPositions = [
    { left: '10%', top: '20%', delay: 0 },
    { left: '85%', top: '15%', delay: 1.5 },
    { left: '20%', top: '70%', delay: 0.8 },
    { left: '75%', top: '60%', delay: 2.2 },
    { left: '50%', top: '30%', delay: 1.2 },
    { left: '30%', top: '85%', delay: 2.8 },
    { left: '90%', top: '45%', delay: 0.5 },
    { left: '5%', top: '50%', delay: 1.8 },
  ];

  // Particules de lumière divine
  const lightParticles = [
    { left: '15%', top: '25%', size: 4, delay: 0 },
    { left: '80%', top: '20%', size: 6, delay: 1 },
    { left: '25%', top: '75%', size: 5, delay: 2 },
    { left: '70%', top: '65%', size: 4, delay: 0.5 },
    { left: '45%', top: '15%', size: 7, delay: 1.5 },
    { left: '60%', top: '80%', size: 5, delay: 2.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-blue-900 relative overflow-hidden">
      {/* Animated Background Gradient Overlay */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700/30 via-amber-800/50 to-blue-900/40 py-24 px-4 relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Divine Light Rays - Golden */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px]"
            style={{
              background: 'conic-gradient(from 90deg at 50% 0%, transparent 0deg, rgba(251, 191, 36, 0.15) 20deg, transparent 40deg, rgba(251, 191, 36, 0.1) 60deg, transparent 80deg, rgba(251, 191, 36, 0.12) 100deg, transparent 120deg, rgba(251, 191, 36, 0.08) 140deg, transparent 160deg, rgba(251, 191, 36, 0.15) 180deg)',
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.15, 1],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Golden Glowing Orbs */}
        <motion.div 
          className="absolute top-10 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Divine Light Particles */}
        {lightParticles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-amber-300"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              boxShadow: '0 0 20px 5px rgba(251, 191, 36, 0.4)',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating Hearts with Gentle Animation */}
        {heartPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: pos.left, top: pos.top }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-6 h-6 text-amber-400/40 fill-amber-400/20" />
          </motion.div>
        ))}

        {/* Floating Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-300/50" />
          </motion.div>
        ))}
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Glowing Heart Icon */}
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-8 shadow-2xl relative"
              animate={{
                boxShadow: [
                  '0 0 30px 10px rgba(251, 191, 36, 0.3)',
                  '0 0 50px 20px rgba(251, 191, 36, 0.5)',
                  '0 0 30px 10px rgba(251, 191, 36, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>

            <motion.span 
              className="text-amber-400 font-semibold text-sm uppercase tracking-[0.3em] block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Soutenir l'œuvre
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                textShadow: '0 0 40px rgba(251, 191, 36, 0.3)',
              }}
            >
              Faire une Offrande
            </motion.h1>
            
            <motion.p 
              className="text-blue-200 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Participez à l'avancement du Royaume de Dieu et soutenez les activités de l'église Vase d'Honneur.
            </motion.p>

            {/* Verse Card with Divine Glow */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto border border-amber-400/20 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-3xl" />
              
              <motion.p 
                className="text-white/95 text-xl italic relative z-10 leading-relaxed"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                « Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde. »
              </motion.p>
              <motion.p 
                className="text-amber-400 font-bold mt-4 text-lg relative z-10"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(251, 191, 36, 0.3)',
                    '0 0 20px rgba(251, 191, 36, 0.5)',
                    '0 0 10px rgba(251, 191, 36, 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Luc 6:38
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-20 relative">
        {/* Background Decorations with Golden Animation */}
        <motion.div 
          className="absolute top-20 left-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 right-0 w-96 h-96 bg-amber-500/12 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl"
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Types de dons</h2>
          <p className="text-blue-200/80 max-w-xl mx-auto">Chaque don est une semence pour le Royaume de Dieu</p>
        </motion.div>

        {/* Donation Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 relative z-10">
          {donationTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full bg-gradient-to-br from-white/95 to-slate-50/90 shadow-2xl border-none hover:shadow-amber-500/30 transition-all duration-500 backdrop-blur-md overflow-hidden relative group">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-purple-500/0 group-hover:from-amber-500/10 group-hover:to-purple-500/5 transition-all duration-500" />
                  
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-5 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <type.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-blue-900 font-bold">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Moyens de paiement</h2>
            <p className="text-blue-200/80 max-w-xl mx-auto">Plusieurs options pour faciliter votre don</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mobile Money */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-br from-amber-500/15 to-orange-600/10 border border-amber-400/30 backdrop-blur-md shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 overflow-hidden relative group">
                {/* Animated Border Glow */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.1), transparent)',
                  }}
                />
                
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-2xl">📱</span>
                    </motion.div>
                    <span className="font-bold">Mobile Money</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div 
                    className="bg-white/95 rounded-xl p-4 shadow-inner"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className="text-sm text-slate-500 mb-2 font-medium">Orange Money</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono font-bold text-slate-800 text-lg">(Numéro à préciser)</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard("0000000000", "orange")}
                        className="hover:bg-amber-100 transition-colors"
                      >
                        {copied === "orange" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-slate-600" />}
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/95 rounded-xl p-4 shadow-inner"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className="text-sm text-slate-500 mb-2 font-medium">MTN Mobile Money</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono font-bold text-slate-800 text-lg">(Numéro à préciser)</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard("0000000000", "mtn")}
                        className="hover:bg-amber-100 transition-colors"
                      >
                        {copied === "mtn" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-slate-600" />}
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bank Transfer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/15 to-purple-600/10 border border-blue-400/30 backdrop-blur-md shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 overflow-hidden relative group">
                {/* Animated Border Glow */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
                  }}
                />
                
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: -10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-2xl">🏦</span>
                    </motion.div>
                    <span className="font-bold">Virement bancaire</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div 
                    className="bg-white/95 rounded-xl p-4 shadow-inner"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className="text-sm text-slate-500 mb-2 font-medium">Titulaire du compte</p>
                    <p className="font-bold text-slate-800 text-lg">Église Vase d'Honneur</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/95 rounded-xl p-4 shadow-inner"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className="text-sm text-slate-500 mb-2 font-medium">Numéro de compte</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono font-bold text-slate-800 text-lg">(À préciser)</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard("0000000000", "bank")}
                        className="hover:bg-blue-100 transition-colors"
                      >
                        {copied === "bank" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-slate-600" />}
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/95 rounded-xl p-4 shadow-inner"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className="text-sm text-slate-500 mb-2 font-medium">Banque</p>
                    <p className="font-bold text-slate-800 text-lg">(Nom de la banque)</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 max-w-3xl mx-auto relative z-10"
        >
          <motion.div 
            className="bg-gradient-to-br from-white/95 to-amber-50/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-amber-200/50 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-purple-500/5 rounded-3xl" />
            
            {/* Floating Hearts in Thank You Section */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`ty-heart-${i}`}
                className="absolute"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${10 + (i % 2) * 70}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-5 h-5 text-amber-400/40 fill-amber-400/20" />
              </motion.div>
            ))}
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-blue-900 mb-4"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Merci pour votre générosité
              </motion.h3>
              
              <p className="text-slate-600 leading-relaxed text-lg max-w-xl mx-auto">
                Votre don contribue à l'avancement de l'Évangile et au soutien des membres de notre communauté. 
                <span className="block mt-3 font-semibold text-amber-600">
                  Que Dieu vous bénisse abondamment !
                </span>
              </p>
              
              {/* Blessing Sparkles */}
              <motion.div 
                className="flex justify-center gap-3 mt-6"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <Sparkles className="w-5 h-5 text-purple-500" />
                <Sparkles className="w-5 h-5 text-blue-500" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <FooterSection />
    </div>
  );
}
