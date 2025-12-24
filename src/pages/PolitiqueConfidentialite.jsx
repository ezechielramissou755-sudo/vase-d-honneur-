import React from 'react';
import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Mail, Clock } from "lucide-react";
import FooterSection from "@/components/home/FooterSection";

export default function PolitiqueConfidentialite() {
  const sections = [
    {
      icon: Shield,
      title: "Collecte des informations",
      content: "Nous collectons les informations que vous nous fournissez volontairement lorsque vous vous inscrivez aux notifications, contactez l'église ou participez à nos événements. Ces informations peuvent inclure votre nom, adresse e-mail, numéro de téléphone WhatsApp et autres informations de contact."
    },
    {
      icon: Lock,
      title: "Utilisation des données",
      content: "Vos informations sont utilisées uniquement pour vous tenir informé des événements de l'église, partager des messages spirituels, répondre à vos demandes et améliorer nos services. Nous ne vendons jamais vos informations personnelles à des tiers."
    },
    {
      icon: Eye,
      title: "Protection des données",
      content: "Nous prenons la sécurité de vos données très au sérieux. Vos informations sont stockées de manière sécurisée et nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé."
    },
    {
      icon: UserCheck,
      title: "Vos droits",
      content: "Vous avez le droit d'accéder à vos données personnelles, de les rectifier, de les supprimer ou de limiter leur traitement. Vous pouvez également vous désinscrire de nos communications à tout moment en nous contactant directement."
    },
    {
      icon: Mail,
      title: "Communications",
      content: "Avec votre consentement, nous pouvons vous envoyer des e-mails concernant nos événements, messages spirituels et actualités de l'église. Vous pouvez vous désabonner à tout moment via le lien de désinscription dans nos e-mails."
    },
    {
      icon: Clock,
      title: "Conservation des données",
      content: "Nous conservons vos informations personnelles aussi longtemps que nécessaire pour vous fournir nos services ou conformément aux exigences légales. Si vous demandez la suppression de votre compte, nous supprimerons vos données dans un délai raisonnable."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Votre vie privée est importante pour nous. Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles.
            </p>
            <p className="text-blue-300 text-sm mt-4">
              Dernière mise à jour : Décembre 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-8"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Introduction</h2>
          <p className="text-slate-600 leading-relaxed">
            L'Église Vase d'Honneur s'engage à protéger votre vie privée et vos données personnelles. 
            Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons 
            vos informations lorsque vous utilisez notre site web et nos services.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{section.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 shadow-xl mt-12 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Questions ou préoccupations ?</h3>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Si vous avez des questions concernant cette politique de confidentialité ou sur la manière dont 
            nous traitons vos données personnelles, n'hésitez pas à nous contacter :
          </p>
          <div className="space-y-3 text-blue-100">
            <p><strong className="text-white">Email :</strong> vasesdhonneuryopougonniangon27@gmail.com</p>
            <p><strong className="text-white">Téléphone :</strong> +225 07 48 48 34 39</p>
            <p><strong className="text-white">Adresse :</strong> Yopougon Niangon Terminus 27, Abidjan, Côte d'Ivoire</p>
          </div>
        </motion.div>

        {/* Legal Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl"
        >
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Note importante :</strong> Cette politique de confidentialité peut être mise à jour 
            de temps en temps. Nous vous encourageons à consulter régulièrement cette page pour rester informé 
            de toute modification. La date de dernière mise à jour est indiquée en haut de cette page.
          </p>
        </motion.div>
      </div>

      <FooterSection />
    </div>
  );
}
