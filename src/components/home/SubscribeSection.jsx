import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Bell, Mail, Phone, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function SubscribeSection() {
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
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-blue-900" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Restez connecté(e)
            </h2>
            <p className="text-blue-200 max-w-lg mx-auto">
              Inscrivez-vous pour recevoir les rappels de cultes, les annonces importantes et les programmes spéciaux.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-white">Nom et prénom *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                  className="bg-transparent border-white/30 text-white placeholder:text-white/60 h-12 rounded-xl focus:border-amber-400"
                  placeholder="Votre nom complet"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Adresse e-mail *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-transparent border-white/30 text-white placeholder:text-white/60 h-12 rounded-xl pl-10 focus:border-amber-400"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-white">Numéro WhatsApp (optionnel)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="bg-transparent border-white/30 text-white placeholder:text-white/60 h-12 rounded-xl pl-10 focus:border-amber-400"
                  placeholder="+XXX XX XX XX XX"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-blue-900 font-semibold h-14 rounded-xl text-lg shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02]"
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

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              Rappels de cultes
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              Annonces importantes
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              Événements spéciaux
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
