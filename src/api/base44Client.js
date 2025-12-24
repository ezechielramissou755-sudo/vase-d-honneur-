// Mock API client - In-memory storage
const storage = {
  announcements: [
    { id: 1, title: "Service de Noël", content: "Rejoignez-nous pour notre service spécial de Noël", publish_date: "2024-12-25", type: "event", is_published: true },
    { id: 2, title: "Groupe de prière", content: "Nouveau groupe de prière chaque mercredi soir", publish_date: "2024-12-20", type: "prayer", is_published: true },
    { id: 3, title: "Collecte alimentaire", content: "Aidez-nous à collecter des denrées pour les familles dans le besoin", publish_date: "2024-12-18", type: "general", is_published: true },
  ],
  ministries: [
    { id: 1, name: "Ministère de louange", description: "Conduire l'église dans l'adoration et la présence de Dieu", icon: "Music" },
    { id: 2, name: "Ministère de prière", description: "Intercéder pour l'église, les membres et les nations", icon: "HandHeart" },
    { id: 3, name: "Ministère jeunesse", description: "Former et équiper la jeune génération pour Christ", icon: "Users" },
    { id: 4, name: "Ministère des enfants", description: "Enseigner les enfants dans les voies du Seigneur", icon: "Baby" },
    { id: 5, name: "Ministère social", description: "Servir la communauté et aider les personnes dans le besoin", icon: "Heart" },
  ],
  subscribers: [],
  events: [
    {
      id: 1,
      title: "EBIMPÉ 25-26 | TRAVERSÉE DES ÉGLISES VASES D'HONNEUR",
      description: "Grand rassemblement des Églises Vases d'Honneur avec l'apôtre Mohammed Sanogo. Venez partager l'amour de Christ pour une nouvelle année bénie.",
      event_date: "2025-12-31",
      start_time: "21:00",
      end_time: "02:00",
      location: "Stade Olympique d'Ébimpé",
      image_url: "/ebimper.jpg",
      is_featured: true
    }
  ],
  sermons: [
    {
      id: 1,
      title: "La puissance de la prière",
      description: "Découvrez comment la prière peut transformer votre vie et vous rapprocher de Dieu. Un enseignement profond sur l'intimité avec le Père.",
      preacher: "Apôtre Mohammed Sanogo",
      sermon_date: "2025-12-15",
      scripture_reference: "Matthieu 6:9-13",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail_url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80"
    },
    {
      id: 2,
      title: "Marcher dans la foi",
      description: "La foi est le fondement de notre relation avec Dieu. Apprenez à développer une foi inébranlable.",
      preacher: "Pasteur Jean-Marc",
      sermon_date: "2025-12-08",
      scripture_reference: "Hébreux 11:1-6",
      audio_url: "/audio/sermon2.mp3",
      thumbnail_url: "https://images.unsplash.com/photo-1519491050282-cf00c82424bd?w=400&q=80"
    },
    {
      id: 3,
      title: "L'amour inconditionnel de Dieu",
      description: "Dieu nous aime d'un amour éternel. Venez découvrir la profondeur de Son amour pour vous.",
      preacher: "Apôtre Mohammed Sanogo",
      sermon_date: "2025-12-01",
      scripture_reference: "Jean 3:16",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail_url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&q=80"
    }
  ],
  gallery: [
    {
      id: 1,
      title: "Traversée Ebimpé 25-26",
      description: "Grand rassemblement des Églises Vases d'Honneur",
      media_type: "photo",
      media_url: "/ebimper.jpg",
      thumbnail_url: "/ebimper.jpg",
      event_name: "Ebimpé 25-26",
      event_date: "2025-12-31",
      is_featured: true
    },
    {
      id: 2,
      title: "Culte de louange",
      description: "Moments de louange et d'adoration",
      media_type: "photo",
      media_url: "/louange.jpg",
      thumbnail_url: "/louange.jpg",
      event_name: "Culte dominical",
      event_date: "2025-12-15",
      is_featured: true
    },
    {
      id: 3,
      title: "Culte spécial",
      description: "Moments forts de notre culte spécial avec la jeunesse",
      media_type: "photo",
      media_url: "/culte1.jpg",
      thumbnail_url: "/culte1.jpg",
      event_name: "Culte spécial jeunesse",
      event_date: "2025-12-20",
      is_featured: true
    }
  ],
  notifications: [
    {
      id: 1,
      title: "Rappel de culte",
      message: "Rejoignez-nous ce dimanche à 9h pour célébrer ensemble.",
      channel: "all",
      scheduled_date: "2025-12-20",
      is_sent: false,
      created_date: "2025-12-18T10:00:00Z"
    },
    {
      id: 2,
      title: "Intercession spéciale",
      message: "Veillée de prière vendredi soir - activez vos équipes.",
      channel: "whatsapp",
      scheduled_date: "2025-12-22",
      is_sent: true,
      created_date: "2025-12-17T15:30:00Z"
    }
  ],
};

const createEntity = (storageKey) => ({
  list: async () => storage[storageKey],
  filter: async () => storage[storageKey],
  create: async (data) => {
    const item = { id: Date.now(), ...data, created_date: new Date().toISOString() };
    storage[storageKey].push(item);
    return item;
  },
  update: async (id, data) => {
    const index = storage[storageKey].findIndex(item => item.id === id);
    if (index !== -1) {
      storage[storageKey][index] = { ...storage[storageKey][index], ...data };
      return storage[storageKey][index];
    }
    return null;
  },
  delete: async (id) => {
    const index = storage[storageKey].findIndex(item => item.id === id);
    if (index !== -1) {
      storage[storageKey].splice(index, 1);
    }
    return true;
  },
});

export const base44 = {
  entities: {
    Announcement: createEntity('announcements'),
    Ministry: createEntity('ministries'),
    Subscriber: createEntity('subscribers'),
    Event: createEntity('events'),
    Sermon: createEntity('sermons'),
    Gallery: createEntity('gallery'),
    Notification: createEntity('notifications'),
  },
};
