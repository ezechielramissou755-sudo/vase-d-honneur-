import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Bell, Mail, Phone, Check, Loader2, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import FooterSection from "@/components/home/FooterSection";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    whatsapp: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await base44.entities.Subscriber.create({
        ...formData,
        is_active: true
      });
      setIsSuccess(true);
      toast.success("Inscription réussie ! Vous recevrez bientôt nos notifications.");
      setFormData({ full_name: "", email: "", whatsapp: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Contact</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Restez connecté(e)
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Inscrivez-vous aux notifications et restez informé(e) des activités de l'église.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Subscription Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">S'inscrire aux notifications</h2>
              <p className="text-slate-600 mb-8">
                Recevez les rappels de cultes, les annonces importantes et les programmes spéciaux.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-slate-700">Nom et prénom *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                    className="h-12 rounded-xl"
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Adresse e-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl pl-10"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-slate-700">Numéro WhatsApp (optionnel)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="h-12 rounded-xl pl-10"
                      placeholder="+XXX XX XX XX XX"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 hover:bg-blue-800 h-14 rounded-xl text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Inscrit avec succès !
                    </>
                  ) : (
                    <>
                      <Bell className="w-5 h-5 mr-2" />
                      S'inscrire aux notifications
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Rappels de cultes", "Annonces importantes", "Événements spéciaux"].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                    <Check className="w-3 h-3 text-amber-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Informations de contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Adresse</h4>
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
                    <h4 className="font-semibold text-slate-800 mb-1">Heures de culte</h4>
                    <p className="text-slate-600">Dimanche: 7h30 - 9h30</p>
                    <p className="text-slate-600">Dimanche: 10h00 - 12h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Téléphone</h4>
                    <p className="text-slate-600">+225 07 48 48 34 39</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                    <p className="text-slate-600">vasesdhonneuryopougonniangon27@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.854!2d9.754!3d4.048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDInNTIuOCJOIDnCsDQ1JzE0LjQiRQ!5e0!3m2!1sfr!2scm!4v1620000000000!5m2!1sfr!2scm"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
