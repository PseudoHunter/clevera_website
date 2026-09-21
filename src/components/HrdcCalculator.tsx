import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  Users, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Info,
  TrendingUp
} from 'lucide-react';
import { PageRoute } from '../types';
import { useContent } from '../context/ContentContext';
import { trackAnalyticsEvent } from '../services/analyticsService';

interface HrdcCalculatorProps {
  onNavigate: (route: PageRoute) => void;
}

export const HrdcCalculator: React.FC<HrdcCalculatorProps> = ({ onNavigate }) => {
  const { calculatorConfig } = useContent();

  const [employeeCount, setEmployeeCount] = useState<number>(calculatorConfig.defaultEmployeeCount || 45);
  const [avgSalary, setAvgSalary] = useState<number>(calculatorConfig.defaultAvgSalary || 3800);
  const [trainingDays, setTrainingDays] = useState<number>(calculatorConfig.defaultTrainingDays || 2);
  const [paxToTrain, setPaxToTrain] = useState<number>(calculatorConfig.defaultPaxToTrain || 25);
  const [trainingType, setTrainingType] = useState<'in-house' | 'retreat'>('in-house');

  // Math logic under configured Malaysian HRD Corp rules:
  // Employers contribute levyRatePercent% of total monthly basic wages
  const monthlyLevy = employeeCount * avgSalary * (calculatorConfig.levyRatePercent / 100);
  const annualLevy = monthlyLevy * 12;

  // HRDC Allowable Claim Caps:
  // In-House: Up to configured inHouseDailyFeeCap / group / day + inHouseMealAllowancePerPax meal allowance/pax/day
  // External / Retreat: Up to configured retreatDailyCourseFeeCapPerPax / pax / day, capped at retreatMaxTotalCap
  const allowableFee = trainingType === 'in-house' 
    ? (calculatorConfig.inHouseDailyFeeCap * trainingDays)
    : Math.min(calculatorConfig.retreatDailyCourseFeeCapPerPax * paxToTrain * trainingDays, calculatorConfig.retreatMaxTotalCap);

  const allowableMealAllowance = trainingType === 'in-house' 
    ? paxToTrain * calculatorConfig.inHouseMealAllowancePerPax * trainingDays 
    : 0;
  const totalGrantClaimable = allowableFee + allowableMealAllowance;

  // Projected workforce productivity dividend from config
  const multiplier = calculatorConfig.productivityMultiplierPercent / 100;
  const projectedProductivityVal = Math.round(paxToTrain * avgSalary * multiplier * calculatorConfig.productivityMultiplierMonths);

  return (
    <div id="hrdc-grant-calculator" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-black text-white p-6 sm:p-8 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#3430eb]/20 border border-[#3430eb]/40 text-[#60a5fa] text-[11px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>{calculatorConfig.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display tracking-tight">
              {calculatorConfig.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {calculatorConfig.subtitle}
            </p>
          </div>

          <div className="shrink-0 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center sm:text-right">
            <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
              Employer Upfront Cash
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">
              {calculatorConfig.upfrontCashDisplay}
            </span>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
              {calculatorConfig.sblKhasGuaranteeText}
            </span>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Format Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Training Delivery Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTrainingType('in-house')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  trainingType === 'in-house'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">In-House / Office</span>
                  <Building2 className={`w-4 h-4 ${trainingType === 'in-house' ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  At your premises or rented seminar hall. Claim up to RM6k/day group rate.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTrainingType('retreat')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  trainingType === 'retreat'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">External Retreat / Hotel</span>
                  <Users className={`w-4 h-4 ${trainingType === 'retreat' ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Resort or hotel immersion. Claim up to RM1,300/pax/day.
                </p>
              </button>
            </div>
          </div>

          {/* Slider 1: Employee Count */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Malaysian Headcount
              </label>
              <span className="text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                {employeeCount} Pax
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>10 (HRDC Minimum threshold)</span>
              <span>250</span>
              <span>500+ employees</span>
            </div>
          </div>

          {/* Slider 2: Average Salary */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                Average Monthly Salary (MYR)
              </label>
              <span className="text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                RM {(avgSalary || 0).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="10000"
              step="200"
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>RM 2,000 (Min. wage baseline)</span>
              <span>RM 5,500</span>
              <span>RM 10,000</span>
            </div>
          </div>

          {/* Row: Duration & Participants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Training Duration
              </label>
              <select
                value={trainingDays}
                onChange={(e) => setTrainingDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={1}>1 Full Day (7-8 Hours)</option>
                <option value={2}>2 Days (14-16 Hours) - Recommended</option>
                <option value={3}>3 Days Comprehensive Retreat</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Target Participants
              </label>
              <input
                type="number"
                min="5"
                max={employeeCount}
                value={paxToTrain}
                onChange={(e) => setPaxToTrain(Math.min(Number(e.target.value), employeeCount))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Right Output Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
              Estimated Annual HRD Corp Accrual
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              RM {(annualLevy || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Based on 1% statutory levy (~RM {(monthlyLevy || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}/month).
            </p>
          </div>

          {/* Breakdown Cards */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
              <span className="text-slate-300">Allowable Course Fee Grant:</span>
              <strong className="text-white text-sm">
                RM {(allowableFee || 0).toLocaleString()}
              </strong>
            </div>

            {allowableMealAllowance > 0 && (
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-300">Allowable Meal Subsidy:</span>
                <strong className="text-emerald-400 text-sm">
                  + RM {(allowableMealAllowance || 0).toLocaleString()}
                </strong>
              </div>
            )}

            <div className="flex justify-between items-center py-2 bg-blue-950/60 px-3 rounded-lg border border-blue-800/40">
              <span className="text-blue-200 font-bold">Total Claimable Value:</span>
              <strong className="text-emerald-300 text-base font-black">
                RM {(totalGrantClaimable || 0).toLocaleString()}
              </strong>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400">Employer Cash Outlay:</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded">
                RM 0.00 (Zero Cost)
              </span>
            </div>
          </div>

          {/* Projected ROI Metric */}
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Projected 6-Month Productivity Dividend</span>
            </div>
            <p className="text-sm font-black text-white">
              ~ RM {(projectedProductivityVal || 0).toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Estimated organizational gain from reduced friction, improved retail upselling, and automated workflows.
            </p>
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => {
              trackAnalyticsEvent({
                type: 'calculator_session',
                path: '/',
                title: 'HRDC SBL-Khas Grant Calculator Session',
                metadata: {
                  employeeCount,
                  avgSalary,
                  paxToTrain,
                  trainingType,
                  totalGrantClaimable,
                },
              });
              onNavigate('contact-booking');
            }}
            className="w-full flex items-center justify-center gap-2 btn-cobalt py-4 px-4 text-xs font-extrabold tracking-wider shadow-lg cursor-pointer"
          >
            <span>Lock In SBL-Khas Grant Allocation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Clevera Academy prepares all e-TRiS paperwork on your behalf</span>
          </p>

        </div>

      </div>
    </div>
  );
};
