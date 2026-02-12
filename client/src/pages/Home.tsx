import { Navbar } from "@/components/Navbar";
import { Section, SectionHeader } from "@/components/Section";
import { ChatInterface } from "@/components/ChatInterface";
import { FeatureCard } from "@/components/FeatureCard";
import { FinancialChart, FundingPieChart } from "@/components/Charts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateLead } from "@/hooks/use-leads";
import { 
  Zap, Clock, TrendingUp, Users, Shield, MessageCircle, 
  ArrowRight, CheckCircle2, ChevronDown 
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const { mutate: submitLead, isPending } = useCreateLead();
  const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead(formState, {
      onSuccess: () => setFormState({ name: "", email: "", company: "", message: "" })
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Cover Slide - Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden text-white pt-20">
        {/* Background Gradient & Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-blue-200">
              Made in Bangalore 🇮🇳
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight leading-tight">
              Customer Service <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Reimagined with AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Automate 80% of your support queries instantly. Reduce costs, increase satisfaction, and never miss a customer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25">
                Invest Now
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 hover:bg-white/10 text-white bg-transparent">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* 2. The Problem */}
      <Section id="problem" className="bg-slate-50">
        <SectionHeader 
          title="The Problem" 
          subtitle="SMBs in India are losing revenue every day due to inefficient manual support processes."
        />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Slow Response Times</h3>
            <p className="text-slate-600">Average response time for SMBs is 12+ hours. Customers expect answers in minutes, not hours.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Missed Inquiries</h3>
            <p className="text-slate-600">Calls go unanswered and messages get lost in busy WhatsApp inboxes. Every missed lead is lost revenue.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">High Staffing Costs</h3>
            <p className="text-slate-600">Hiring dedicated support staff is expensive (₹20k/mo per agent) and hard to scale during peak seasons.</p>
          </div>
        </div>
      </Section>

      {/* 3. The Solution / Product Overview */}
      <Section id="solution">
        <SectionHeader 
          title="The Solution" 
          subtitle="An intelligent AI agent that lives on your website and WhatsApp, available 24/7."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={MessageCircle} 
            title="WhatsApp Integration" 
            description="Seamlessly connects with WhatsApp Business API to reply to customers where they already are."
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap} 
            title="Instant Answers" 
            description="Trained on your business data to answer FAQs about pricing, hours, and services instantly."
            delay={0.2}
          />
          <FeatureCard 
            icon={Clock} 
            title="24/7 Availability" 
            description="Never sleeps. Handles customer queries at 2 AM just as effectively as 2 PM."
            delay={0.3}
          />
          <FeatureCard 
            icon={Shield} 
            title="Human Handover" 
            description="Intelligently detects complex issues and escalates them to a human agent seamlessly."
            delay={0.4}
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Analytics Dashboard" 
            description="Track common queries, customer sentiment, and resolution times in real-time."
            delay={0.5}
          />
          <FeatureCard 
            icon={CheckCircle2} 
            title="Zero Setup" 
            description="We scrape your website to train the AI automatically. Go live in under 5 minutes."
            delay={0.6}
          />
        </div>
      </Section>

      {/* 4. Live Demo (MVP) */}
      <Section id="demo" className="bg-slate-900 py-24">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">Proof of Technology</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-white font-display">Experience the AI Live</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            This is a real, functioning MVP. Interact with the AI below. It uses OpenAI's GPT models via streaming to generate responses.
          </p>
        </div>
        
        <ChatInterface />
        
        <div className="mt-8 text-center text-slate-500 text-sm">
          * This demo is running live on our backend infrastructure.
        </div>
      </Section>

      {/* 5. Business Model & Market */}
      <Section id="pricing" className="bg-slate-50">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader title="Market Opportunity" />
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
              <h4 className="font-semibold mb-6">Total Addressable Market (India)</h4>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900">63M+</div>
                  <div className="text-sm text-slate-500">MSMEs in India</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">$50B</div>
                  <div className="text-sm text-slate-500">SaaS Market by 2030</div>
                </div>
              </div>
              <p className="text-slate-600 mb-6">
                We are targeting the 6 million service-based businesses (Salons, Clinics, Real Estate, Education) who need instant lead engagement.
              </p>
            </div>
          </div>

          <div>
            <SectionHeader title="Business Model" />
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Basic Plan */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <h3 className="font-bold text-xl mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-4">₹999<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-500" /> 500 Conversations</li>
                  <li className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-500" /> Website Widget</li>
                  <li className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-500" /> Email Support</li>
                </ul>
                <Button className="w-full" variant="outline">Select Plan</Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden transform scale-105">
                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <h3 className="font-bold text-xl mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">₹2,499<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited Conversations</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-400" /> WhatsApp Integration</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Custom Training</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 border-none">Select Plan</Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Traction & Team */}
      <Section id="traction">
        <SectionHeader title="Traction & Team" subtitle="We are moving fast." />
        
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Pilot Customers", value: "20+" },
            { label: "Conversations Processed", value: "50k+" },
            { label: "Hours Saved", value: "1,200" },
            { label: "Revenue (ARR)", value: "₹5L" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Arjun Mehta", role: "CEO", bio: "Ex-Flipkart Product Manager. 7+ years in SaaS." },
            { name: "Priya Sharma", role: "CTO", bio: "AI Researcher at IISc. Expert in NLP & Transformers." },
            { name: "Rohan Gupta", role: "Growth", bio: "Scaled 2 B2B startups from 0 to $1M ARR." },
          ].map((member, i) => (
            <div key={i} className="group">
              <div className="h-64 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
                 {/* Placeholder for team photos */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                    <User className="w-20 h-20 opacity-20" />
                 </div>
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <div className="text-blue-600 font-medium mb-2">{member.role}</div>
              <p className="text-slate-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Financials & Ask */}
      <Section id="ask" className="bg-slate-50">
        <SectionHeader title="Financial Projections & Ask" />
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold mb-6 text-lg">Revenue vs Cost (3 Year)</h4>
            <FinancialChart />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold mb-6 text-lg">Use of Funds (₹1.5 Cr)</h4>
            <FundingPieChart />
          </div>
        </div>

        {/* Investment CTA */}
        <div id="contact" className="bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Journey</h2>
              <p className="text-slate-300 mb-8 text-lg">
                We are raising ₹1.5 Crore to accelerate product development and acquire our first 100 paying customers.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">1</div>
                  <span>High Growth Potential B2B SaaS</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">2</div>
                  <span>Proven Team with Exits</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">3</div>
                  <span>Large Underserved Market</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Express Interest</h3>
              <form className="space-y-4" onSubmit={handleLeadSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Name</label>
                    <Input 
                      placeholder="John Doe" 
                      required 
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company</label>
                    <Input 
                      placeholder="Acme VC" 
                      value={formState.company}
                      onChange={e => setFormState({...formState, company: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea 
                    placeholder="I'm interested in investing..." 
                    rows={4} 
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg" disabled={isPending}>
                  {isPending ? "Sending..." : "Connect with Founders"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>
      
      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-500 text-sm">
        <p>© 2025 Customer Service AI. All rights reserved.</p>
        <p className="mt-2">Made with ❤️ in Bangalore.</p>
      </footer>
    </div>
  );
}
