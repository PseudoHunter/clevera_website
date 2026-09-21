import React, { useState } from 'react';
import { PageRoute, Trainer, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { useContent } from '../context/ContentContext';
import { CleveraLogo } from '../components/CleveraLogo';
import { 
  Award, 
  Users, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Filter,
  Sparkles,
  Camera
} from 'lucide-react';

interface GalleryAboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const GalleryAboutPage: React.FC<GalleryAboutPageProps> = ({ onNavigate }) => {
  const { trainers } = useContent();
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'retreat' | 'classroom' | 'outdoor' | 'retail'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (galleryFilter === 'all') return true;
    return item.category === galleryFilter;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Page Header & Story */}
      <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#3430eb]/20 border border-[#3430eb]/40 text-[#60a5fa] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transforming Malaysian Workplaces Since 2018</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
                About Clevera Academy & Corporate Impact Gallery
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Clevera Academy was founded to dismantle traditional, dry corporate training. We design immersive, high-stakes workplace simulations and behavioral synergy retreats that translate directly to bottom-line retail sales and reduced department conflict.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-xs text-slate-300 space-y-3">
              <div className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Our Institutional Promise
              </div>
              <p>&bull; 100% HRD Corp (HRDF) SBL-Khas grant claimable</p>
              <p>&bull; Certified TTT master trainers with corporate seniority</p>
              <p>&bull; Custom roleplay scenarios tailored to Malaysian market dynamics</p>
              <p>&bull; Zero upfront cash required from registered employers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Photo Gallery Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Malaysian Corporate Workshops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
              Photo Gallery: High-Energy Learning in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              From beach team retreats in Port Dickson to intensive retail floor masterclasses in Kuala Lumpur.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'outdoor', label: 'Outdoor Quests' },
              { id: 'retreat', label: 'Beach Retreats' },
              { id: 'classroom', label: 'Classroom Labs' },
              { id: 'retail', label: 'Retail Sims' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  galleryFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/11] relative overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-between p-3.5">
                  <span className="bg-blue-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase w-max">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-300" />
                      {item.location}
                    </span>
                    <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold">
                      {item.paxCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 group-hover:underline inline-flex items-center gap-1 pt-1">
                  <span>Enlarge Photo Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-slate-900">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-slate-950/70 text-white p-2 rounded-full hover:bg-slate-900"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 uppercase">
                  {selectedImage.categoryLabel} &bull; {selectedImage.paxCount}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedImage.location}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{selectedImage.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedImage.description}
              </p>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onNavigate('contact-booking');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Plan Similar Retreat for Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Certified Trainer Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Expert Corporate Faculty
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">
            Meet Our HRDC Certified Master Trainers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Every trainer holds accredited Train-The-Trainer (TTT) credentials with distinguished industry reputations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/4] relative overflow-hidden bg-slate-100">
                  <img
                    src={trainer.photoUrl}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    HRDC: {trainer.hrdcTttNo}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{trainer.name}</h3>
                    <p className="text-xs font-semibold text-blue-700 leading-tight mt-0.5">
                      {trainer.title}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {trainer.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((spec, sIdx) => (
                        <span key={sIdx} className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onNavigate('contact-booking')}
                  className="w-full py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Request Profile for e-TRiS
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom Corporate Contact Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Want to visit our training academy or discuss in-house delivery?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Located at Menara Bangsar KL Eco City, Kuala Lumpur. Free parking and coffee available for HR leaders.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact-booking')}
            className="px-6 py-3 bg-white text-blue-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Schedule Consultation
          </button>
        </div>
      </section>

    </div>
  );
};
