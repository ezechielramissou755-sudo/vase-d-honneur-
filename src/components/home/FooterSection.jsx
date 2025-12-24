import React from 'react';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FooterSection() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69487ef15a1926a33e78de51/a221c9c8a_Sanstitre-1-Rcupr.png"
                alt="Vase d'Honneur"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-blue-200 leading-relaxed max-w-md">
              Une communauté chrétienne dédiée à l'adoration de Dieu, à l'enseignement biblique et à l'accompagnement spirituel des fidèles.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61561556027396"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {[
                { name: "Accueil", page: "Home" },
                { name: "Événements", page: "Evenements" },
                { name: "Messages", page: "Messages" },
                { name: "Contact", page: "Contact" },
                { name: "Politique de Confidentialité", page: "PolitiqueConfidentialite" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={createPageUrl(link.page)} 
                    className="text-blue-200 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-200 text-sm">Yopougon Niangon Terminus 27, Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-blue-200 text-sm">+225 07 48 48 34 39</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm break-all">vasesdhonneuryopougonniangon27@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Verse */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-blue-200 italic text-sm max-w-2xl mx-auto mb-6">
            « Mais nous avons ce trésor dans des vases de terre, afin que cette grande puissance soit attribuée à Dieu, et non pas à nous. »
            <span className="text-amber-400 font-semibold ml-2">— 2 Corinthiens 4:7</span>
          </p>
          <p className="text-blue-300/60 text-sm">
            © {new Date().getFullYear()} Église Vase d'Honneur — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
