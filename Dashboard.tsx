import React from 'react';
import { UserProgress, View, AchievementType } from '../types';
import Card from './ui/Card';
import { StarIcon, PuzzlePieceIcon, ChartBarIcon, BookOpenIcon, CalculatorIcon, PercentageIcon, DocumentTextIcon, ArchiveBoxIcon, ClipboardDocumentCheckIcon } from './ui/Icons';

interface DashboardProps {
  progress: UserProgress;
  setView: (view: View) => void;
}

const levelConfig = {
    Principiante: { maxPoints: 50, color: 'bg-blue-500' },
    Intermedio: { maxPoints: 100, color: 'bg-yellow-500' },
    Avanzado: { maxPoints: 205, color: 'bg-green-500' },
}

const achievementConfig: Record<string, { icon: React.ReactNode; description: string; view: View }> = {
    [AchievementType.BusinessArchitect]: {
      icon: <PuzzlePieceIcon className="w-12 h-12 text-primary" />,
      description: "Define la estructura de tu negocio.",
      view: View.BusinessCanvas
    },
    [AchievementType.CostConqueror]: {
      icon: <CalculatorIcon className="w-12 h-12 text-primary" />,
      description: "Identifica y suma tus costos fijos y variables.",
      view: View.CostCalculator
    },
    [AchievementType.MarginMaster]: {
      icon: <PercentageIcon className="w-12 h-12 text-primary" />,
      description: "Calcula la ganancia real de cada venta.",
      view: View.ContributionMargin
    },
    [AchievementType.FinancialGuru]: {
      icon: <ChartBarIcon className="w-12 h-12 text-primary" />,
      description: "Calcula la viabilidad de tu negocio.",
      view: View.BreakEvenCalculator
    },
    [AchievementType.StockMaster]: {
      icon: <ArchiveBoxIcon className="w-12 h-12 text-primary" />,
      description: "Gestiona tus productos y controla el stock.",
      view: View.Inventory
    },
    [AchievementType.GoalSetter]: {
      icon: <ClipboardDocumentCheckIcon className="w-12 h-12 text-primary" />,
      description: "Define y sigue tus metas con la metodología SMART.",
      view: View.SmartGoals
    },
    [AchievementType.ReportingChampion]: {
        icon: <DocumentTextIcon className="w-12 h-12 text-primary" />,
        description: "Registra tus resultados y mide tu progreso mensual.",
        view: View.MonthlyReport
    },
    [AchievementType.ManualCompleto]: {
      icon: <BookOpenIcon className="w-12 h-12 text-primary" />,
      description: "Aprende conceptos con el manual interactivo.",
      view: View.TrainingModule
    },
    [AchievementType.MarketingMaestro]: {
      icon: <StarIcon className="w-12 h-12 text-gray-400" />,
      description: "Crea tu plan para llegar a clientes. (Próximamente)",
      view: View.MarketingPlan
    }
}

const Dashboard: React.FC<DashboardProps> = ({ progress, setView }) => {
  const { level, points, achievements } = progress;
  const config = levelConfig[level];
  const progressPercentage = Math.min((points / config.maxPoints) * 100, 100);

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-2xl font-bold mb-2">¡Bienvenido, Emprendedor!</h2>
        <p className="text-gray-600">Este es tu centro de mando. Completa los módulos para ganar puntos y subir de nivel.</p>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg">{level}</span>
            <span className="text-gray-500">{points} / {config.maxPoints} Puntos</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className={`${config.color} h-4 rounded-full transition-all duration-500`} style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-2xl font-bold mb-4">Módulos de Aprendizaje</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(achievementConfig).map(([key, value]) => {
            const achievementKey = key as AchievementType;
            const isCompleted = achievements.includes(achievementKey);
            const isLocked = achievementKey === AchievementType.MarketingMaestro; 
            
            const handleClick = () => {
              if (!isLocked) {
                setView(value.view)
              }
            }

            return (
              <div 
                key={achievementKey} 
                onClick={handleClick}
                className={`p-6 bg-white rounded-lg shadow-md border-2 transition-all duration-300 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-transparent'} ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  {value.icon}
                  {isCompleted && <span className="text-sm font-bold text-green-600 bg-green-200 px-3 py-1 rounded-full">COMPLETADO</span>}
                </div>
                <h4 className="text-xl font-bold mt-4">{achievementKey}</h4>
                <p className="text-gray-600 mt-2">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;