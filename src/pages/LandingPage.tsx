import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Users, Shield, TrendingUp, Wallet, GraduationCap, Home, Briefcase, Heart,
  ArrowRight, CheckCircle, Phone, Mail, MessageCircle, ChevronRight, Star,
  Target, Eye, BookOpen, Calendar, Image as ImageIcon, HandCoins, PiggyBank,
  BadgeCheck, Clock, Building2, Scale
} from "lucide-react";

const stats = [
  { value: "2,500+", label: "Active Members", icon: Users },
  { value: "15+", label: "Years in Operation", icon: Clock },
  { value: "₦3.2B+", label: "Total Savings Managed", icon: PiggyBank },
  { value: "₦1.8B+", label: "Loans Disbursed", icon: HandCoins },
];

const benefits = [
  { title: "Competitive Savings Returns", description: "Earn up to 5% annual interest on your savings — higher than most commercial banks.", icon: TrendingUp },
  { title: "Affordable Loan Access", description: "Access loans at 12% annual rate, far below market rates, with flexible repayment.", icon: Wallet },
  { title: "Financial Discipline", description: "Mandatory monthly contributions help you build a strong savings habit.", icon: Target },
  { title: "Welfare & Support", description: "Emergency grants, bereavement support, and member welfare programs.", icon: Heart },
  { title: "Transparency", description: "Open books, regular AGMs, and elected governance you can trust.", icon: Shield },
  { title: "Community", description: "Join a network of Redeemer's University staff committed to mutual financial growth.", icon: Users },
];

const loanTypes = [
  { title: "Emergency Loan", description: "Quick disbursement for urgent needs. Up to 2× savings balance.", icon: Heart, rate: "12%", tenure: "3–6 months" },
  { title: "Education Loan", description: "Fund tuition, training, or professional development for you or dependents.", icon: GraduationCap, rate: "12%", tenure: "6–12 months" },
  { title: "Business Loan", description: "Start or grow a side business with affordable capital.", icon: Briefcase, rate: "12%", tenure: "6–12 months" },
  { title: "Housing & Asset Loan", description: "Acquire household items, electronics, or contribute towards housing.", icon: Home, rate: "12%", tenure: "12 months" },
];

const howItWorksSteps = [
  { step: "01", title: "Join & Contribute", description: "Register as a member and start making monthly contributions (min. ₦50,000).", icon: Users },
  { step: "02", title: "Save & Earn", description: "Your savings earn 5% annual interest, credited quarterly to your account.", icon: PiggyBank },
  { step: "03", title: "Borrow Affordably", description: "After 3 months, access loans up to 3× your savings at just 12% per annum.", icon: HandCoins },
  { step: "04", title: "Repay & Grow", description: "Repay via convenient monthly deductions. Your limit grows as you save more.", icon: TrendingUp },
];

const executives = [
  { name: "Prof. Akinwale Thompson", role: "President", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Mrs. Folake Adeyemi", role: "Treasurer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Dr. Uche Nwosu", role: "Secretary", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Mr. Emmanuel Eze", role: "Loan Officer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" },
];

const testimonials = [
  { name: "Dr. Sarah Bamidele", role: "Lecturer, Dept. of Sciences", quote: "RUCS helped me fund my PhD research when I needed it most. The process was seamless and the interest rate unbeatable." },
  { name: "Mr. Chidi Okafor", role: "IT Department", quote: "I've been saving with RUCS for 3 years. The discipline it instills and the returns I earn are worth every naira." },
  { name: "Mrs. Grace Obi", role: "Admin Officer", quote: "When my family faced an emergency, RUCS disbursed my loan within 48 hours. This cooperative truly cares." },
];

