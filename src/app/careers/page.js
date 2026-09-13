import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { ArrowRight, Zap, Users, Leaf, ShieldCheck, Lightbulb, Award } from '@/components/Icons'

const benefits = [
  {
    icon: Lightbulb,
    title: 'Cutting-Edge Projects',
    desc: 'Work on intelligent building automation systems deployed across hospitals, pharmaceutical plants, data centers, and commercial complexes across India.',
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    desc: 'Join a close-knit team of engineers and technicians who value knowledge-sharing, mentorship, and mutual growth.',
  },
  {
    icon: Zap,
    title: 'Continuous Learning',
    desc: 'Stay ahead with hands-on exposure to the latest BMS, HVAC, IoT, and energy management technologies and platforms.',
  },
  {
    icon: Leaf,
    title: 'Meaningful Impact',
    desc: 'Your work directly contributes to energy efficiency and sustainability in critical infrastructure — making a real difference.',
  },
  {
    icon: ShieldCheck,
    title: 'Stable & Growing',
    desc: 'With 10+ years of industry experience and an expanding client base, PID Controls offers stability and long-term career growth.',
  },
  {
    icon: Award,
    title: 'Recognition & Growth',
    desc: 'Structured appraisals, performance recognition, and clear pathways to senior and leadership roles.',
  },
]

export const metadata = {
  title: 'Careers',
  description: 'Join the PID Controls team and work on intelligent building automation projects across India.',
}

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at PID Controls"
        subtitle="Help us build smarter, more sustainable facilities — and grow your own career in the process."
      />

      {/* Why Join Us */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Why Join PID Controls?</h2>
              <p className="section-subtitle mx-auto">
                We are a team of passionate engineers working at the intersection of technology, sustainability, and infrastructure.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((B) => (
              <ScrollReveal key={B.title}>
                <div className="card flex gap-4 h-full">
                  <div className="w-12 h-12 rounded-lg gradient-green flex items-center justify-center shrink-0 mt-1">
                    <B.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#0B3D24] mb-1">{B.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{B.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">How to Apply</h2>
              <p className="section-subtitle mx-auto">Simple, straightforward — no endless forms.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Email Your Resume', desc: 'Send your CV and a brief cover note to sales@pid-controls.com with the subject "Career Application".' },
              { step: '02', title: 'Initial Call', desc: 'Our team will reach out within 3 business days to schedule a brief introductory call.' },
              { step: '03', title: 'Technical Interview', desc: 'A short technical discussion followed by an offer if it is a good mutual fit.' },
            ].map((s) => (
              <ScrollReveal key={s.step}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-heading font-bold text-lg">{s.step}</span>
                  </div>
                  <h3 className="font-heading font-bold text-[#0B3D24] mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] cta-grid-bg pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Build Your Career With Us?
            </h2>
            <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto">
              Take the first step — email us your resume or reach out through our contact page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:sales@pid-controls.com?subject=Job Application — PID Controls"
                className="btn-primary text-lg px-8 py-4"
              >
                Email Your Resume <ArrowRight />
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#0B3D24] text-lg px-8 py-4">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
