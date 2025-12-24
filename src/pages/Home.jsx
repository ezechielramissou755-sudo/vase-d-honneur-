import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import SubscribeSection from "@/components/home/SubscribeSection";
import MinistriesSection from "@/components/home/MinistriesSection";
import LocationSection from "@/components/home/LocationSection";
import DonationSection from "@/components/home/DonationSection";
import FooterSection from "@/components/home/FooterSection";

export default function Home() {
  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => base44.entities.Announcement.filter({ is_published: true }, '-publish_date', 6),
  });

  const { data: ministries = [] } = useQuery({
    queryKey: ['ministries'],
    queryFn: () => base44.entities.Ministry.list(),
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <AnnouncementsSection announcements={announcements} />
      <MinistriesSection ministries={ministries} />
      <SubscribeSection />
      <DonationSection />
      <LocationSection />
      <FooterSection />
    </div>
  );
}
