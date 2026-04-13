import { Clock, LogOut } from 'lucide-react';
import rucsLogo from '@/assets/rucs-logo.png';

export const PendingApproval = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <img src={rucsLogo} alt="RUCS" className="w-16 h-16 object-contain" />
        </div>
        <div className="bg-card rounded-xl border border-border p-8 space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-warning" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">Account Pending Approval</h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Your cooperative account has been created successfully. An administrator will review and approve your membership shortly.
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 text-left space-y-2">
            <p className="text-xs font-medium text-muted-foreground">What happens next?</p>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />An admin will verify your @run.edu.ng email</li>
              <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />Your role will be assigned (member by default)</li>
              <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />You'll receive an email when approved</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Back to Login
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Need help? Contact the cooperative office.</p>
      </div>
    </div>
  );
};
