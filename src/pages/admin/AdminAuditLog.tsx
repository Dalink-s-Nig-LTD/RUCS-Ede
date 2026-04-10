import { useState } from 'react';
import { Search, Filter, Clock, ShieldAlert, AlertCircle, Info } from 'lucide-react';

const AUDIT_DATA = [
  { id: 1, time: "Apr 7, 2026 09:14", user: "Mrs. Adaeze (Admin)", action: "Approved loan LN-0049", ip: "41.58.12.33", level: "info" },
  { id: 2, time: "Apr 6, 2026 16:02", user: "Mrs. Adaeze (Admin)", action: "Rejected loan LN-0048 — Exceeds credit limit", ip: "41.58.12.33", level: "warning" },
  { id: 3, time: "Apr 5, 2026 11:30", user: "Emmanuel (Super Admin)", action: "Placed account RU/2020/0078 on Hold", ip: "105.22.44.11", level: "danger" },
  { id: 4, time: "Apr 4, 2026 14:55", user: "Mrs. Adaeze (Admin)", action: "Added product: Binatone Standing Fan", ip: "41.58.12.33", level: "info" },
  { id: 5, time: "Apr 3, 2026 09:00", user: "c.adeyemi@run.edu.ng (Member)", action: "Login from new device", ip: "197.210.55.99", level: "info" },
  { id: 6, time: "Apr 2, 2026 10:20", user: "Mrs. Adaeze (Admin)", action: "Updated stock for HP Laptop: 8 → 5", ip: "41.58.12.33", level: "info" },
  { id: 7, time: "Apr 1, 2026 16:48", user: "Emmanuel (Super Admin)", action: "Changed loan interest rate: 4% → 5%", ip: "105.22.44.11", level: "warning" },
];

export const AdminAuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAudit = AUDIT_DATA.filter(log => log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase()));

  const getLevelIcon = (level: string) => {
    if (level === 'danger') return <ShieldAlert className="w-4 h-4 text-destructive" />;
    if (level === 'warning') return <AlertCircle className="w-4 h-4 text-warning" />;
    return <Info className="w-4 h-4 text-primary" />;
  };

  const getLevelBg = (level: string) => {
    if (level === 'danger') return 'bg-destructive/10';
    if (level === 'warning') return 'bg-warning/10';
    return 'bg-primary/10';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Audit Log</h1>
          <p className="text-muted-foreground text-sm mt-1">Review system activities and admin actions.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search actions or users..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="w-9 h-9 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {filteredAudit.map(log => (
          <div key={log.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start gap-3 mb-2">
              <div className={`p-1.5 rounded-md shrink-0 ${getLevelBg(log.level)}`}>{getLevelIcon(log.level)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{log.action}</p>
                <p className="text-xs font-semibold text-foreground/80 mt-1">{log.user}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />{log.time}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{log.ip}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="bg-card rounded-xl border border-border overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Timestamp</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Action</th>
                <th className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAudit.map(log => (
                <tr key={log.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center text-xs font-medium text-muted-foreground"><Clock className="w-3.5 h-3.5 mr-1.5 text-muted-foreground/60" />{log.time}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-foreground">{log.user}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1 rounded-md ${getLevelBg(log.level)}`}>{getLevelIcon(log.level)}</div>
                      <span className="text-sm text-foreground font-medium">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap"><span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{log.ip}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAudit.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground">No audit logs found.</div>}
      </div>

      {filteredAudit.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground md:hidden">No audit logs found.</div>}
    </div>
  );
};
