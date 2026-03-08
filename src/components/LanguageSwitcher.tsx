'use client';

import { Language } from './MuscleTest';

type LanguageSwitcherProps = {
  currentLang: Language;
  onChange: (lang: Language) => void;
};

export default function LanguageSwitcher({ currentLang, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onChange('en')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentLang === 'en'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🇺🇸 EN
        </button>
        <button
          onClick={() => onChange('uk')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentLang === 'uk'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🇺🇦 UK
        </button>
      </div>
    </div>
  );
}