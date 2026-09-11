import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell, HeartPulse, UserCheck, PhoneCall, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HeroCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      image: '/assets/poshan_hero.jpg',
      badge: 'ICDS • Anganwadi Services',
      titleKey: 'heroSlide1Title',
      subKey: 'heroSlide1Sub',
      tagColor: 'from-amber-500 to-orange-600',
    },
    {
      image: '/assets/nutrition_meals.jpg',
      badge: 'POSHAN Abhiyaan • PM Mission',
      titleKey: 'heroSlide2Title',
      subKey: 'heroSlide2Sub',
      tagColor: 'from-emerald-500 to-teal-600',
    },
    {
      image: '/assets/child_education.jpg',
      badge: 'Child Protection & Education',
      titleKey: 'heroSlide3Title',
      subKey: 'heroSlide3Sub',
      tagColor: 'from-blue-600 to-indigo-600',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="space-y-4">
      {/* Live Announcement Marquee Ticker */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border border-amber-500/30 rounded-2xl px-4 py-2.5 flex items-center gap-3 overflow-hidden shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black px-3 py-1 rounded-lg shrink-0 uppercase tracking-wider animate-pulse">
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span>Update</span>
        </div>
        <div className="relative overflow-hidden w-full text-xs font-semibold text-slate-200 whitespace-nowrap">
          <div className="inline-block animate-marquee">
            {t('tickerText')}
          </div>
        </div>
      </div>

      {/* Hero Photo Carousel Card */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 group">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={t(slide.titleKey as any)}
              className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Dark & Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30" />

            {/* Slide Content Box */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 max-w-4xl space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-white bg-gradient-to-r ${slide.tagColor} shadow-md uppercase tracking-wider flex items-center gap-1.5`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20 backdrop-blur-md">
                  Govt of India Initiative
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                {t(slide.titleKey as any)}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl line-clamp-2 drop-shadow">
                {t(slide.subKey as any)}
              </p>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md transition opacity-80 hover:opacity-100 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md transition opacity-80 hover:opacity-100 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-7 bg-amber-400' : 'w-2.5 bg-slate-500 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Core Poshan Abhiyaan Pillar Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
        <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition group flex items-start gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition">
              {t('pillar1Title')}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium line-clamp-1">
              {t('pillar1Desc')}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl transition group flex items-start gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition">
              {t('pillar2Title')}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium line-clamp-1">
              {t('pillar2Desc')}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 p-4 rounded-2xl transition group flex items-start gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition">
              {t('pillar3Title')}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium line-clamp-1">
              {t('pillar3Desc')}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 p-4 rounded-2xl transition group flex items-start gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-rose-400 transition">
              {t('pillar4Title')}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium line-clamp-1">
              {t('pillar4Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
