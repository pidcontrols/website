'use client'

import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { Lightbulb, CheckCircle, HeartHandshake, Target, Leaf, Award, Wrench, Zap, Cpu, ArrowRight } from '@/components/Icons'

const capabilities = [
  'BMS', 'HVAC Automation', 'Energy Monitoring', 'IAQ Monitoring',
  'Smart Infrastructure', 'System Integration', 'Operational Excellence',
]

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'Continuously adopting cutting-edge technologies to deliver smarter automation solutions that stay ahead of industry trends.' },
  { icon: CheckCircle, title: 'Quality', desc: 'Uncompromising standards in every project — from design and engineering to installation and commissioning.' },
  { icon: HeartHandshake, title: 'Integrity', desc: 'Transparent, honest, and ethical business practices in all our client relationships and project deliveries.' },
  { icon: Target, title: 'Customer Success', desc: 'Our clients\' operational efficiency and energy savings are the true measure of our success.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Committed to creating energy-efficient buildings that reduce environmental impact and operational costs.' },
  { icon: Award, title: 'Excellence', desc: 'Pursuit of perfection in every system we design, every panel we build, and every service we deliver.' },
]

const whyUsPillars = [
  { icon: Wrench, title: 'Proven Technical Expertise', desc: 'With over 10 years of hands-on experience, our team has successfully delivered hundreds of BMS, HVAC automation, and energy management projects across diverse industries.' },
  { icon: Zap, title: 'Energy Savings', desc: 'Our solutions consistently deliver measurable energy savings of 15-30% for our clients. We optimize every system for maximum efficiency and minimum operational cost.' },
  { icon: HeartHandshake, title: 'End-to-End Support', desc: 'From initial consultation through design, installation, commissioning, training, and ongoing maintenance — we provide complete lifecycle support.' },
  { icon: Cpu, title: 'Future-Ready Technology', desc: 'We leverage the latest advancements in IoT, cloud analytics, and AI-driven automation to deliver scalable, upgradable solutions ready for tomorrow\'s challenges.' },
  { icon: Award, title: 'Reliable Performance', desc: 'Our systems are built with industrial-grade components from world-leading brands. Every installation is rigorously tested for 24/7 reliability.' },
  { icon: Leaf, title: 'Customer-Centric Approach', desc: 'Every project is unique. We take time to understand your specific needs, challenges, and goals — delivering customized solutions that truly work for you.' },
]

const processSteps = [
  { num: '01', title: 'Consultation & Requirement Analysis', desc: 'We begin by understanding your facility, goals, and challenges. Our team conducts a thorough site assessment and requirements gathering to define the scope and objectives.' },
  { num: '02', title: 'Design & Engineering', desc: 'Our engineering team develops detailed system designs, control strategies, and equipment selections tailored to your facility.' },
  { num: '03', title: 'Installation & Integration', desc: 'Our certified technicians execute professional installation of all hardware, sensors, controllers, and networking infrastructure.' },
  { num: '04', title: 'Testing & Commissioning', desc: 'Every system undergoes rigorous testing and commissioning. We verify all control sequences, alarm setpoints, and performance parameters.' },
  { num: '05', title: 'Training & Handover', desc: 'We provide comprehensive training to your facility team on system operations, monitoring, and troubleshooting.' },
  { num: '06', title: 'Support & Maintenance', desc: 'Our commitment continues with ongoing support, remote monitoring, and maintenance services including AMC/CMC contracts.' },
]

export default function AboutPage() {
  const { yearsBadge } = useSiteAssets()
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Engineering Smarter Buildings for a Sustainable Future"
      />

      {/* Narrative */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="w-full aspect-[4/3] gradient-dark rounded-2xl flex items-center justify-center p-6">
                <img src={yearsBadge} alt="10+ Years of Excellence in Building Automation" className="w-full h-full object-contain" loading="eager" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="section-title mb-6">Engineering Smarter Buildings for a Sustainable Future</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>PID Controls is a Hyderabad-based Building Management System (BMS) and automation company with over 10 years of experience in delivering intelligent building automation and energy management solutions across India.</p>
                <p>Founded with a vision to transform how buildings operate, we have grown into a trusted partner for facility managers, MEP consultants, builders, developers, and industrial plant owners seeking advanced automation, monitoring, and control systems.</p>
                <p>Our team of certified engineers and technicians brings deep expertise in BMS, HVAC automation, energy management, environmental monitoring, and custom control panel engineering. We partner with global leaders including Siemens, Schneider Electric, ABB, Honeywell, and more to deliver world-class solutions.</p>
                <p>From commercial buildings to pharmaceutical facilities, data centers to educational institutions, our solutions have helped clients achieve measurable energy savings, operational excellence, and sustainable performance.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capability Hub */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Our Capability Hub</h2>
              <p className="section-subtitle mx-auto">Integrated expertise across the full spectrum of building automation</p>
            </div>
          </ScrollReveal>
          <div className="gradient-dark rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {capabilities.map((c) => (
                <ScrollReveal key={c}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-center border border-white/10 hover:bg-white/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#4CAF50]/30 flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-5 h-5 text-[#8BC34A]" />
                    </div>
                    <p className="text-white font-heading font-semibold text-sm md:text-base">{c}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="section-padding bg-white scroll-mt-28">
        <div className="container-wide">
          <ScrollReveal>
            <div className="card border-l-4 border-l-[#4CAF50] max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3D24] mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">To be the most trusted partner in building automation, setting the standard for intelligent, sustainable, and energy-efficient facilities across India and beyond.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section-padding bg-gray-50 scroll-mt-28">
        <div className="container-wide">
          <ScrollReveal>
            <div className="card border-l-4 border-l-[#8BC34A] max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3D24] mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">To empower facility owners and operators with cutting-edge automation and energy management solutions that reduce operational costs, enhance comfort, and contribute to a sustainable future.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="section-padding bg-white relative scroll-mt-28">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Why Choose PID Controls</h2>
              <p className="section-subtitle mx-auto">Six reasons why we are the right partner for your building automation needs</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsPillars.map((P) => (
              <ScrollReveal key={P.title}>
                <div className="card h-full group hover:border-[#4CAF50]/30">
                  <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <P.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0B3D24] mb-3">{P.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{P.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Our Core Values</h2>
              <p className="section-subtitle mx-auto">The principles that guide every project and partnership</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((V) => (
              <ScrollReveal key={V.title}>
                <div className="card text-center h-full">
                  <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mx-auto mb-4">
                    <V.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0B3D24] mb-2">{V.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{V.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section id="our-process" className="section-padding bg-white relative scroll-mt-28">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="section-title mb-4">Our Process</h2>
              <p className="section-subtitle mx-auto">A proven six-step methodology for successful project delivery</p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num}>
                <div className="relative flex gap-6 md:gap-10 pb-12 last:pb-0">
                  {i < processSteps.length - 1 && (
                    <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gradient-to-b from-[#4CAF50] to-[#8BC34A]" />
                  )}
                  <div className="relative z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-green flex items-center justify-center shadow-lg">
                      <span className="text-white font-heading font-bold text-sm md:text-base">{step.num}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 md:p-8 border border-gray-100">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-[#0B3D24] mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dark text-center">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Let&apos;s Build Something Smarter</h2>
            <p className="text-green-200 mb-8 max-w-2xl mx-auto">Partner with PID Controls for your next building automation project</p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get in Touch <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
