import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Play, Calendar, Book, User, Search, Video, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import FooterSection from "@/components/home/FooterSection";

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSermon, setSelectedSermon] = useState(null);

  const { data: sermons = [], isLoading } = useQuery({
    queryKey: ['sermons'],
    queryFn: () => base44.entities.Sermon.list('-sermon_date'),
  });

  const filteredSermons = sermons.filter(sermon =>
    sermon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.preacher?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.scripture_reference?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
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
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">La Parole</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Messages & Enseignements
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Retrouvez les prédications et enseignements de l'église Vase d'Honneur.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Search */}
        <div className="mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un message..."
              className="pl-12 h-14 rounded-2xl border-slate-200 shadow-sm"
            />
          </div>
        </div>

        {/* Selected Sermon Player */}
        {selectedSermon && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100"
          >
            {selectedSermon.video_url && getYoutubeEmbedUrl(selectedSermon.video_url) ? (
              <div className="aspect-video">
                <iframe
                  src={getYoutubeEmbedUrl(selectedSermon.video_url)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : selectedSermon.audio_url ? (
              <div className="p-8 bg-gradient-to-br from-blue-900 to-blue-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center">
                    <Headphones className="w-8 h-8 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">{selectedSermon.title}</h3>
                    <p className="text-blue-200">{selectedSermon.preacher}</p>
                  </div>
                </div>
                <audio controls className="w-full" src={selectedSermon.audio_url} />
              </div>
            ) : null}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedSermon.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-amber-500" />
                  {selectedSermon.preacher}
                </span>
                {selectedSermon.sermon_date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    {format(parseISO(selectedSermon.sermon_date), "d MMMM yyyy", { locale: fr })}
                  </span>
                )}
                {selectedSermon.scripture_reference && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Book className="w-3 h-3 mr-1" />
                    {selectedSermon.scripture_reference}
                  </Badge>
                )}
              </div>
              {selectedSermon.description && (
                <p className="text-slate-600">{selectedSermon.description}</p>
              )}
              <Button 
                variant="ghost" 
                onClick={() => setSelectedSermon(null)}
                className="mt-4"
              >
                Fermer
              </Button>
            </div>
          </motion.div>
        )}

        {/* Sermons Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredSermons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon, index) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedSermon(sermon)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-800 overflow-hidden">
                  {sermon.thumbnail_url ? (
                    <img 
                      src={sermon.thumbnail_url} 
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {sermon.video_url && (
                      <Badge className="bg-red-500 text-white">
                        <Video className="w-3 h-3 mr-1" />
                        Vidéo
                      </Badge>
                    )}
                    {sermon.audio_url && (
                      <Badge className="bg-blue-500 text-white">
                        <Headphones className="w-3 h-3 mr-1" />
                        Audio
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-blue-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {sermon.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <User className="w-4 h-4 text-amber-500" />
                    <span>{sermon.preacher}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    {sermon.sermon_date && (
                      <span>{format(parseISO(sermon.sermon_date), "d MMM yyyy", { locale: fr })}</span>
                    )}
                    {sermon.scripture_reference && (
                      <Badge variant="outline" className="text-xs">
                        {sermon.scripture_reference}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Book className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Aucun message trouvé</h3>
            <p className="text-slate-500">
              {searchQuery ? "Essayez une autre recherche" : "Les messages seront bientôt disponibles"}
            </p>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
