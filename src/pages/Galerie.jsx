import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import FooterSection from "@/components/home/FooterSection";

export default function Galerie() {
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: gallery = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: () => base44.entities.Gallery.list('-event_date'),
  });

  // Get unique events for filter
  const events = [...new Set(gallery.map(item => item.event_name))];

  const filteredGallery = selectedEvent === "all" 
    ? gallery 
    : gallery.filter(item => item.event_name === selectedEvent);

  const openLightbox = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const navigate = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredGallery.length 
      : (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setCurrentIndex(newIndex);
    setSelectedMedia(filteredGallery[newIndex]);
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
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Nos moments</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Galerie Multimédia
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Revivez les moments forts de l'église Vase d'Honneur à travers nos photos et vidéos.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-blue-900">
            {selectedEvent === "all" ? "Tous les événements" : selectedEvent}
          </h2>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrer par événement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les événements</SelectItem>
              {events.map(event => (
                <SelectItem key={event} value={event}>{event}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredGallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openLightbox(item, index)}
                className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                {item.media_type === "photo" ? (
                  <img 
                    src={item.media_url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center relative">
                    {item.thumbnail_url ? (
                      <img 
                        src={item.thumbnail_url} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm line-clamp-2">{item.title}</p>
                    {item.event_date && (
                      <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(parseISO(item.event_date), "d MMM yyyy", { locale: fr })}
                      </p>
                    )}
                  </div>
                </div>
                {item.is_featured && (
                  <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
                    ⭐ À la une
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Aucun média trouvé</h3>
            <p className="text-slate-500">Les photos et vidéos seront bientôt disponibles</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>

            {filteredGallery.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {selectedMedia && (
              <div className="w-full">
                {selectedMedia.media_type === "photo" ? (
                  <img 
                    src={selectedMedia.media_url} 
                    alt={selectedMedia.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <video 
                    src={selectedMedia.media_url} 
                    controls 
                    autoPlay
                    className="w-full max-h-[80vh]"
                  />
                )}
                <div className="bg-slate-900 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{selectedMedia.title}</h3>
                  {selectedMedia.description && (
                    <p className="text-slate-300 mb-3">{selectedMedia.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedMedia.event_date && format(parseISO(selectedMedia.event_date), "d MMMM yyyy", { locale: fr })}
                    </span>
                    <Badge variant="outline" className="text-slate-300 border-slate-600">
                      {selectedMedia.event_name}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <FooterSection />
    </div>
  );
}
