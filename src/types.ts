export interface FinancialData {
  monthlySalary: number;
  currency: 'SGD' | 'MYR';
  savingsRate: number;
  epfRate: number; // For MY
  cpfRate: number; // For SG
  investments: Investment[];
  expenses: { [category: string]: number };
}

export interface Investment {
  name: string;
  amount: number;
  growthRate: number;
}

export interface HealthData {
  weight: number;
  height: number;
  dailySteps: number;
  caloriesConsumed: number;
  waterIntake: number;
  mood: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface BankRate {
  bank: string;
  country: 'SG' | 'MY';
  savingsRate: number;
  fixedDepositRate: number;
  updatedAt: string;
}
