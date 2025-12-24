import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Pencil, Trash2, Bell, Calendar, Book, Users, Activity,
  ChevronRight, Save, X, Loader2, Eye, EyeOff, Image as ImageIcon, Video,
  TrendingUp, Mail, Phone, Megaphone, CalendarCheck, MessageSquare,
  Images, UserRound, Send, BellRing, CheckCircle2, Clock4
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format, parseISO, subDays } from "date-fns";
import { fr } from "date-fns/locale";

// Announcement Form
function AnnouncementForm({ announcement, onSave, onCancel, isLoading }) {
  const [form, setForm] = useState(announcement || {
    title: "", content: "", type: "general", image_url: "", is_published: true, publish_date: format(new Date(), 'yyyy-MM-dd')
  });
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Veuillez sélectionner une image.");
      return;
    }
    setIsUploadingFile(true);
    setUploadError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result?.toString() ?? "";
      setForm(prev => ({ ...prev, image_url: dataUrl }));
      setIsUploadingFile(false);
    };
    reader.onerror = () => {
      setUploadError("Impossible de lire le fichier sélectionné.");
      setIsUploadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="space-y-2">
        <Label>Titre *</Label>
        <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Titre de l'annonce" />
      </div>
      <div className="space-y-2">
        <Label>Contenu *</Label>
        <Textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Contenu de l'annonce" rows={4} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Général</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="event">Événement</SelectItem>
              <SelectItem value="prayer">Prière</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date de publication</Label>
          <Input type="date" value={form.publish_date} onChange={e => setForm({...form, publish_date: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Image de couverture</Label>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
          <Switch checked={useFileUpload} onCheckedChange={setUseFileUpload} />
          <div>
            <p className="text-sm font-medium text-slate-700">Importer depuis l'ordinateur</p>
            <p className="text-xs text-slate-500">Désactivez pour utiliser une URL (YouTube, CDN...).</p>
          </div>
        </div>
        {useFileUpload ? (
          <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploadingFile} />
            {isUploadingFile && <p className="text-xs text-slate-500">Chargement du fichier...</p>}
          </div>
        ) : (
          <Input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." />
        )}
        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
        {form.image_url && (
          <div className="border border-dashed border-slate-300 rounded-xl p-3">
            <p className="text-xs text-slate-500 mb-2">Prévisualisation</p>
            <img src={form.image_url} alt={form.title || "Image"} className="w-full rounded-lg object-cover" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={form.is_published} onCheckedChange={v => setForm({...form, is_published: v})} />
        <Label>Publié</Label>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={() => onSave(form)} disabled={isLoading || !form.title || !form.content}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

// Event Form
function EventForm({ event, onSave, onCancel, isLoading }) {
  const [form, setForm] = useState(event || {
    title: "", description: "", event_date: "", start_time: "", end_time: "", location: "", image_url: "", is_featured: false
  });
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Veuillez sélectionner une image.");
      return;
    }
    setIsUploadingFile(true);
    setUploadError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result?.toString() ?? "";
      setForm(prev => ({ ...prev, image_url: dataUrl }));
      setIsUploadingFile(false);
    };
    reader.onerror = () => {
      setUploadError("Impossible de lire le fichier sélectionné.");
      setIsUploadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="space-y-2">
        <Label>Titre *</Label>
        <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Titre de l'événement" />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Date *</Label>
          <Input type="date" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Début</Label>
          <Input type="time" value={form.start_time} onChange={e => setForm({...form, start_time: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Fin</Label>
          <Input type="time" value={form.end_time} onChange={e => setForm({...form, end_time: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Lieu</Label>
        <Input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Lieu de l'événement" />
      </div>
      <div className="space-y-2">
        <Label>Visuel de l'événement</Label>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
          <Switch checked={useFileUpload} onCheckedChange={setUseFileUpload} />
          <div>
            <p className="text-sm font-medium text-slate-700">Importer depuis l'ordinateur</p>
            <p className="text-xs text-slate-500">Désactivez pour coller une URL.</p>
          </div>
        </div>
        {useFileUpload ? (
          <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploadingFile} />
            {isUploadingFile && <p className="text-xs text-slate-500">Chargement du fichier...</p>}
          </div>
        ) : (
          <Input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." />
        )}
        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
        {form.image_url && (
          <div className="border border-dashed border-slate-300 rounded-xl p-3">
            <p className="text-xs text-slate-500 mb-2">Prévisualisation</p>
            <img src={form.image_url} alt={form.title || "Visuel"} className="w-full rounded-lg object-cover" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={form.is_featured} onCheckedChange={v => setForm({...form, is_featured: v})} />
        <Label>Mettre en avant</Label>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={() => onSave(form)} disabled={isLoading || !form.title || !form.event_date}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

// Gallery Form
function GalleryForm({ item, onSave, onCancel, isLoading }) {
  const [form, setForm] = useState(item || {
    title: "", description: "", media_url: "", media_type: "photo", event_name: "", event_date: "", thumbnail_url: "", is_featured: false
  });
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingFile(true);
    setUploadError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result?.toString() ?? "";
      setForm(prev => ({
        ...prev,
        media_url: dataUrl,
        ...(prev.media_type === "photo" && { thumbnail_url: dataUrl })
      }));
      setIsUploadingFile(false);
    };
    reader.onerror = () => {
      setUploadError("Impossible de lire le fichier sélectionné.");
      setIsUploadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Titre *</Label>
        <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Titre" />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" rows={2} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type de média *</Label>
          <Select value={form.media_type} onValueChange={v => setForm({...form, media_type: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="photo">Photo</SelectItem>
              <SelectItem value="video">Vidéo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date de l'événement *</Label>
          <Input type="date" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Nom de l'événement *</Label>
        <Input value={form.event_name} onChange={e => setForm({...form, event_name: e.target.value})} placeholder="Ex: Culte du dimanche" />
      </div>

      <div className="space-y-2">
        <Label>Source du média *</Label>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
          <Switch checked={useFileUpload} onCheckedChange={setUseFileUpload} />
          <div>
            <p className="text-sm font-medium text-slate-700">Importer un fichier depuis l'ordinateur</p>
            <p className="text-xs text-slate-500">Si désactivé, vous pouvez coller une URL (YouTube, Vimeo, CDN...)</p>
          </div>
        </div>
      </div>

      {useFileUpload ? (
        <div className="space-y-2">
          <Label>Fichier {form.media_type === "photo" ? "image" : "vidéo"} *</Label>
          <Input
            type="file"
            accept={form.media_type === "photo" ? "image/*" : "video/*"}
            onChange={handleFileUpload}
            disabled={isUploadingFile}
          />
          {isUploadingFile && <p className="text-sm text-slate-500">Conversion du fichier en cours...</p>}
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
          <p className="text-xs text-slate-500">Le fichier sera converti en base64 et stocké dans la galerie (idéal pour des imports rapides).</p>
        </div>
      ) : (
        <div className="space-y-2">
          <Label>URL du média *</Label>
          <Input value={form.media_url} onChange={e => setForm({...form, media_url: e.target.value})} placeholder="https://..." />
        </div>
      )}

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          Miniature {form.media_type === "photo" ? "(auto)" : "(optionnel)"}
        </Label>
        {form.media_type === "photo" && useFileUpload ? (
          <p className="text-xs text-slate-500">La miniature reprend automatiquement la même image importée.</p>
        ) : (
          <Input value={form.thumbnail_url} onChange={e => setForm({...form, thumbnail_url: e.target.value})} placeholder="https://..." />
        )}
      </div>

      {form.media_url && (
        <div className="border border-dashed border-slate-300 rounded-xl p-4 space-y-3">
          <p className="text-sm font-medium text-slate-600">Prévisualisation</p>
          {form.media_type === "photo" ? (
            <img src={form.media_url} alt={form.title || "Prévisualisation"} className="w-full rounded-lg object-cover" />
          ) : (
            <video src={form.media_url} controls className="w-full rounded-lg">
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Switch checked={form.is_featured} onCheckedChange={v => setForm({...form, is_featured: v})} />
        <Label>Mettre en avant</Label>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={() => onSave(form)} disabled={isLoading || !form.title || !form.media_url || !form.event_name || !form.event_date}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

// Sermon Form
function SermonForm({ sermon, onSave, onCancel, isLoading }) {
  const [form, setForm] = useState(sermon || {
    title: "", preacher: "", description: "", scripture_reference: "", sermon_date: "", video_url: "", audio_url: "", thumbnail_url: ""
  });
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Veuillez sélectionner une image.");
      return;
    }
    setIsUploadingFile(true);
    setUploadError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result?.toString() ?? "";
      setForm(prev => ({ ...prev, thumbnail_url: dataUrl }));
      setIsUploadingFile(false);
    };
    reader.onerror = () => {
      setUploadError("Impossible de lire le fichier sélectionné.");
      setIsUploadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Titre *</Label>
          <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Titre du message" />
        </div>
        <div className="space-y-2">
          <Label>Prédicateur *</Label>
          <Input value={form.preacher} onChange={e => setForm({...form, preacher: e.target.value})} placeholder="Nom du prédicateur" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Résumé</Label>
        <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Résumé du message" rows={3} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date *</Label>
          <Input type="date" value={form.sermon_date} onChange={e => setForm({...form, sermon_date: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Référence biblique</Label>
          <Input value={form.scripture_reference} onChange={e => setForm({...form, scripture_reference: e.target.value})} placeholder="Ex: Jean 3:16" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Lien vidéo YouTube</Label>
        <Input value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})} placeholder="https://youtube.com/..." />
      </div>
      <div className="space-y-2">
        <Label>Lien audio</Label>
        <Input value={form.audio_url} onChange={e => setForm({...form, audio_url: e.target.value})} placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <Label>Image de couverture</Label>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
          <Switch checked={useFileUpload} onCheckedChange={setUseFileUpload} />
          <div>
            <p className="text-sm font-medium text-slate-700">Importer depuis l'ordinateur</p>
            <p className="text-xs text-slate-500">Désactivez pour coller une URL.</p>
          </div>
        </div>
        {useFileUpload ? (
          <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploadingFile} />
            {isUploadingFile && <p className="text-xs text-slate-500">Chargement du fichier...</p>}
          </div>
        ) : (
          <Input value={form.thumbnail_url} onChange={e => setForm({...form, thumbnail_url: e.target.value})} placeholder="https://..." />
        )}
        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
        {form.thumbnail_url && (
          <div className="border border-dashed border-slate-300 rounded-xl p-3">
            <p className="text-xs text-slate-500 mb-2">Prévisualisation</p>
            <img src={form.thumbnail_url} alt={form.title || "Visuel"} className="w-full rounded-lg object-cover" />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={() => onSave(form)} disabled={isLoading || !form.title || !form.preacher || !form.sermon_date}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

// Notification Form
function NotificationForm({ notification, onSave, onCancel, isLoading }) {
  const [form, setForm] = useState(notification || {
    title: "",
    message: "",
    channel: "all",
    scheduled_date: "",
    is_sent: false
  });

  useEffect(() => {
    if (notification) {
      setForm(notification);
    }
  }, [notification]);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Titre *</Label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Titre de la notification" />
        </div>
        <div className="space-y-2">
          <Label>Canal *</Label>
          <Select value={form.channel} onValueChange={v => setForm({ ...form, channel: v })}>
            <SelectTrigger><SelectValue placeholder="Choisir le canal" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les inscrits</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Message *</Label>
        <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Détail du message à envoyer" />
      </div>

      <div className="space-y-2">
        <Label>Date d'envoi (optionnel)</Label>
        <Input
          type="datetime-local"
          value={form.scheduled_date || ""}
          onChange={e => setForm({ ...form, scheduled_date: e.target.value })}
        />
        <p className="text-xs text-slate-500">Laissez vide pour envoyer immédiatement.</p>
      </div>

      <div className="flex items-center gap-2">
        <Switch checked={form.is_sent} onCheckedChange={v => setForm({ ...form, is_sent: v })} />
        <Label>Marquer comme déjà envoyé</Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button
          onClick={() => onSave(form)}
          disabled={isLoading || !form.title || !form.message}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default function Admin() {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("announcements");

  // Queries
  const { data: announcements = [] } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: () => base44.entities.Announcement.list('-created_date'),
  });

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => base44.entities.Event.list('-event_date'),
  });

  const { data: sermons = [] } = useQuery({
    queryKey: ['admin-sermons'],
    queryFn: () => base44.entities.Sermon.list('-sermon_date'),
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: () => base44.entities.Notification.list('-created_date'),
  });

  const { data: subscribers = [] } = useQuery({
    queryKey: ['admin-subscribers'],
    queryFn: () => base44.entities.Subscriber.list('-created_date'),
  });

  const { data: gallery = [] } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: () => base44.entities.Gallery.list('-event_date'),
  });

  // Mutations
  const createAnnouncement = useMutation({
    mutationFn: data => base44.entities.Announcement.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-announcements']); toast.success("Annonce créée"); setIsDialogOpen(false); }
  });
  const updateAnnouncement = useMutation({
    mutationFn: ({id, data}) => base44.entities.Announcement.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-announcements']); toast.success("Annonce mise à jour"); setIsDialogOpen(false); setEditingItem(null); }
  });
  const deleteAnnouncement = useMutation({
    mutationFn: id => base44.entities.Announcement.delete(id),
    onSuccess: () => { queryClient.invalidateQueries(['admin-announcements']); toast.success("Annonce supprimée"); }
  });

  const createEvent = useMutation({
    mutationFn: data => base44.entities.Event.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-events']); toast.success("Événement créé"); setIsDialogOpen(false); }
  });
  const updateEvent = useMutation({
    mutationFn: ({id, data}) => base44.entities.Event.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-events']); toast.success("Événement mis à jour"); setIsDialogOpen(false); setEditingItem(null); }
  });
  const deleteEvent = useMutation({
    mutationFn: id => base44.entities.Event.delete(id),
    onSuccess: () => { queryClient.invalidateQueries(['admin-events']); toast.success("Événement supprimé"); }
  });

  const createSermon = useMutation({
    mutationFn: data => base44.entities.Sermon.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-sermons']); toast.success("Message créé"); setIsDialogOpen(false); }
  });
  const updateSermon = useMutation({
    mutationFn: ({id, data}) => base44.entities.Sermon.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-sermons']); toast.success("Message mis à jour"); setIsDialogOpen(false); setEditingItem(null); }
  });
  const deleteSermon = useMutation({
    mutationFn: id => base44.entities.Sermon.delete(id),
    onSuccess: () => { queryClient.invalidateQueries(['admin-sermons']); toast.success("Message supprimé"); }
  });

  const createGallery = useMutation({
    mutationFn: data => base44.entities.Gallery.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-gallery']); toast.success("Média ajouté"); setIsDialogOpen(false); }
  });
  const updateGallery = useMutation({
    mutationFn: ({id, data}) => base44.entities.Gallery.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-gallery']); toast.success("Média mis à jour"); setIsDialogOpen(false); setEditingItem(null); }
  });
  const deleteGallery = useMutation({
    mutationFn: id => base44.entities.Gallery.delete(id),
    onSuccess: () => { queryClient.invalidateQueries(['admin-gallery']); toast.success("Média supprimé"); }
  });

  const createNotification = useMutation({
    mutationFn: data => base44.entities.Notification.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-notifications']); toast.success("Notification créée"); setIsDialogOpen(false); }
  });
  const updateNotification = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Notification.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['admin-notifications']); toast.success("Notification mise à jour"); setIsDialogOpen(false); setEditingItem(null); }
  });
  const deleteNotification = useMutation({
    mutationFn: id => base44.entities.Notification.delete(id),
    onSuccess: () => { queryClient.invalidateQueries(['admin-notifications']); toast.success("Notification supprimée"); }
  });

  // Stats helpers
  const totalSubscribers = subscribers.length;
  const activeUsers = subscribers.filter(user => user.is_active).length;
  const whatsappUsers = subscribers.filter(user => !!user.whatsapp).length;
  const getCreatedDate = (item) => item.created_date ? new Date(item.created_date) : new Date();
  const last7Days = Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(new Date(), 6 - index);
    const key = format(date, 'yyyy-MM-dd');
    const count = subscribers.filter(user => format(getCreatedDate(user), 'yyyy-MM-dd') === key).length;
    return { date, key, count };
  });
  const newThisWeek = last7Days.reduce((sum, day) => sum + day.count, 0);
  const activeRate = totalSubscribers ? Math.round((activeUsers / totalSubscribers) * 100) : 0;
  const whatsappRate = totalSubscribers ? Math.round((whatsappUsers / totalSubscribers) * 100) : 0;
  const contactChannels = [
    { label: "WhatsApp", value: whatsappUsers, icon: Phone, color: "from-emerald-500 to-emerald-700" },
    { label: "Email uniquement", value: Math.max(totalSubscribers - whatsappUsers, 0), icon: Mail, color: "from-blue-500 to-blue-700" },
  ];

  const typeConfig = {
    general: { label: "Général", color: "bg-blue-100 text-blue-800" },
    urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
    event: { label: "Événement", color: "bg-green-100 text-green-800" },
    prayer: { label: "Prière", color: "bg-purple-100 text-purple-800" }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Administration</h1>
          <p className="text-slate-600">Gérez le contenu de l'église Vase d'Honneur</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Annonces", value: announcements.length, icon: Megaphone, color: "bg-blue-600" },
            { label: "Événements", value: events.length, icon: CalendarCheck, color: "bg-green-600" },
            { label: "Messages", value: sermons.length, icon: MessageSquare, color: "bg-purple-600" },
            { label: "Galerie", value: gallery.length, icon: Images, color: "bg-pink-600" },
            { label: "Inscrits", value: subscribers.length, icon: UserRound, color: "bg-amber-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Subscriber analytics */}
        <div className="bg-white rounded-3xl shadow-sm p-6 border border-white/50 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Total inscrits",
                value: totalSubscribers,
                change: `+${newThisWeek} cette semaine`,
                icon: UserRound,
                color: "from-blue-600 to-indigo-700",
              },
              {
                title: "Utilisateurs actifs",
                value: activeUsers,
                change: `${activeRate}% actifs`,
                icon: Activity,
                color: "from-emerald-500 to-teal-600",
              },
              {
                title: "Contacts WhatsApp",
                value: whatsappUsers,
                change: `${whatsappRate}% des inscrits`,
                icon: Bell,
                color: "from-amber-500 to-orange-600",
              },
            ].map((card, index) => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 text-white`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-wide text-slate-500">{card.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{isNaN(card.value) ? "0" : card.value}</p>
                <p className="text-sm text-slate-500">{card.change}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Évolution des inscriptions</h3>
                <span className="text-xs text-slate-500">7 derniers jours</span>
              </div>
              <div className="flex items-end gap-4 h-48">
                {last7Days.map((day) => {
                  const max = Math.max(...last7Days.map((d) => d.count), 1);
                  const height = max ? (day.count / max) * 100 : 0;
                  return (
                    <div key={day.key} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-blue-100 rounded-2xl h-40 flex items-end overflow-hidden">
                        <div className="w-full bg-blue-600 rounded-2xl" style={{ height: `${height}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{format(day.date, 'EEE', { locale: fr })}</span>
                      <span className="text-xs text-blue-600 font-semibold">{day.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Canaux de contact</h3>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              {contactChannels.map((channel) => {
                const percentage = totalSubscribers ? Math.round((channel.value / totalSubscribers) * 100) : 0;
                return (
                  <div key={channel.label}>
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                      <div className="flex items-center gap-2">
                        <channel.icon className="w-4 h-4" />
                        {channel.label}
                      </div>
                      <span>{channel.value} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full bg-gradient-to-r ${channel.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700 border border-blue-100">
                Conseil : utilisez WhatsApp pour les rappels rapides et l'email pour les communications détaillées.
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-slate-800 mb-4">Liste des inscrits</h3>
            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="px-4 py-3 text-left">Nom complet</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">WhatsApp</th>
                    <th className="px-4 py-3 text-left">Statut</th>
                    <th className="px-4 py-3 text-left">Inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-400">Aucun inscrit pour le moment</td>
                    </tr>
                  )}
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="text-slate-700">
                      <td className="px-4 py-3 font-medium">{subscriber.full_name || '—'}</td>
                      <td className="px-4 py-3">{subscriber.email || '—'}</td>
                      <td className="px-4 py-3">{subscriber.whatsapp || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          subscriber.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {subscriber.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {format(getCreatedDate(subscriber), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white mb-6 flex flex-wrap gap-2">
            <TabsTrigger value="announcements">Annonces</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="sermons">Messages</TabsTrigger>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="subscribers">Inscrits</TabsTrigger>
            <TabsTrigger value="notifications">
              <BellRing className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-slate-800">Annonces</h2>
                <Dialog open={isDialogOpen && activeTab === "announcements" && !editingItem} onOpenChange={v => { setIsDialogOpen(v); if(!v) setEditingItem(null); }}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-900 hover:bg-blue-800"><Plus className="w-4 h-4 mr-2" />Nouvelle annonce</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Nouvelle annonce</DialogTitle></DialogHeader>
                    <AnnouncementForm onSave={createAnnouncement.mutate} onCancel={() => setIsDialogOpen(false)} isLoading={createAnnouncement.isPending} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="divide-y">
                {announcements.map(item => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-800">{item.title}</h3>
                        <Badge className={typeConfig[item.type]?.color}>{typeConfig[item.type]?.label}</Badge>
                        {!item.is_published && <Badge variant="outline" className="text-slate-500"><EyeOff className="w-3 h-3 mr-1" />Non publié</Badge>}
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1">{item.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={editingItem?.id === item.id && activeTab === "announcements"} onOpenChange={v => { if(!v) setEditingItem(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}><Pencil className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader><DialogTitle>Modifier l'annonce</DialogTitle></DialogHeader>
                          <AnnouncementForm announcement={editingItem} onSave={data => updateAnnouncement.mutate({id: item.id, data})} onCancel={() => setEditingItem(null)} isLoading={updateAnnouncement.isPending} />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Supprimer cette annonce ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => deleteAnnouncement.mutate(item.id)} className="bg-red-500 hover:bg-red-600">Supprimer</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && <div className="p-8 text-center text-slate-500">Aucune annonce</div>}
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-slate-800">Événements</h2>
                <Dialog open={isDialogOpen && activeTab === "events" && !editingItem} onOpenChange={v => { setIsDialogOpen(v); if(!v) setEditingItem(null); }}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-900 hover:bg-blue-800"><Plus className="w-4 h-4 mr-2" />Nouvel événement</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Nouvel événement</DialogTitle></DialogHeader>
                    <EventForm onSave={createEvent.mutate} onCancel={() => setIsDialogOpen(false)} isLoading={createEvent.isPending} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {events.map(item => (
                  <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <Calendar className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-800">{item.title}</h3>
                          {item.is_featured && <Badge className="bg-amber-100 text-amber-800">À la une</Badge>}
                        </div>
                        <p className="text-sm text-slate-500">
                          {item.event_date && format(parseISO(item.event_date), "d MMM yyyy", { locale: fr })}
                          {item.start_time && ` • ${item.start_time}`}
                        </p>
                        {item.location && <p className="text-xs text-slate-400">{item.location}</p>}
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                    )}
                    <div className="flex items-center justify-end gap-2">
                      <Dialog open={editingItem?.id === item.id && activeTab === "events"} onOpenChange={v => { if(!v) setEditingItem(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}><Pencil className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader><DialogTitle>Modifier l'événement</DialogTitle></DialogHeader>
                          <EventForm event={editingItem} onSave={data => updateEvent.mutate({id: item.id, data})} onCancel={() => setEditingItem(null)} isLoading={updateEvent.isPending} />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Supprimer cet événement ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => deleteEvent.mutate(item.id)} className="bg-red-500 hover:bg-red-600">Supprimer</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                {events.length === 0 && <div className="col-span-full p-8 text-center text-slate-500">Aucun événement</div>}
              </div>
            </div>
          </TabsContent>

          {/* Sermons Tab */}
          <TabsContent value="sermons">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-slate-800">Messages</h2>
                <Dialog open={isDialogOpen && activeTab === "sermons" && !editingItem} onOpenChange={v => { setIsDialogOpen(v); if(!v) setEditingItem(null); }}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-900 hover:bg-blue-800"><Plus className="w-4 h-4 mr-2" />Nouveau message</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Nouveau message</DialogTitle></DialogHeader>
                    <SermonForm onSave={createSermon.mutate} onCancel={() => setIsDialogOpen(false)} isLoading={createSermon.isPending} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="p-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sermons.map(item => (
                    <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          {item.thumbnail_url ? (
                            <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <Book className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{item.title}</h3>
                          <p className="text-sm text-slate-500">
                            {item.preacher} • {item.sermon_date && format(parseISO(item.sermon_date), "d MMMM yyyy", { locale: fr })}
                          </p>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{item.audio_url ? "Audio disponible" : "Audio indisponible"}</span>
                        <span>{item.video_url ? "Vidéo disponible" : "Vidéo indisponible"}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <Dialog open={editingItem?.id === item.id && activeTab === "sermons"} onOpenChange={v => { if(!v) setEditingItem(null); }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}><Pencil className="w-4 h-4" /></Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader><DialogTitle>Modifier le message</DialogTitle></DialogHeader>
                            <SermonForm sermon={editingItem} onSave={data => updateSermon.mutate({id: item.id, data})} onCancel={() => setEditingItem(null)} isLoading={updateSermon.isPending} />
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Supprimer ce message ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => deleteSermon.mutate(item.id)} className="bg-red-500 hover:bg-red-600">Supprimer</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                  {sermons.length === 0 && <div className="col-span-full p-8 text-center text-slate-500">Aucun message</div>}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-slate-800">Galerie multimédia</h2>
                <Dialog open={isDialogOpen && activeTab === "gallery" && !editingItem} onOpenChange={v => { setIsDialogOpen(v); if (!v) setEditingItem(null); }}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-900 hover:bg-blue-800"><Plus className="w-4 h-4 mr-2" />Ajouter un média</Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-4xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Ajouter un média</DialogTitle></DialogHeader>
                    <GalleryForm onSave={createGallery.mutate} onCancel={() => setIsDialogOpen(false)} isLoading={createGallery.isPending} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {gallery.map(item => (
                  <div key={item.id} className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden">
                    {item.media_type === "photo" ? (
                      <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
                        {item.thumbnail_url ? (
                          <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <Video className="w-12 h-12 text-white" />
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Dialog open={editingItem?.id === item.id && activeTab === "gallery"} onOpenChange={v => { if(!v) setEditingItem(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="icon" onClick={() => setEditingItem(item)}><Pencil className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader><DialogTitle>Modifier le média</DialogTitle></DialogHeader>
                          <GalleryForm item={editingItem} onSave={data => updateGallery.mutate({id: item.id, data})} onCancel={() => setEditingItem(null)} isLoading={updateGallery.isPending} />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Supprimer ce média ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => deleteGallery.mutate(item.id)} className="bg-red-500 hover:bg-red-600">Supprimer</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white text-xs font-medium line-clamp-1">{item.title}</p>
                      <p className="text-white/70 text-xs">{item.event_name}</p>
                    </div>
                    {item.is_featured && (
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white text-xs">⭐</Badge>
                    )}
                  </div>
                ))}
              </div>
              {gallery.length === 0 && <div className="p-8 text-center text-slate-500">Aucun média</div>}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-slate-800">Inscrits aux notifications ({subscribers.length})</h2>
              </div>
              <div className="divide-y">
                {subscribers.map(item => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <h3 className="font-medium text-slate-800">{item.full_name}</h3>
                      <p className="text-sm text-slate-500">{item.email}</p>
                      {item.whatsapp && <p className="text-sm text-slate-400">{item.whatsapp}</p>}
                    </div>
                    <Badge className={item.is_active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}>
                      {item.is_active ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                ))}
                {subscribers.length === 0 && <div className="p-8 text-center text-slate-500">Aucun inscrit</div>}
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                    <BellRing className="w-5 h-5 text-blue-600" />
                    Notifications
                  </h2>
                  <p className="text-sm text-slate-500">Envoyez des rappels ciblés aux inscrits.</p>
                </div>
                <Dialog open={isDialogOpen && activeTab === "notifications" && !editingItem} onOpenChange={v => { setIsDialogOpen(v); if(!v) setEditingItem(null); }}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-900 hover:bg-blue-800">
                      <Send className="w-4 h-4 mr-2" />
                      Nouvelle notification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>Nouvelle notification</DialogTitle></DialogHeader>
                    <NotificationForm onSave={createNotification.mutate} onCancel={() => setIsDialogOpen(false)} isLoading={createNotification.isPending} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="divide-y">
                {notifications.map(item => (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-slate-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-800">{item.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 capitalize">{item.channel === "all" ? "Tous" : item.channel}</Badge>
                        {item.is_sent ? (
                          <Badge className="bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Envoyé
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700">
                            <Clock4 className="w-3 h-3 mr-1" />
                            Programmée
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{item.message}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.scheduled_date
                          ? format(parseISO(item.scheduled_date), "d MMM yyyy 'à' HH:mm", { locale: fr })
                          : "Envoi immédiat"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={editingItem?.id === item.id && activeTab === "notifications"} onOpenChange={v => { if(!v) setEditingItem(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}><Pencil className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader><DialogTitle>Modifier la notification</DialogTitle></DialogHeader>
                          <NotificationForm
                            notification={editingItem}
                            onSave={data => updateNotification.mutate({ id: item.id, data })}
                            onCancel={() => setEditingItem(null)}
                            isLoading={updateNotification.isPending}
                          />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer cette notification ?</AlertDialogTitle>
                            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteNotification.mutate(item.id)} className="bg-red-500 hover:bg-red-600">Supprimer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && <div className="p-8 text-center text-slate-500">Aucune notification.</div>}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
