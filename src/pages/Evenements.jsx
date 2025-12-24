import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight, Bell, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FooterSection from "@/components/home/FooterSection";

const typeConfig = {
  general: { label: "Général", color: "bg-blue-100 text-blue-800" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
  event: { label: "Événement", color: "bg-green-100 text-green-800" },
  prayer: { label: "Prière", color: "bg-purple-100 text-purple-800" }
};

export default function Evenements() {
  const [filter, setFilter] = useState("all");

  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ['all-announcements'],
    queryFn: () => base44.entities.Announcement.filter({ is_published: true }, '-publish_date'),
  });

  const { data: events = [], isLoading: loadingEvents } = useQuery({
    queryKey: ['all-events'],
    queryFn: () => base44.entities.Event.list('-event_date'),
  });

  const now = new Date();
  const upcomingEvents = events.filter(e => e.event_date && isAfter(parseISO(e.event_date), now));
  const pastEvents = events.filter(e => e.event_date && isBefore(parseISO(e.event_date), now));

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
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Restez informé</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Événements & Actualités
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Découvrez les prochains événements et les dernières nouvelles de l'église Vase d'Honneur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-amber-500" />
              Événements à venir
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all group"
                >
                  {event.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {event.is_featured && (
                      <Badge className="bg-amber-100 text-amber-800 mb-3">À la une</Badge>
                    )}
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{format(parseISO(event.event_date), "EEEE d MMMM yyyy", { locale: fr })}</span>
                      </div>
                      {event.start_time && (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span>{event.start_time}{event.end_time && ` - ${event.end_time}`}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-slate-500">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Announcements */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <Bell className="w-6 h-6 text-amber-500" />
              Annonces
            </h2>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="bg-white border">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="urgent">Urgentes</TabsTrigger>
                <TabsTrigger value="event">Événements</TabsTrigger>
                <TabsTrigger value="prayer">Prière</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loadingAnnouncements ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements
                .filter(a => filter === "all" || a.type === filter)
                .map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all group"
                  >
                    {announcement.image_url && (
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={announcement.image_url} 
                          alt={announcement.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={typeConfig[announcement.type]?.color || typeConfig.general.color}>
                          {typeConfig[announcement.type]?.label || "Général"}
                        </Badge>
                        {announcement.publish_date && (
                          <span className="text-slate-400 text-xs">
                            {format(parseISO(announcement.publish_date), "d MMM", { locale: fr })}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-blue-900 mb-2">{announcement.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-3">{announcement.content}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          {announcements.filter(a => filter === "all" || a.type === filter).length === 0 && !loadingAnnouncements && (
            <div className="text-center py-16">
              <p className="text-slate-500">Aucune annonce pour le moment.</p>
            </div>
          )}
        </section>
      </div>

      <FooterSection />
    </div>
  );
}
