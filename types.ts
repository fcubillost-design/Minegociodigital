export enum View {
  Dashboard = 'dashboard',
  BusinessCanvas = 'businessCanvas',
  BreakEvenCalculator = 'breakEvenCalculator',
  CostCalculator = 'costCalculator',
  MarketingPlan = 'marketingPlan',
  TrainingModule = 'trainingModule',
  ContributionMargin = 'contributionMargin',
  MonthlyReport = 'monthlyReport',
  Inventory = 'inventory',
  SmartGoals = 'smartGoals',
}

export enum AchievementType {
  BusinessArchitect = 'Arquitecto de Negocios',
  FinancialGuru = 'Gurú Financiero',
  CostConqueror = 'Conquistador de Costos',
  MarginMaster = 'Maestro del Margen',
  MarketingMaestro = 'Maestro del Marketing',
  ManualCompleto = 'Manual Completado',
  ReportingChampion = 'Campeón del Reporte',
  StockMaster = 'Maestro del Inventario',
  GoalSetter = 'Maestro de Metas',
}

export interface UserProgress {
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  points: number;
  achievements: AchievementType[];
}

export interface BusinessCanvasData {
    keyPartners: string;
    keyActivities: string;
    valueProposition: string;
    customerRelationships: string;
    customerSegments: string;
    keyResources: string;
    channels: string;
    costStructure: string;
    revenueStreams: string;
}

export interface CostItem {
    id: string;
    name: string;
    amount: number;
}

export interface MonthlyReportData {
    month: string;
    totalSales: number;
    totalExpenses: number;
    newCustomers: number;
    achievements: string;
    challenges: string;
    goalsForNextMonth: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    threshold: number;
}

export interface SmartGoal {
  id: string;
  objective: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  status: 'Pendiente' | 'En Progreso' | 'Cumplido';
}