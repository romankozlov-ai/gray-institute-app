'use client';

import { TestResult, PatientInfo } from '@/hooks/useStorage';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Trash2, FileText, Calendar, User, CheckCircle } from 'lucide-react';
import PDFExport from './PDFExport';

interface ResultsProps {
  results: TestResult[];
  patientInfo: PatientInfo;
  onBack: () => void;
  onClear: () => void;
}

const scaleLabels: Record<number, { en: string; uk: string; color: string }> = {
  0: { en: 'No contraction', uk: 'Відсутність скорочення', color: 'bg-red-500' },
  1: { en: 'Trace/Flicker', uk: 'Слід/мерехтіння', color: 'bg-orange-500' },
  2: { en: 'Gravity eliminated', uk: 'Без сили тяжіння', color: 'bg-yellow-500' },
  3: { en: 'Against gravity', uk: 'Проти сили тяжіння', color: 'bg-blue-500' },
  4: { en: 'Against resistance', uk: 'Проти опору', color: 'bg-indigo-500' },
  5: { en: 'Normal strength', uk: 'Нормальна сила', color: 'bg-green-500' }
};

export default function Results({ results, patientInfo, onBack, onClear }: ResultsProps) {
  const t = useTranslations('results');
  const locale = useLocale();

  // Group results by muscle group
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.groupId]) {
      acc[result.groupId] = {
        nameEn: result.groupNameEn,
        nameUk: result.groupNameUk,
        tests: []
      };
    }
    acc[result.groupId].tests.push(result);
    return acc;
  }, {} as Record<string, { nameEn: string; nameUk: string; tests: TestResult[] }>);

  const getGroupName = (group: { nameEn: string; nameUk: string }) => {
    return locale === 'uk' ? group.nameUk : group.nameEn;
  };

  const getTestName = (test: TestResult) => {
    return locale === 'uk' ? test.testNameUk : test.testNameEn;
  };

  const getScaleLabel = (score: number) => {
    return locale === 'uk' ? scaleLabels[score].uk : scaleLabels[score].en;
  };

  const averageScore = results.length > 0 
    ? (results.reduce((acc, r) => acc + r.score, 0) / results.length).toFixed(1)
    : '0';

  const getScoreDistribution = () => {
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    results.forEach(r => distribution[r.score as keyof typeof distribution]++);
    return distribution;
  };

  const distribution = getScoreDistribution();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('backToTesting')}
          </button>
          
          <div className="flex gap-2">
            <PDFExport patientName={patientInfo.name} results={results} lang={locale as 'en' | 'uk'} />
            
            <button
              onClick={() => {
                if (confirm(t('confirmClear'))) {
                  onClear();
                  onBack();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {t('clearAll')}
            </button>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{t('testReport')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">{t('patient')}</p>
              <p className="font-semibold">{patientInfo.name || '-'}</p>
            </div>
          </div>
          
          {patientInfo.age && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">{t('age')}</p>
                <p className="font-semibold">{patientInfo.age} {t('years')}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">{t('testDate')}</p>
              <p className="font-semibold">{patientInfo.testDate || '-'}</p>
            </div>
          </div>
        </div>
        
        {patientInfo.notes && (
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-500 mb-1">{t('generalNotes')}:</p>
            <p className="text-gray-700">{patientInfo.notes}</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">{t('totalTests')}</p>
          <p className="text-2xl font-bold text-gray-900">{results.length}</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">{t('averageScore')}</p>
          <p className="text-2xl font-bold text-blue-600">{averageScore}/5</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">{t('completedGroups')}</p>
          <p className="text-2xl font-bold text-green-600">{Object.keys(groupedResults).length}</p>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">{t('scoreDistribution')}</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1, 0].map((score) => {
            const count = distribution[score as keyof typeof distribution];
            const percentage = results.length > 0 ? (count / results.length) * 100 : 0;
            return (
              <div key={score} className="flex items-center gap-3">
                <span className="w-8 font-bold text-gray-700">{score}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${scaleLabels[score].color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-12 text-right text-sm text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">{t('detailedResults')}</h3>
        
        {Object.entries(groupedResults).map(([groupId, group]) => (
          <div key={groupId} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">{getGroupName(group)}</h4>
            </div>
            
            <div className="divide-y divide-gray-100">
              {group.tests.map((test) => (
                <div key={test.testId} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{getTestName(test)}</p>
                      {test.notes && (
                        <p className="text-sm text-gray-500 mt-1">{test.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${scaleLabels[test.score].color}`}>
                        {test.score}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1">{getScaleLabel(test.score)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
