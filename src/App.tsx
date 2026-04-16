import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { Layout } from "./layouts/Layout";
import { MemberDashboard } from "./pages/member/MemberDashboard";
import { Shop } from "./pages/member/Shop";
import { ProductDetail } from "./pages/member/ProductDetail";
import { MyLoans } from "./pages/member/MyLoans";
import { LoanDetail } from "./pages/member/LoanDetail";
import { LoanApplication } from "./pages/member/LoanApplication";
import { OfficerDashboard } from "./pages/officer/OfficerDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminLoans } from "./pages/admin/AdminLoans";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminMembers } from "./pages/admin/AdminMembers";
import { AdminAuditLog } from "./pages/admin/AdminAuditLog";
import { PendingApproval } from "./pages/PendingApproval";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="/member" element={<Layout role="member" />}>
            <Route index element={<MemberDashboard />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:id" element={<ProductDetail />} />
            <Route path="apply-loan" element={<LoanApplication />} />
            <Route path="loans" element={<MyLoans />} />
            <Route path="loans/:id" element={<LoanDetail />} />
          </Route>
          <Route path="/officer" element={<Layout role="officer" />}>
            <Route index element={<OfficerDashboard />} />
          </Route>
          <Route path="/admin" element={<Layout role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="loans" element={<AdminLoans />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="audit" element={<AdminAuditLog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
