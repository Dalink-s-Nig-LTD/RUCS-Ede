import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, Users, TrendingUp, UserCog } from 'lucide-react';
import rucsLogo from '@/assets/rucs-logo.png';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex font-body">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] bg-ocean-deep text-white flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-ocean-mid/30 to-ocean-accent/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <img src={rucsLogo} alt="RUNSMSL Logo" className="w-12 h-12 object-contain drop-shadow-lg" />
            <span className="font-heading font-bold text-xl tracking-tight">RUNSMSL</span>
          </div>
          <p className="text-sm text-white/50 font-medium">Run Staff Cooperative Multipurpose Society Limited</p>
        </div>

        <div className="relative z-10 space-y-8">
          <h1 className="font-heading text-3xl xl:text-4xl font-bold leading-tight">
            Your cooperative,<br />digitally empowered.
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Save, borrow, and manage your cooperative membership — all in one place.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-4">
            {[
              { icon: Users, label: '1,200+ active members' },
              { icon: TrendingUp, label: '₦450M+ total savings' },
              { icon: ShieldCheck, label: 'Bank-grade security' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-white/70">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/30">© 2026 Run Staff Cooperative Multipurpose Society Limited</p>
      </div>

      {/* Right panel — login */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <img src={rucsLogo} alt="RUNSMSL Logo" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-lg text-foreground">RUNSMSL Platform</span>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1 text-sm">Sign in with your institutional Google account.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/member')}
              className="w-full flex justify-center items-center py-3.5 px-4 bg-card border border-border rounded-lg shadow-sm text-sm font-semibold text-foreground hover:bg-secondary transition-all duration-200"
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              Sign in as Member
            </button>

            <button
              onClick={() => navigate('/officer')}
              className="w-full flex justify-center items-center py-3.5 px-4 bg-card border border-border rounded-lg shadow-sm text-sm font-semibold text-foreground hover:bg-secondary transition-all duration-200"
            >
              <UserCog className="w-5 h-5 mr-2 text-ocean-accent" />
              Sign in as Loan Officer
            </button>

            <button
              onClick={() => navigate('/admin')}
              className="w-full flex justify-center items-center py-3.5 px-4 bg-primary text-primary-foreground rounded-lg shadow-sm text-sm font-semibold hover:opacity-90 transition-all duration-200"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign in as Admin
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-background text-muted-foreground text-xs">Secured by Google OAuth 2.0</span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Only @run.edu.ng email addresses are permitted.
          </p>
        </div>
      </div>
    </div>
  );
};
