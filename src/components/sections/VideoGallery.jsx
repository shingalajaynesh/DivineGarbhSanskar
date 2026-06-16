import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { videoTestimonials } from '../../data/testimonials';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const VideoGallery = () => {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10" id="video-gallery">
      <MandalaBg className="top-10 right-10 w-80 h-80 opacity-[0.03] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "वीडियो अनुभव", en: "Video Stories", gu: "વિડિયો અનુભવ" })}
          titleHi={t({ hi: "माताओं के वीडियो अनुभव", en: "Mothers' Video Experiences", gu: "માતાઓનો વિડિયો અનુભવ" })}
        />

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {videoTestimonials.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video.videoId)}
              className="group relative cursor-pointer overflow-hidden rounded-divine-sm border-2 border-divineGold/30 shadow-md hover:shadow-xl hover:border-divineGold transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full">
                <img
                  src={video.thumbnail}
                  alt={t(video.title)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay backdrop */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Central Play Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-vermillion text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Title Description */}
              <div className="p-4 bg-white text-center">
                <h4 className="font-sans font-bold text-sm text-sacredMaroon leading-snug group-hover:text-vermillion transition-colors">
                  {t(video.title)}
                </h4>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-divineGold/40">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
