'use client';

import { MuscleTest } from '@/data/muscles';
import { useState } from 'react';
import { Scale, Camera, Video, ChevronDown, ChevronUp, Info } from 'lucide-react';
import MediaViewer from './MediaViewer';

interface TestCardProps {
  test: MuscleTest;
  testName: string;
  testDescription: string;
  initialScore?: number;
  initialNotes?: string;
  onComplete: (score: number, notes?: string) => void;
}

const scaleDescriptions: Record<number, { en: string; uk: string; color: string }> = {
  0: { 
    en: 'No contraction', 
    uk: 'Відсутність скорочення',
    color: 'bg-red-100 text-red-800 border-red-300'
  },
  1: { 
    en: 'Trace/Flicker', 
    uk: 'Слід/мерехтіння',
    color: 'bg-orange-100 text-orange-800 border-orange-300'
  },
  2: { 
    en: 'Active movement, gravity eliminated', 
    uk: 'Активний рух, без сили тяжіння',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  3: { 
    en: 'Active movement against gravity', 
    uk: 'Активний рух проти сили тяжіння',
    color: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  4: { 
    en: 'Active movement against resistance', 
    uk: 'Активний рух проти опору',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  5: { 
    en: 'Normal strength', 
    uk: 'Нормальна сила',
    color: 'bg-green-100 text-green-800 border-green-300'
  }
};

export default function TestCard({ 
  test, 
  testName, 
  testDescription, 
  initialScore, 
  initialNotes,
  onComplete 
}: TestCardProps) {
  const [selectedScore, setSelectedScore] = useState<number | undefined>(initialScore);
  const [notes, setNotes] = useState(initialNotes || '');
  const [showMedia, setShowMedia] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialScore !== undefined);

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    setIsCompleted(true);
    onComplete(score, notes);
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    if (selectedScore !== undefined) {
      onComplete(selectedScore, newNotes);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
      isCompleted ? 'border-green-500' : 'border-transparent'
    }`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{testName}</h3>
              {isCompleted && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  ✓
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{testDescription}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Info"
            >
              <Info className="w-5 h-5" />
            </button>
            {(test.photoUrl || test.videoUrl) && (
              <button
                onClick={() => setShowMedia(!showMedia)}
                className={`p-2 rounded-lg transition-colors ${
                  showMedia ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title="Media"
              >
                {test.photoUrl && <Camera className="w-5 h-5" />}
                {test.videoUrl && <Video className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Scale Info */}
        {showInfo && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
            <p className="font-medium text-gray-700 mb-2">Medical Research Council (MRC) Scale:</p>
            <div className="space-y-1">
              {Object.entries(scaleDescriptions).map(([score, desc]) => (
                <div key={score} className="flex items-center gap-2">
                  <span className="font-mono font-bold w-6">{score}:</span>
                  <span className="text-gray-600">{desc.en} / {desc.uk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Viewer */}
        {showMedia && (
          <div className="mb-4">
            <MediaViewer photoUrl={test.photoUrl} videoUrl={test.videoUrl} />
          </div>
        )}

        {/* Score Selection */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Select strength level (0-5):</span>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {[0, 1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleScoreSelect(score)}
                className={`py-3 px-2 rounded-lg font-bold text-lg transition-all ${
                  selectedScore === score
                    ? scaleDescriptions[score].color + ' ring-2 ring-offset-2 ring-blue-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          
          {selectedScore !== undefined && (
            <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${scaleDescriptions[selectedScore].color}`}>
              {scaleDescriptions[selectedScore].en} / {scaleDescriptions[selectedScore].uk}
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes / Нотатки:
          </label>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Add any observations... / Додайте спостереження..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}
