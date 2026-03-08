'use client';

import { useState, useEffect, useCallback } from 'react';

export interface TestResult {
  testId: string;
  groupId: string;
  testNameEn: string;
  testNameUk: string;
  groupNameEn: string;
  groupNameUk: string;
  score: number;
  notes?: string;
  timestamp: number;
}

export interface PatientInfo {
  name: string;
  age?: number;
  testDate?: string;
  notes?: string;
}

const STORAGE_KEY = 'gray-institute-results';
const PATIENT_KEY = 'gray-institute-patient';

export function useStorage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ 
    name: '',
    testDate: new Date().toISOString().split('T')[0]
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedResults = localStorage.getItem(STORAGE_KEY);
        const savedPatient = localStorage.getItem(PATIENT_KEY);
        
        if (savedResults) {
          setResults(JSON.parse(savedResults));
        }
        
        if (savedPatient) {
          setPatientInfo(JSON.parse(savedPatient));
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save results to localStorage
  const saveResult = useCallback((result: TestResult) => {
    setResults(prev => {
      // Remove existing result for this test if present
      const filtered = prev.filter(r => r.testId !== result.testId);
      const newResults = [...filtered, result];
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
      }
      
      return newResults;
    });
  }, []);

  // Save patient info
  const savePatientInfo = useCallback((info: PatientInfo) => {
    setPatientInfo(info);
    if (typeof window !== 'undefined') {
      localStorage.setItem(PATIENT_KEY, JSON.stringify(info));
    }
  }, []);

  // Clear all results
  const clearResults = useCallback(() => {
    setResults([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Get progress stats
  const getProgress = useCallback(() => {
    const totalTests = 24; // Approximate total from muscle groups
    return {
      completed: results.length,
      total: totalTests,
      percentage: Math.round((results.length / totalTests) * 100)
    };
  }, [results]);

  // Get results by group
  const getResultsByGroup = useCallback((groupId: string) => {
    return results.filter(r => r.groupId === groupId);
  }, [results]);

  // Get result for specific test
  const getTestResult = useCallback((testId: string) => {
    return results.find(r => r.testId === testId);
  }, [results]);

  return {
    results,
    patientInfo,
    isLoaded,
    saveResult,
    savePatientInfo,
    clearResults,
    getProgress,
    getResultsByGroup,
    getTestResult
  };
}
