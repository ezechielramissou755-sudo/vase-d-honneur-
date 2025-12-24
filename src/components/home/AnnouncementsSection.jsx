import React from 'react';
import { motion } from "framer-motion";
import { Bell, Calendar, ArrowRight, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const typeConfig = {
  general: { label: "Général", color: "bg-blue-100 text-blue-800" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
  event: { label: "Événement", color: "bg-green-100 text-green-800" },
  prayer: { label: "Prière", color: "bg-purple-100 text-purple-800" }
};

export default function AnnouncementsSection({ announcements }) {
  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Restez informé</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-6">
            Actualités & Annonces
          </h2>
        </motion.div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.slice(0, 3).map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {announcement.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={announcement.image_url} 
                      alt={announcement.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={typeConfig[announcement.type]?.color || typeConfig.general.color}>
                      {typeConfig[announcement.type]?.label || "Général"}
                    </Badge>
                    {announcement.publish_date && (
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(announcement.publish_date), "d MMM", { locale: fr })}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{announcement.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3 flex-grow">{announcement.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to={createPageUrl("Evenements")}>
            <Button variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-full px-8">
              Voir toutes les actualités
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
