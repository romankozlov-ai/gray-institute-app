'use client';

import { muscleGroups, MuscleGroup, MuscleTest as MuscleTestType } from '@/data/muscles';
import { useTranslations, useLocale } from 'next-intl';
import TestCard from './TestCard';
import Results from './Results';
import PDFExport from './PDFExport';
import { useStorage, TestResult, PatientInfo } from '@/hooks/useStorage';

export type Language = 'en' | 'uk';
export type { TestResult } from '@/hooks/useStorage';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, User, Calendar } from 'lucide-react';

export default function MuscleTest() {
  const t = useTranslations('test');
  const locale = useLocale();
  const { results, patientInfo, saveResult, savePatientInfo, clearResults, getProgress } = useStorage();
  
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(!patientInfo.name);
  const [localPatientInfo, setLocalPatientInfo] = useState<PatientInfo>(patientInfo);

  const currentGroup = muscleGroups[currentGroupIndex];
  const progress = getProgress();
  const totalTests = muscleGroups.reduce((acc, g) => acc + g.tests.length, 0);

  const handleTestComplete = useCallback((testId: string, score: number, notes?: string) => {
    const test = currentGroup.tests.find(t => t.id === testId);
    if (test) {
      saveResult({
        testId,
        groupId: currentGroup.id,
        testNameEn: test.nameEn,
        testNameUk: test.nameUk,
        groupNameEn: currentGroup.nameEn,
        groupNameUk: currentGroup.nameUk,
        score,
        notes,
        timestamp: Date.now()
      });
    }
  }, [currentGroup, saveResult]);

  const handleSavePatientInfo = () => {
    savePatientInfo(localPatientInfo);
    setShowPatientForm(false);
  };

  const getTestResult = (testId: string): TestResult | undefined => {
    return results.find(r => r.testId === testId);
  };

  const getGroupName = (group: MuscleGroup) => {
    return locale === 'uk' ? group.nameUk : group.nameEn;
  };

  const getTestName = (test: MuscleTestType) => {
    return locale === 'uk' ? test.nameUk : test.nameEn;
  };

  const getTestDescription = (test: MuscleTestType) => {
    return locale === 'uk' ? test.descriptionUk : test.descriptionEn;
  };

  if (showResults) {
    return (
      <Results 
        results={results}
        patientInfo={patientInfo}
        onBack={() => setShowResults(false)}
        onClear={clearResults}
      />
    );
  }

  if (showPatientForm) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold">{t('patientInfo')}</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patientName')}
            </label>
            <input
              type="text"
              value={localPatientInfo.name}
              onChange={(e) => setLocalPatientInfo({ ...localPatientInfo, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('enterName')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patientAge')}
            </label>
            <input
              type="number"
              value={localPatientInfo.age || ''}
              onChange={(e) => setLocalPatientInfo({ ...localPatientInfo, age: parseInt(e.target.value) || undefined })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('enterAge')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('testDate')}
            </label>
            <input
              type="date"
              value={localPatientInfo.testDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => setLocalPatientInfo({ ...localPatientInfo, testDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('notes')}
            </label>
            <textarea
              value={localPatientInfo.notes || ''}
              onChange={(e) => setLocalPatientInfo({ ...localPatientInfo, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder={t('enterNotes')}
            />
          </div>
          
          <button
            onClick={handleSavePatientInfo}
            disabled={!localPatientInfo.name}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('startTesting')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Progress */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{getGroupName(currentGroup)}</h2>
              <p className="text-sm text-gray-500">
                {t('groupProgress', { current: currentGroupIndex + 1, total: muscleGroups.length })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">{t('overallProgress')}</p>
              <p className="font-semibold text-blue-600">{progress.completed}/{totalTests}</p>
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(progress.completed / totalTests) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Progress Bar for Groups */}
        <div className="mt-4 flex gap-1">
          {muscleGroups.map((group, idx) => (
            <button
              key={group.id}
              onClick={() => setCurrentGroupIndex(idx)}
              className={`flex-1 h-2 rounded-full transition-all ${
                idx === currentGroupIndex 
                  ? 'bg-blue-600' 
                  : idx < currentGroupIndex 
                    ? 'bg-green-500' 
                    : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title={getGroupName(group)}
            />
          ))}
        </div>
      </div>

      {/* Patient Info Bar */}
      <div className="bg-blue-50 rounded-lg p-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{patientInfo.name}</span>
          </span>
          {patientInfo.age && (
            <span className="text-gray-600">{patientInfo.age} {t('years')}</span>
          )}
          <span className="flex items-center gap-1 text-gray-600">
            <Calendar className="w-4 h-4" />
            {patientInfo.testDate}
          </span>
        </div>
        <button
          onClick={() => setShowPatientForm(true)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {t('edit')}
        </button>
      </div>

      {/* Test Cards */}
      <div className="space-y-4 mb-6">
        {currentGroup.tests.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            testName={getTestName(test)}
            testDescription={getTestDescription(test)}
            initialScore={getTestResult(test.id)?.score}
            initialNotes={getTestResult(test.id)?.notes}
            onComplete={(score, notes) => handleTestComplete(test.id, score, notes)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentGroupIndex(prev => Math.max(0, prev - 1))}
          disabled={currentGroupIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('previous')}
        </button>
        
        <div className="flex gap-2">
          {results.length > 0 && (
            <button
              onClick={() => setShowResults(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {t('viewResults')} ({results.length})
            </button>
          )}
          
          {currentGroupIndex < muscleGroups.length - 1 ? (
            <button
              onClick={() => setCurrentGroupIndex(prev => Math.min(muscleGroups.length - 1, prev + 1))}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('next')}
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {t('finish')}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
