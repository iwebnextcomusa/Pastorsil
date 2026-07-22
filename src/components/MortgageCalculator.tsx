import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, Shield, Home } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  initialHoa?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 850000,
  initialHoa = 0,
}) => {
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.8); // Ohio avg property tax ~1.8%
  const [annualInsurance, setAnnualInsurance] = useState(1800);
  const [monthlyHoa, setMonthlyHoa] = useState(initialHoa);

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPaymentAmount;

  // Monthly Interest Rate
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Principal & Interest Monthly Formula
  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0) {
    monthlyPrincipalInterest =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else {
    monthlyPrincipalInterest = loanAmount / totalPayments;
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const totalMonthlyPayment = Math.round(
    monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyHoa
  );

  return (
    <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Calculator className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div>
          <h3 className="text-white font-serif-display text-xl font-bold">Interactive Mortgage Calculator</h3>
          <p className="text-slate-400 text-xs">Estimate monthly payment breakdown for Cincinnati properties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Home Price Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">Home Purchase Price</span>
              <span className="text-amber-400 font-bold text-sm">${homePrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="4000000"
              step="10000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">Down Payment ({downPaymentPercent}%)</span>
              <span className="text-amber-400 font-bold text-sm">${Math.round(downPaymentAmount).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="12"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
              </select>
            </div>
          </div>

          {/* Property Tax & Insurance */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                OH Property Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Annual Home Insurance ($)
              </label>
              <input
                type="number"
                step="100"
                value={annualInsurance}
                onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
              Estimated Monthly Payment
            </span>
            <div className="text-3xl font-bold font-serif-display text-gold-gradient mb-4">
              ${totalMonthlyPayment.toLocaleString()} <span className="text-xs font-sans text-slate-400 font-normal">/ month</span>
            </div>

            {/* Payment Visual Progress Bar */}
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex mb-5">
              <div
                style={{ width: `${(monthlyPrincipalInterest / totalMonthlyPayment) * 100}%` }}
                className="bg-amber-400"
                title="Principal & Interest"
              />
              <div
                style={{ width: `${(monthlyPropertyTax / totalMonthlyPayment) * 100}%` }}
                className="bg-blue-500"
                title="Property Tax"
              />
              <div
                style={{ width: `${(monthlyInsurance / totalMonthlyPayment) * 100}%` }}
                className="bg-emerald-500"
                title="Homeowner Insurance"
              />
              {monthlyHoa > 0 && (
                <div
                  style={{ width: `${(monthlyHoa / totalMonthlyPayment) * 100}%` }}
                  className="bg-purple-500"
                  title="HOA Fee"
                />
              )}
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-slate-300">Principal & Interest</span>
                </div>
                <strong className="text-white">${Math.round(monthlyPrincipalInterest).toLocaleString()}</strong>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-300">Property Taxes (Est.)</span>
                </div>
                <strong className="text-white">${Math.round(monthlyPropertyTax).toLocaleString()}</strong>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">Home Insurance</span>
                </div>
                <strong className="text-white">${Math.round(monthlyInsurance).toLocaleString()}</strong>
              </div>

              {monthlyHoa > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-slate-300">Monthly HOA Fee</span>
                  </div>
                  <strong className="text-white">${monthlyHoa.toLocaleString()}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            * Estimates for illustration only. Rates subject to lender credit approval and current Hamilton County tax assessments. Call Pastor Sil at <strong>(513) 706-6312</strong> for trusted mortgage lender connections.
          </div>
        </div>
      </div>
    </div>
  );
};
