import MuscleTest from '@/components/MuscleTest';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('header');
  
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-blue-100 mt-1">{t('subtitle')}</p>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <MuscleTest />
      </div>
    </main>
  );
}
