import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, CheckCircle, Phone, Mail, MessageCircle, ChevronRight, Star,
  Target, Eye, Calendar, HandCoins, PiggyBank, BadgeCheck, Scale,
} from "lucide-react";
import { Navbar } from "./landing/Navbar";
import {
  stats, benefits, loanTypes, howItWorksSteps, executives,
  testimonials, news, galleryImages, faqs, joinSteps,
} from "./landing/data";
import rucsLogo from "@/assets/rucs-logo.png";

const Section = ({ id, alt, children }: { id?: string; alt?: boolean; children: React.ReactNode }) => (
  <section id={id} className={`py-12 sm:py-16 lg:py-20 ${alt ? "bg-muted/40" : ""}`}>
    <div className="container mx-auto px-4 lg:px-8">{children}</div>
  </section>
);

const SectionHeader = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
  <div className="text-center mb-10 lg:mb-12">
    <Badge variant="secondary" className="mb-3">{tag}</Badge>
    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">{title}</h2>
    {sub && <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">{sub}</p>}
  </div>
);

// Horizontal scroll wrapper for mobile, grid on larger screens
const HScroll = ({ children, gridClass }: { children: React.ReactNode; gridClass: string }) => (
  <div className={`hidden sm:grid ${gridClass} gap-5`}>{children}</div>
);
const HScrollMobile = ({ children }: { children: React.ReactNode }) => (
  <div className="sm:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide">
    {children}
  </div>
);

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-accent opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(200_55%_39%_/_0.3),_transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-primary/20 text-primary-foreground border-primary/30 hover:bg-primary/20">
              <BadgeCheck className="h-3.5 w-3.5 mr-1" /> Registered Cooperative Society
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-5">
              Building Wealth Together at{" "}
              <span className="text-ocean-light">Redeemer's University</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/80 mb-7 max-w-2xl leading-relaxed">
              Join over 2,500 staff members saving, investing, and accessing affordable loans through our trusted cooperative — since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-ocean-deep hover:bg-primary-foreground/90 font-semibold gap-2">
                  Join the Cooperative <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  See How It Works
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 -mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="bg-card border-border shadow-md">
                <CardContent className="p-4 sm:p-5 flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-lg sm:text-2xl font-bold text-foreground truncate">{s.value}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <Badge variant="secondary" className="mb-3">About RUNSMSL</Badge>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Empowering Staff Through Collective Savings
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
              The Run Staff Cooperative Multipurpose Society Limited (RUNSMSL) was established in 2010 to provide a reliable, transparent, member-owned financial platform for university staff.
            </p>
            <div className="space-y-3">
              {[
                { icon: Target, title: "Our Mission", text: "Promote financial discipline, provide affordable credit, and enhance member well-being." },
                { icon: Eye, title: "Our Vision", text: "Be the foremost staff cooperative in Nigerian universities — trusted and member-first." },
                { icon: Scale, title: "Our Values", text: "Transparency, mutual trust, accountability, and service to members above all." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-sm">{title}</h3>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800"
              alt="Team collaboration at Redeemer's University"
              className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="absolute -bottom-5 -left-5 bg-card rounded-xl shadow-lg p-3 border border-border hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">15+ Years</p>
                  <p className="text-xs text-muted-foreground">of trusted service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* How to Join */}
      <Section alt>
        <SectionHeader tag="Membership" title="How to Join RUNSMSL" sub="Four simple steps to financial growth." />
        <HScrollMobile>
          {joinSteps.map(s => (
            <Card key={s.step} className="bg-card border-border shrink-0 w-[80%] snap-center">
              <CardContent className="p-5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="font-heading font-bold text-primary text-sm">{s.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </HScrollMobile>
        <HScroll gridClass="grid-cols-2 lg:grid-cols-4">
          {joinSteps.map((s, i) => (
            <Card key={s.step} className="bg-card border-border relative overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="font-heading text-5xl font-bold text-primary/10 absolute top-2 right-3">{s.step}</div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="font-heading font-bold text-primary">{s.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
                {i < joinSteps.length - 1 && (
                  <ChevronRight className="absolute top-1/2 -right-3 h-5 w-5 text-border hidden lg:block" />
                )}
              </CardContent>
            </Card>
          ))}
        </HScroll>
      </Section>

      {/* Benefits */}
      <Section id="benefits">
        <SectionHeader tag="Why Join" title="Benefits of Membership" sub="A complete financial support system for university staff." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((b) => (
            <Card key={b.title} className="bg-card border-border hover:shadow-md transition-shadow group">
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section id="services" alt>
        <SectionHeader tag="Financial Services" title="Loans & Savings Plans" sub="Designed for university staff needs." />
        <HScrollMobile>
          {loanTypes.map((l) => (
            <Card key={l.title} className="bg-card border-border shrink-0 w-[80%] snap-center">
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <l.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{l.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{l.description}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">{l.rate} p.a.</Badge>
                  <Badge variant="secondary" className="text-xs">{l.tenure}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </HScrollMobile>
        <HScroll gridClass="grid-cols-2">
          {loanTypes.map((l) => (
            <Card key={l.title} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <l.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground mb-1">{l.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{l.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{l.rate} p.a.</Badge>
                      <Badge variant="secondary" className="text-xs">{l.tenure}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </HScroll>
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <Card className="bg-gradient-to-br from-ocean-deep to-ocean-mid text-primary-foreground border-0">
            <CardContent className="p-6 sm:p-7">
              <PiggyBank className="h-7 w-7 mb-3 opacity-80" />
              <h3 className="font-heading text-lg font-bold mb-2">Mandatory Savings</h3>
              <p className="text-primary-foreground/80 text-sm mb-3">₦50,000 minimum monthly, deducted from salary. Earn 5% annual interest.</p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">5% Interest</Badge>
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">Auto-deduct</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-success/90 to-success border-0">
            <CardContent className="p-6 sm:p-7">
              <HandCoins className="h-7 w-7 mb-3 text-success-foreground opacity-80" />
              <h3 className="font-heading text-lg font-bold text-success-foreground mb-2">Voluntary Savings</h3>
              <p className="text-success-foreground/80 text-sm mb-3">Top up anytime. Withdrawable with 30 days notice. Same 5% rate.</p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-success-foreground/20 text-success-foreground border-0">Flexible</Badge>
                <Badge className="bg-success-foreground/20 text-success-foreground border-0">5% Interest</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <SectionHeader tag="Process" title="How It Works" sub="Contribute, save, borrow, grow." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {howItWorksSteps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <s.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-widest">Step {s.step}</span>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mt-1 mb-1">{s.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section alt>
        <SectionHeader tag="Governance" title="Meet Our Leadership" sub="Elected by members, committed to transparency." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {executives.map((e) => (
            <Card key={e.name} className="bg-card border-border text-center overflow-hidden group hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">{e.name}</h3>
                  <p className="text-xs text-muted-foreground">{e.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader tag="Testimonials" title="What Members Say" />
        <HScrollMobile>
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-card border-border shrink-0 w-[85%] snap-center">
              <CardContent className="p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </HScrollMobile>
        <HScroll gridClass="md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </HScroll>
      </Section>

      {/* News */}
      <Section alt>
        <SectionHeader tag="Updates" title="News & Announcements" />
        <HScrollMobile>
          {news.map((n) => (
            <Card key={n.title} className="bg-card border-border shrink-0 w-[80%] snap-center">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">{n.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.description}</p>
              </CardContent>
            </Card>
          ))}
        </HScrollMobile>
        <HScroll gridClass="md:grid-cols-3">
          {news.map((n) => (
            <Card key={n.title} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{n.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.description}</p>
              </CardContent>
            </Card>
          ))}
        </HScroll>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionHeader tag="Gallery" title="Life at RUNSMSL" />
        <div className="sm:hidden -mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide">
          {galleryImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`RUNSMSL event ${i + 1}`}
              className="rounded-xl shrink-0 w-[75%] aspect-[4/3] object-cover snap-center"
              loading="lazy"
            />
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl group">
              <img
                src={img}
                alt={`RUNSMSL event ${i + 1}`}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section id="faqs" alt>
        <SectionHeader tag="FAQs" title="Frequently Asked Questions" />
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-4 sm:px-5">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contact / CTA */}
      <Section id="contact">
        <div className="bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-accent rounded-2xl p-6 sm:p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_hsl(200_55%_39%_/_0.4),_transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
              Ready to Build Your Future?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6 text-sm sm:text-base">
              Join RUNSMSL today — financial security, affordable credit, supportive community.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-primary-foreground text-ocean-deep hover:bg-primary-foreground/90 font-semibold gap-2 mb-6">
                Register Today <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-primary-foreground/80 text-sm">
              <a href="tel:+2348012345678" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" /> +234 801 234 5678
              </a>
              <a href="mailto:cooperative@run.edu.ng" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" /> cooperative@run.edu.ng
              </a>
              <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-ocean-deep py-10 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={rucsLogo} alt="RUNSMSL" className="h-8 w-8 object-contain" />
                <span className="font-heading font-bold text-primary-foreground">RUNSMSL</span>
              </div>
              <p className="text-xs text-primary-foreground/60 leading-relaxed">
                Run Staff Cooperative Multipurpose Society Limited — empowering staff since 2010.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-3 text-sm">Quick Links</h4>
              <div className="space-y-1.5 text-xs text-primary-foreground/60">
                <a href="#about" className="block hover:text-primary-foreground transition-colors">About Us</a>
                <a href="#services" className="block hover:text-primary-foreground transition-colors">Services</a>
                <a href="#faqs" className="block hover:text-primary-foreground transition-colors">FAQs</a>
                <a href="#contact" className="block hover:text-primary-foreground transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-3 text-sm">Services</h4>
              <div className="space-y-1.5 text-xs text-primary-foreground/60">
                <p>Emergency Loans</p>
                <p>Education Loans</p>
                <p>Business Loans</p>
                <p>Savings Plans</p>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-3 text-sm">Contact</h4>
              <div className="space-y-1.5 text-xs text-primary-foreground/60">
                <p>Redeemer's University, Ede, Osun State</p>
                <p>cooperative@run.edu.ng</p>
                <p>+234 801 234 5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-5 text-center text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Run Staff Cooperative Multipurpose Society Limited. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
