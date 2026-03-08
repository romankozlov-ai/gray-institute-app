'use client';

import { MuscleTest as MuscleTestType } from '@/data/muscles';
import { Language } from './MuscleTest';
import { useState } from 'react';

type MediaViewerProps = {
  test: MuscleTestType;
  lang: Language;
};

export default function MediaViewer({ test, lang }: MediaViewerProps) {
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
  
  const t = {
    en: { photo: 'Photo', video: 'Video', noMedia: 'No media available' },
    uk: { photo: 'Фото', video: 'Відео', noMedia: 'Медіа недоступне' }
  };

  const hasPhoto = !!test.photoUrl;
  const hasVideo = !!test.videoUrl;

  if (!hasPhoto && !hasVideo) {
    return (
      <div className="text-xs text-gray-400">
        {t[lang].noMedia}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-1 mb-2">
        {hasPhoto && (
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-2 py-1 text-xs rounded ${
              activeTab === 'photo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t[lang].photo}
          </button>
        )}
        {hasVideo && (
          <button
            onClick={() => setActiveTab('video')}
            className={`px-2 py-1 text-xs rounded ${
              activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t[lang].video}
          </button>
        )}
      </div>
      
      <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {activeTab === 'photo' && test.photoUrl ? (
          <img 
            src={test.photoUrl} 
            alt={lang === 'uk' ? test.nameUk : test.nameEn}
            className="w-full h-full object-cover"
          />
        ) : activeTab === 'video' && test.videoUrl ? (
          <iframe
            src={test.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="text-gray-400 text-xs text-center p-2">
            {t[lang].noMedia}
          </div>
        )}
      </div>
    </div>
  );
}