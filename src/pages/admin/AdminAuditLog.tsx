import { useState } from 'react';
import { Search, Filter, Clock, ShieldAlert, AlertCircle, Info } from 'lucide-react';

const AUDIT_DATA = [
  { id: 1, time: "Apr 7, 2026 09:14", user: "Mrs. Adaeze (Admin)", action: "Approved loan LN-0049", ip: "41.58.12.33", level: "info" },
  { id: 2, time: "Apr 6, 2026 16:02", user: "Mrs. Adaeze (Admin)", action: "Rejected loan LN-0048 — Reason: Exceeds credit limit", ip: "41.58.12.33", level: "warning" },
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
    switch (level) {
      case 'danger': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'danger': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div><h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Log</h1><p className="text-slate-500 mt-1">Review system activities and admin actions.</p></div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72"><Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search actions or users..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <button className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm shrink-0"><Filter className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAudit.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap"><div className="flex items-center text-sm font-medium text-slate-600"><Clock className="w-4 h-4 mr-2 text-slate-400" />{log.time}</div></td>
                  <td className="px-6 py-5 whitespace-nowrap"><span className="text-sm font-bold text-slate-800">{log.user}</span></td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${getLevelBadgeClass(log.level).split(' ')[0]}`}>{getLevelIcon(log.level)}</div>
                      <span className="text-sm text-slate-700 font-medium">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap"><span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">{log.ip}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAudit.length === 0 && <div className="text-center py-12 text-slate-500">No audit logs found.</div>}
      </div>
    </div>
  );
};
