import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Upload, Calculator, FileText, AlertCircle } from 'lucide-react';
import { formatCurrency, calculateEMI, mockSettings } from '@/data/mockData';

const PURPOSES = [
  { value: 'emergency', label: 'Emergency' },
  { value: 'school_fees', label: 'School Fees' },
  { value: 'business', label: 'Business' },
  { value: 'medical', label: 'Medical' },
  { value: 'housing', label: 'Housing' },
  { value: 'other', label: 'Other' },
];

export const LoanApplication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    amount: '',
    purpose: '',
    repayment_months: 6,
    description: '',
    document: null as File | null,
  });

  const amount = Number(form.amount) || 0;
  const emi = amount > 0 ? calculateEMI(amount, mockSettings.loan_interest_rate, form.repayment_months) : 0;
  const totalRepayment = emi * form.repayment_months;
  const totalInterest = totalRepayment - amount;

  const canProceedStep1 = amount >= 10000 && form.purpose && form.repayment_months;
  const canSubmit = canProceedStep1;

  const handleSubmit = () => {
    alert('Loan application submitted successfully! You will be notified once reviewed.');
    navigate('/member/loans');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate('/member')} className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Dashboard
      </button>

      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Apply for a Loan</h1>
        <p className="text-muted-foreground text-sm mt-1">Complete the form below to submit your loan application.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              step > s ? 'bg-success text-success-foreground' : step === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            <span className="text-xs font-medium text-muted-foreground ml-2 hidden sm:inline">
              {s === 1 ? 'Details' : s === 2 ? 'Documents' : 'Review'}
            </span>
            {s < 3 && <div className={`flex-1 h-0.5 mx-2 rounded ${step > s ? 'bg-success' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Loan Details */}
      {step === 1 && (
        <div className="bg-card rounded-xl border border-border p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-foreground">Loan Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Loan Amount (₦)</label>
              <input
                type="number"
                placeholder="e.g. 500000"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {amount > 0 && amount < 10000 && <p className="text-xs text-destructive mt-1">Minimum ₦10,000</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Purpose</label>
              <select
                value={form.purpose}
                onChange={e => setForm({ ...form, purpose: e.target.value })}
                className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
              >
                <option value="">Select purpose...</option>
                {PURPOSES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Repayment Period</label>
            <div className="flex gap-2">
              {[3, 6, 9, 12].map(m => (
                <button
                  key={m}
                  onClick={() => setForm({ ...form, repayment_months: m })}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    form.repayment_months === m ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {m} Mo
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Additional Details (Optional)</label>
            <textarea
              placeholder="Describe why you need this loan..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20"
            />
          </div>

          {/* Repayment Simulator */}
          {amount > 0 && (
            <div className="bg-secondary/50 rounded-xl p-4 border border-border space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-primary" /> Repayment Simulator
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-card p-3 rounded-lg border border-border">
                  <p className="text-[10px] text-muted-foreground">Principal</p>
                  <p className="text-sm font-heading font-bold text-foreground">{formatCurrency(amount)}</p>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <p className="text-[10px] text-muted-foreground">Interest ({mockSettings.loan_interest_rate}% p.a.)</p>
                  <p className="text-sm font-heading font-bold text-warning">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <p className="text-[10px] text-muted-foreground">Total Repayment</p>
                  <p className="text-sm font-heading font-bold text-foreground">{formatCurrency(totalRepayment)}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <p className="text-[10px] text-primary font-medium">Monthly EMI</p>
                  <p className="text-sm font-heading font-bold text-primary">{formatCurrency(emi)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Documents */}
      {step === 2 && (
        <div className="bg-card rounded-xl border border-border p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Upload className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-foreground">Supporting Document</h2>
          </div>
          <p className="text-sm text-muted-foreground">Upload any supporting document (e.g., invoice, admission letter, medical report). This is optional.</p>

          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              {form.document ? form.document.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={e => setForm({ ...form, document: e.target.files?.[0] || null })}
              className="absolute inset-0 opacity-0 cursor-pointer"
              style={{ position: 'relative' }}
            />
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(3)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="bg-card rounded-xl border border-border p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-foreground">Review & Submit</h2>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Loan Amount', value: formatCurrency(amount) },
                { label: 'Purpose', value: PURPOSES.find(p => p.value === form.purpose)?.label || form.purpose },
                { label: 'Repayment Period', value: `${form.repayment_months} Months` },
                { label: 'Interest Rate', value: `${mockSettings.loan_interest_rate}% per annum` },
                { label: 'Monthly EMI', value: formatCurrency(emi) },
                { label: 'Total Repayment', value: formatCurrency(totalRepayment) },
              ].map(item => (
                <div key={item.label} className="p-3 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            {form.description && (
              <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                <p className="text-[10px] text-muted-foreground">Additional Details</p>
                <p className="text-sm text-foreground">{form.description}</p>
              </div>
            )}
            {form.document && (
              <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                <p className="text-[10px] text-muted-foreground">Attached Document</p>
                <p className="text-sm font-medium text-foreground">{form.document.name}</p>
              </div>
            )}
          </div>

          <div className="bg-warning/10 rounded-lg p-3 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-warning leading-relaxed">
              By submitting this application, you agree that monthly EMI of {formatCurrency(emi)} will be deducted from your salary/savings. Approval is subject to cooperative policies and available funds.
            </p>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-all">
              <Check className="w-4 h-4" /> Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
