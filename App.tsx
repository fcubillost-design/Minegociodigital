import React, { useState, useEffect, useCallback } from 'react';
import { View, UserProgress, AchievementType } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BusinessCanvas from './components/BusinessCanvas';
import BreakEvenCalculator from './components/BreakEvenCalculator';
import CostCalculator from './components/CostCalculator';
import Onboarding from './components/Onboarding';
import AIAssistant from './components/AIAssistant';
import TrainingModule from './components/TrainingModule';
import ContributionMarginCalculator from './components/ContributionMarginCalculator';
import MonthlyReport from './components/MonthlyReport';
import Inventory from './components/Inventory';
import SmartGoals from './components/SmartGoals';
import { useLocalStorage } from './hooks/useLocalStorage';
import { StarIcon } from './components/ui/Icons';


const App: React.FC = () => {
  const [view, setView] = useState<View>(View.Dashboard);
  const [progress, setProgress] = useLocalStorage<UserProgress>('userProgress', {
    level: 'Principiante',
    points: 0,
    achievements: [],
  });
  const [showOnboarding, setShowOnboarding] = useLocalStorage('showOnboarding', true);
  const [isAIAssistantOpen, setAIAssistantOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const completeModule = useCallback((points: number, achievement: AchievementType) => {
    setProgress(prev => {
      if (prev.achievements.includes(achievement)) {
        showToast("Ya has completado este módulo.");
        return prev;
      }

      const newPoints = prev.points + points;
      const newAchievements = [...prev.achievements, achievement];
      let newLevel = prev.level;

      if (newPoints >= 100 && prev.level === 'Intermedio') {
        newLevel = 'Avanzado';
      } else if (newPoints >= 50 && prev.level === 'Principiante') {
        newLevel = 'Intermedio';
      }

      showToast(`¡Felicidades! Ganaste ${points} puntos y la medalla "${achievement}"`);
      
      return {
        points: newPoints,
        achievements: newAchievements,
        level: newLevel,
      };
    });
    setView(View.Dashboard);
  }, [setProgress]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-dark">
      {showOnboarding && <Onboarding onClose={() => setShowOnboarding(false)} />}
      
      <Header />
      
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {view === View.Dashboard && <Dashboard progress={progress} setView={setView} />}
        {view === View.BusinessCanvas && <BusinessCanvas onComplete={() => completeModule(30, AchievementType.BusinessArchitect)} setView={setView} />}
        {view === View.BreakEvenCalculator && <BreakEvenCalculator onComplete={() => completeModule(20, AchievementType.FinancialGuru)} setView={setView} />}
        {view === View.CostCalculator && <CostCalculator onComplete={() => completeModule(25, AchievementType.CostConqueror)} setView={setView} />}
        {view === View.ContributionMargin && <ContributionMarginCalculator onComplete={() => completeModule(20, AchievementType.MarginMaster)} setView={setView} />}
        {view === View.TrainingModule && <TrainingModule onComplete={() => completeModule(50, AchievementType.ManualCompleto)} setView={setView} />}
        {view === View.MonthlyReport && <MonthlyReport onComplete={() => completeModule(15, AchievementType.ReportingChampion)} setView={setView} />}
        {view === View.Inventory && <Inventory onComplete={() => completeModule(20, AchievementType.StockMaster)} setView={setView} />}
        {view === View.SmartGoals && <SmartGoals onComplete={() => completeModule(20, AchievementType.GoalSetter)} setView={setView} />}
      </main>

      <button
        onClick={() => setAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-110"
        aria-label="Abrir Asistente IA"
      >
        <StarIcon className="w-6 h-6" />
      </button>

      {isAIAssistantOpen && <AIAssistant onClose={() => setAIAssistantOpen(false)} />}

      {toastMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl animate-fade-in-out z-50">
          {toastMessage}
        </div>
      )}
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;