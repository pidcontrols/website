'use client'

import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { Wrench, Zap, HeartHandshake, Cpu, Award, Leaf, ArrowRight } from '@/components/Icons'

const pillars = [
  { icon: Wrench, title: 'Proven Technical Expertise', desc: 'With over 10 years of hands-on experience, our team has successfully delivered hundreds of BMS, HVAC automation, and energy management projects across diverse industries and facility types.' },
  { icon: Zap, title: 'Energy Savings', desc: 'Our solutions consistently deliver measurable energy savings of 15-30% for our clients. We don\'t just automate — we optimize every system for maximum efficiency and minimum operational cost.' },
  { icon: HeartHandshake, title: 'End-to-End Support', desc: 'From initial consultation through design, installation, commissioning, training, and ongoing maintenance — we provide complete lifecycle support for all our systems.' },
  { icon: Cpu, title: 'Future-Ready Technology', desc: 'We leverage the latest advancements in IoT, cloud analytics, and AI-driven automation to deliver solutions that are scalable, upgradable, and ready for tomorrow\'s challenges.' },
  { icon: Award, title: 'Reliable Performance', desc: 'Our systems are built with industrial-grade components from world-leading brands. Every installation is rigorously tested to ensure 24/7 reliability and peak performance.' },
  { icon: Leaf, title: 'Customer-Centric Approach', desc: 'Every project is unique, and we treat it as such. We take time to understand your specific needs, challenges, and goals — delivering customized solutions that truly work for you.' },
]

export default function WhyChooseUsPage() {
  const { brandsStrip } = useSiteAssets()
  return (
    <>
      <PageHeader title="Why Choose Us" subtitle="Six reasons why PID Controls is the right partner for your building automation needs" />

      {/* Trust Pillars */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((P) => (
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

      {/* Our Brands */}
      <section className="section-padding bg-gray-50 relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Our Brands</h2>
              <p className="section-subtitle mx-auto">Proudly partnered with the world&apos;s leading automation and control brands</p>
            </div>
          </ScrollReveal>
<ScrollReveal>
            <div className="max-w-4xl mx-auto img-card">
              {brandsStrip ? (
                <img src={brandsStrip} alt="Our Brands" className="w-full h-auto object-contain" loading="lazy" />
              ) : (
                <div className="gradient-dark py-12 text-center px-6">
                  <p className="text-green-200 font-heading font-semibold text-lg">Brand logos strip — set it from the Admin Panel (Branding → Brands Strip)</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding gradient-dark">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '10+', label: 'Years Experience' },
              { num: '200+', label: 'Projects Delivered' },
              { num: '50+', label: 'Happy Clients' },
              { num: '24/7', label: 'Support Available' },
            ].map((s) => (
              <ScrollReveal key={s.label}>
                <div>
                  <p className="text-3xl md:text-5xl font-heading font-bold gradient-green bg-clip-text text-transparent mb-2">{s.num}</p>
                  <p className="text-green-200 text-sm md:text-base">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="section-title mb-4">Ready to Experience the Difference?</h2>
            <p className="section-subtitle mx-auto mb-8">Join our list of satisfied clients and take your building performance to the next level</p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get in Touch <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