const news = [
  { date: "April 2026", title: "2025 Dividends Declared!", description: "Members to receive 8.5% dividend on savings. Payments commence May 15th." },
  { date: "March 2026", title: "Annual General Meeting", description: "AGM scheduled for March 28th at the University Auditorium. All members invited." },
  { date: "February 2026", title: "New Housing Loan Scheme", description: "Introducing a new housing support loan with up to ₦5M limit for qualifying members." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
];

const faqs = [
  { q: "Who can join RUCS?", a: "All confirmed staff of Redeemer's University (academic and non-academic) with a valid @run.edu.ng email are eligible to join." },
  { q: "What is the minimum monthly contribution?", a: "The minimum mandatory contribution is ₦50,000 per month, deducted directly from your salary. You can also make voluntary top-ups." },
  { q: "How much can I borrow?", a: "You can borrow up to 3× your total savings balance. For example, if you have ₦500,000 saved, you can access up to ₦1,500,000." },
  { q: "How long does loan approval take?", a: "Most loans are reviewed within 24–48 hours. Emergency loans may be fast-tracked for same-day approval." },
  { q: "Can I withdraw my savings at any time?", a: "Mandatory savings can be withdrawn upon exit from the cooperative. Voluntary savings can be withdrawn with 30 days notice." },
  { q: "What happens if I miss a loan repayment?", a: "A gentle reminder is sent after 3 days. After 7 days, a penalty of 1% of the overdue amount applies. We work with members to find solutions." },
];

const joinSteps = [
  { step: "1", title: "Complete Application", description: "Fill out the membership form with your staff ID and department details." },
  { step: "2", title: "Pay Registration Fee", description: "One-time registration fee of ₦10,000 to activate your account." },
  { step: "3", title: "Salary Deduction Setup", description: "Authorize monthly deduction from your salary through the Bursary." },
  { step: "4", title: "Start Saving & Earning", description: "Your account is active! Begin saving and access loans after 3 months." },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">RUCS</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#faqs" className="hover:text-foreground transition-colors">FAQs</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gap-1">Join Now <ArrowRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-accent opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(200_55%_39%_/_0.3),_transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 hover:bg-primary/20">
              <BadgeCheck className="h-3.5 w-3.5 mr-1" /> Registered Cooperative Society
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Building Wealth Together at{" "}
              <span className="text-ocean-light">Redeemer's University</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
              Join over 2,500 staff members saving, investing, and accessing affordable loans through our trusted cooperative society — since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-primary-foreground text-ocean-deep hover:bg-primary-foreground/90 font-semibold text-base px-8 gap-2">
                  Join the Cooperative <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  See How It Works
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="bg-card border-border shadow-md">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">About RUCS</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Empowering Redeemer's University Staff Through Collective Savings
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Redeemer's University Cooperative Society (RUCS) was established in 2010 to provide a reliable, transparent, and member-owned financial platform for university staff. We believe that when we save together, we grow together.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Our Mission</h3>
                    <p className="text-sm text-muted-foreground">To promote financial discipline, provide affordable credit, and enhance the economic well-being of every member.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Our Vision</h3>
                    <p className="text-sm text-muted-foreground">To be the foremost staff cooperative in Nigerian universities — trusted, impactful, and member-first.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Our Values</h3>
                    <p className="text-sm text-muted-foreground">Transparency, mutual trust, accountability, and service to members above all.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800"
                alt="Team collaboration at Redeemer's University"
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border border-border hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">15+ Years</p>
                    <p className="text-xs text-muted-foreground">of trusted service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Membership</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">How to Join RUCS</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Getting started is simple. Follow these four steps and begin your journey to financial growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {joinSteps.map((s, i) => (
              <Card key={s.step} className="bg-card border-border relative overflow-hidden group hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="font-heading text-5xl font-bold text-primary/10 absolute top-3 right-4">{s.step}</div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-primary">{s.step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  {i < joinSteps.length - 1 && (
                    <ChevronRight className="absolute top-1/2 -right-3 h-6 w-6 text-border hidden lg:block" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Why Join</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Benefits of Membership</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">RUCS offers more than savings — it's a complete financial support system for university staff.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="bg-card border-border hover:shadow-md transition-shadow group">
                <CardContent className="p-6">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">What Members Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Services */}
      <section id="services" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Financial Services</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Loan Products & Savings Plans</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We offer a range of loan products and savings plans designed for university staff needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {loanTypes.map((l) => (
              <Card key={l.title} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <l.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground mb-1">{l.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{l.description}</p>
                      <div className="flex gap-3">
                        <Badge variant="secondary" className="text-xs">{l.rate} p.a.</Badge>
                        <Badge variant="secondary" className="text-xs">{l.tenure}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Savings Plans */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-ocean-deep to-ocean-mid text-primary-foreground border-0">
              <CardContent className="p-8">
                <PiggyBank className="h-8 w-8 mb-4 opacity-80" />
                <h3 className="font-heading text-xl font-bold mb-2">Mandatory Savings</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">₦50,000 minimum monthly contribution, deducted from salary. Earn 5% annual interest credited quarterly.</p>
                <div className="flex gap-2">
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">5% Interest</Badge>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">Auto-deduct</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/90 to-success border-0">
              <CardContent className="p-8">
                <HandCoins className="h-8 w-8 mb-4 text-success-foreground opacity-80" />
                <h3 className="font-heading text-xl font-bold text-success-foreground mb-2">Voluntary Savings</h3>
                <p className="text-success-foreground/80 text-sm mb-4">Top up anytime with any amount. Withdrawable with 30 days notice. Same 5% annual interest rate.</p>
                <div className="flex gap-2">
                  <Badge className="bg-success-foreground/20 text-success-foreground border-0">Flexible</Badge>
                  <Badge className="bg-success-foreground/20 text-success-foreground border-0">5% Interest</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Process</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A simple cycle: contribute, save, borrow, and grow your wealth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="font-heading text-xs font-bold text-primary uppercase tracking-widest">Step {s.step}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Governance</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Elected by members, committed to transparency and service.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((e) => (
              <Card key={e.name} className="bg-card border-border text-center overflow-hidden group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={e.image}
                    alt={e.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-foreground text-sm">{e.name}</h3>
                    <p className="text-xs text-muted-foreground">{e.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Updates</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">News & Announcements</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n) => (
              <Card key={n.title} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{n.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{n.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Gallery</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Life at RUCS</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Glimpses from our meetings, events, and welfare activities.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group">
                <img
                  src={img}
                  alt={`RUCS event ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ocean-deep/0 group-hover:bg-ocean-deep/30 transition-colors duration-300 flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">FAQs</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-5">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-accent rounded-2xl p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_hsl(200_55%_39%_/_0.4),_transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Building Your Future?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                Join RUCS today and take the first step toward financial security, affordable credit, and a supportive community.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-primary-foreground text-ocean-deep hover:bg-primary-foreground/90 font-semibold text-base px-10 gap-2 mb-8">
                  Register Today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80 text-sm">
                <a href="tel:+2348012345678" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4" /> +234 801 234 5678
                </a>
                <a href="mailto:cooperative@run.edu.ng" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Mail className="h-4 w-4" /> cooperative@run.edu.ng
                </a>
                <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-deep py-12 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-heading font-bold text-primary-foreground">RUCS</span>
              </div>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">
                Redeemer's University Cooperative Society — empowering staff through collective savings since 2010.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-3 text-sm">Quick Links</h4>
              <div className="space-y-2 text-sm text-primary-foreground/60">
                <a href="#about" className="block hover:text-primary-foreground transition-colors">About Us</a>
                <a href="#services" className="block hover:text-primary-foreground transition-colors">Services</a>
                <a href="#faqs" className="block hover:text-primary-foreground transition-colors">FAQs</a>
                <a href="#contact" className="block hover:text-primary-foreground transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-3 text-sm">Services</h4>
              <div className="space-y-2 text-sm text-primary-foreground/60">
                <p>Emergency Loans</p>
                <p>Education Loans</p>
                <p>Business Loans</p>
                <p>Savings Plans</p>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-3 text-sm">Contact</h4>
              <div className="space-y-2 text-sm text-primary-foreground/60">
                <p>Redeemer's University, Ede, Osun State</p>
                <p>cooperative@run.edu.ng</p>
                <p>+234 801 234 5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Redeemer's University Cooperative Society. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
