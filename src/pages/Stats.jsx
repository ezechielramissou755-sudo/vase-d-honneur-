import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Users, Activity, TrendingUp, Bell, Mail, Phone } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import FooterSection from '@/components/home/FooterSection';

const getCreatedDate = (item) => {
  if (item.created_date) return new Date(item.created_date);
  if (item.subscribe_date) return new Date(item.subscribe_date);
  return new Date();
};

export default function Stats() {
  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ['stats-subscribers'],
    queryFn: () => base44.entities.Subscriber.list('-created_date'),
  });

  const totalSubscribers = subscribers.length;
  const activeUsers = subscribers.filter((user) => user.is_active).length;
  const whatsappUsers = subscribers.filter((user) => !!user.whatsapp).length;

  const last7Days = Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(new Date(), 6 - index);
    const key = format(date, 'yyyy-MM-dd');
    const count = subscribers.filter((user) => format(getCreatedDate(user), 'yyyy-MM-dd') === key).length;
    return { date, key, count };
  });

  const newThisWeek = last7Days.reduce((sum, day) => sum + day.count, 0);
  const activeRate = totalSubscribers ? Math.round((activeUsers / totalSubscribers) * 100) : 0;
  const whatsappRate = totalSubscribers ? Math.round((whatsappUsers / totalSubscribers) * 100) : 0;

  const contactChannels = [
    { label: 'WhatsApp', value: whatsappUsers, icon: Phone, color: 'from-emerald-500 to-emerald-700' },
    { label: 'Email uniquement', value: Math.max(totalSubscribers - whatsappUsers, 0), icon: Mail, color: 'from-blue-500 to-blue-700' },
  ];

  return (
    <div className="pt-28 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-10">
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-blue-400 font-medium"
          >
            Tableau de bord
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-blue-900"
          >
            Statistiques & Engagement
          </motion.h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Visualisez les inscriptions, l’activité de la communauté et préparez vos prochaines notifications en un coup d’œil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Total inscrits',
              value: totalSubscribers,
              change: `+${newThisWeek} cette semaine`,
              icon: Users,
              color: 'from-blue-500 to-indigo-600',
            },
            {
              title: 'Utilisateurs actifs',
              value: activeUsers,
              change: `${activeRate}% actifs`,
              icon: Activity,
              color: 'from-emerald-500 to-teal-600',
            },
            {
              title: 'Contacts WhatsApp',
              value: whatsappUsers,
              change: `${whatsappRate}% des inscrits`,
              icon: Bell,
              color: 'from-amber-500 to-orange-600',
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-white/60"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 text-white`}>
                <card.icon className="w-6 h-6" />
              </div>
              <p className="text-sm uppercase tracking-wide text-slate-500">{card.title}</p>
              <p className="text-4xl font-bold text-slate-900 mt-2">{isLoading ? '...' : card.value}</p>
              <p className="text-sm text-slate-500 mt-1">{card.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-white/60">
            <div className="flex items-center justify-between mb  -6">
              <h2 className="text-lg font-semibold text-slate-800">Évolution des inscriptions</h2>
              <span className="text-sm text-slate-500">7 derniers jours</span>
            </div>
            <div className="flex items-end gap-4 h-52 mt-8">
              {last7Days.map((day) => (
                <div key={day.key} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500/80 rounded-2xl flex items-end justify-center overflow-hidden">
                    <div
                      className="w-full bg-blue-600 rounded-2xl transition-all"
                      style={{
                        height: `${totalSubscribers ? Math.min((day.count / Math.max(...last7Days.map((d) => d.count), 1)) * 100, 100) : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{format(day.date, 'EEE', { locale: fr })}</span>
                  <span className="text-xs text-blue-600 font-semibold">{day.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-white/60 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Canaux de contact</h2>
              <TrendingUp className="text-emerald-500" />
            </div>
            <div className="space-y-4">
              {contactChannels.map((channel) => {
                const percentage = totalSubscribers ? Math.round((channel.value / totalSubscribers) * 100) : 0;
                return (
                  <div key={channel.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <channel.icon className="w-4 h-4" />
                        {channel.label}
                      </div>
                      <span className="text-sm text-slate-500">{channel.value} ({percentage}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${channel.color} rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-sm text-blue-700">
                Astuce : utilisez les contacts WhatsApp pour les rappels rapides et l’email pour les communications détaillées.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-white/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Liste des inscrits</h2>
              <p className="text-sm text-slate-500">Toutes les personnes abonnées aux notifications</p>
            </div>
            <div className="text-sm text-slate-500">
              {format(new Date(), 'd MMMM yyyy', { locale: fr })}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500 uppercase text-xs tracking-wide">
                  <th className="pb-3">Nom complet</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">WhatsApp</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3">Inscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      Aucun inscrit pour le moment.
                    </td>
                  </tr>
                )}
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="text-slate-700">
                    <td className="py-3 font-medium">{subscriber.full_name || '—'}</td>
                    <td className="py-3">{subscriber.email || '—'}</td>
                    <td className="py-3">{subscriber.whatsapp || '—'}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          subscriber.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {subscriber.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">
                      {format(getCreatedDate(subscriber), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
