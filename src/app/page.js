'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import PartnerMarquee from '@/components/PartnerMarquee'
import ServiceCarousel from '@/components/ServiceCarousel'
import usePrefersReducedMotion from '@/components/usePrefersReducedMotion'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { Building, Zap, Settings, Leaf, Thermometer, BarChart3, ClipboardCheck, Gauge, ShieldCheck, ArrowRight, Users, Globe } from '@/components/Icons'

const pillars = [
  { icon: Building, label: 'Smart Buildings' },
  { icon: Zap, label: 'Energy Efficiency' },
  { icon: Settings, label: 'Reliable Solutions' },
  { icon: Leaf, label: 'Sustainable Future' },
]

const services = [
  { icon: Building, label: 'BMS Solutions', desc: 'Centralized building monitoring & control', href: '/services#building-management-system', imageKey: 'building-management-system' },
  { icon: Thermometer, label: 'HVAC Automation', desc: 'Smart HVAC performance optimization', href: '/services#hvac-integration', imageKey: 'hvac-integration' },
  { icon: BarChart3, label: 'Energy Management', desc: 'Real-time energy tracking & analytics', href: '/services#energy-monitoring-system', imageKey: 'energy-monitoring-system' },
  { icon: Leaf, label: 'Environment Monitoring', desc: 'Continuous environmental compliance', href: '/services#environmental-monitoring-system', imageKey: 'environmental-monitoring-system' },
  { icon: Settings, label: 'Control & Engineering', desc: 'Custom automation & electrical panels', href: '/services#control-panels', imageKey: 'control-panels' },
]

const industryImages = [
  { key: 'commercial', label: 'Commercial Buildings' },
  { key: 'healthcare', label: 'Healthcare Facilities' },
  { key: 'pharmaceutical', label: 'Pharmaceutical' },
  { key: 'industrial', label: 'Industrial Facilities' },
  { key: 'education', label: 'Educational Institutions' },
  { key: 'datacenter', label: 'Data Centers' },
]

const previewServices = [
  { icon: Building, title: 'Building Management System', desc: 'Centralized monitoring and control of all building operations — HVAC, lighting, power, security, and more. Real-time visibility and intelligent automation.' },
  { icon: Thermometer, title: 'HVAC Automation', desc: 'Smart control strategies that maximize HVAC performance while minimizing energy consumption. Adaptive scheduling, zone control, and predictive maintenance.' },
  { icon: BarChart3, title: 'Energy Management', desc: 'Comprehensive energy monitoring, analytics, and reporting. Identify savings opportunities, track consumption patterns, and optimize energy usage.' },
  { icon: Leaf, title: 'Environmental Monitoring', desc: 'Continuous monitoring of IAQ, temperature, humidity, CO2, and other parameters. Ensure compliance with health and safety standards.' },
  { icon: Gauge, title: 'Chiller Plant Optimization', desc: 'Advanced chiller plant manager (CPM) solutions that optimize chiller sequencing, setpoints, and pump speeds for maximum efficiency.' },
  { icon: Settings, title: 'Control Panels & Engineering', desc: 'Custom automation panels, electrical panels, and VFD panels designed and built to your specifications. Full engineering support.' },
]

const trustPoints = [
  { icon: ShieldCheck, title: '10+ Years Experience', desc: 'Proven track record in building automation since 2014' },
  { icon: Users, title: 'Expert Team', desc: 'Certified engineers and technicians' },
  { icon: Globe, title: 'Pan-India Service', desc: 'Projects delivered across India' },
  { icon: ClipboardCheck, title: 'End-to-End Support', desc: 'From design to maintenance' },
  { icon: Zap, title: 'Energy Savings', desc: 'Proven reduction in operational costs' },
]

export default function Home() {
  const reduced = usePrefersReducedMotion()
  const { serviceImages, industryImages: industrySrcs, yearsBadge } = useSiteAssets()
  const heroRef = useRef(null)
  const heroLayersRef = useRef(null)
  const parallaxRef = useRef(false)

  const resolvedServices = services.map((S) => ({ ...S, image: serviceImages?.[S.imageKey] }))
  const resolvedIndustries = industryImages.map((I) => ({ ...I, src: industrySrcs?.[I.key] }))

  useEffect(() => {
    if (reduced) return
    const supportsHover = window.matchMedia('(hover: hover)').matches
    if (!supportsHover) return
    parallaxRef.current = true
    const onMove = (e) => {
      const el = heroRef.current
      const layers = heroLayersRef.current
      if (!el || !layers) return
      const r = el.getBoundingClientRect()
      const cx = (e.clientX - r.left) / r.width - 0.5
      const cy = (e.clientY - r.top) / r.height - 0.5
      layers.style.transform = `translate3d(${cx * -14}px, ${cy * -14}px, 0)`
    }
    const el = heroRef.current
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [reduced])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="gradient-dark min-h-[90vh] flex items-center relative overflow-hidden pt-20">
        {/* Layer 1 - blueprint grid */}
        <div className="absolute inset-0 hero-grid opacity-[0.06] pointer-events-none" />
        {/* Layer 2 - circuit data-flow paths */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <path className="data-path" d="M-20 120 H260 L320 180 H520 L580 120 H1020" />
            <path className="data-path" d="M-20 480 H180 L240 420 H460 L520 480 H1020" />
            <path className="data-path" d="M120 -20 V200 L180 260 V620" />
            <path className="data-path" d="M880 -20 V160 L820 220 V620" />
            {!reduced && (
              <>
                <circle r="4.5" fill="#bfeee0">
                  <animateMotion dur="7s" repeatCount="indefinite" path="M-20 120 H260 L320 180 H520 L580 120 H1020" />
                </circle>
                <circle r="4.5" fill="#bfeee0">
                  <animateMotion dur="9s" begin="1.5s" repeatCount="indefinite" path="M-20 480 H180 L240 420 H460 L520 480 H1020" />
                </circle>
                <circle r="4.5" fill="#bfeee0">
                  <animateMotion dur="8s" begin="3s" repeatCount="indefinite" path="M120 -20 V200 L180 260 V620" />
                </circle>
              </>
            )}
          </svg>
        </div>
        {/* Layer 3 - sensor nodes */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="sensor-node" style={{ top: '18%', left: '24%', animationDelay: '0s' }} />
          <span className="sensor-node" style={{ top: '70%', left: '42%', animationDelay: '1.3s' }} />
          <span className="sensor-node" style={{ top: '30%', left: '78%', animationDelay: '2.4s' }} />
          <span className="sensor-node" style={{ top: '62%', left: '70%', animationDelay: '0.8s' }} />
        </div>
        {/* Layer 4 - radial glow */}
        <div className="hero-glow pointer-events-none" />
        {/* Layer 5 - mouse parallax wrapper */}
        <div ref={heroLayersRef} className="absolute inset-0 will-change-transform" style={{ transition: 'transform 0.2s ease-out' }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#4CAF50]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#8BC34A]/10 blur-3xl" />
        </div>
        {/* Light sweep */}
        {!reduced && <div className="hero-sweep pointer-events-none" />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-4">
                <span className="hero-rise-line"><span className="gradient-green bg-clip-text text-transparent block" style={{ animationDelay: '0.12s' }}>Smart Automation.</span></span>
                <span className="hero-rise-line"><span className="gradient-green bg-clip-text text-transparent block" style={{ animationDelay: '0.24s' }}>Sustainable Performance.</span></span>
              </h1>
              <p className="hero-rise text-xl md:text-2xl text-green-200 font-heading font-semibold mb-4" style={{ animationDelay: '0.36s' }}>
                Intelligent Building Automation &amp; Energy Management Solutions
              </p>
              <p className="hero-rise text-gray-300 text-lg mb-8 leading-relaxed" style={{ animationDelay: '0.48s' }}>
                Transforming buildings into intelligent, efficient, and future-ready facilities through advanced automation, monitoring, and control systems.
              </p>
              <div className="hero-rise flex flex-wrap gap-4" style={{ animationDelay: '0.6s' }}>
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Get a Consultation
                </Link>
                <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#0B3D24] text-lg px-8 py-4">
                  Request a Quote
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {pillars.map((P, i) => (
                <div key={P.label} className="hero-rise bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-colors" style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
                  <P.icon className="w-10 h-10 mx-auto mb-3 text-[#8BC34A]" />
                  <p className="text-white font-semibold">{P.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Our Core Services</h2>
              <p className="section-subtitle mx-auto">Comprehensive building automation and energy management solutions tailored to your needs</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ServiceCarousel services={resolvedServices} />
          </ScrollReveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="w-full aspect-[4/3] gradient-dark rounded-2xl flex items-center justify-center p-6">
                <img src={yearsBadge} alt="10+ Years of Excellence in Building Automation" className="w-full h-full object-contain" loading="eager" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="section-title mb-4">Engineering Smarter Buildings for a Sustainable Future</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With over a decade of experience, PID Controls has been at the forefront of intelligent building automation in India. We specialize in designing, integrating, and maintaining advanced BMS, HVAC, and energy management systems that transform how buildings operate.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From commercial complexes to pharmaceutical facilities, our solutions deliver measurable energy savings, operational efficiency, and sustainable performance.
              </p>
              <Link href="/about" className="btn-primary">
                Know More About Us
                <ArrowRight />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50 relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">What We Deliver</h2>
              <p className="section-subtitle mx-auto">End-to-end building automation solutions for modern facilities</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {previewServices.map((S, i) => (
              <ScrollReveal key={S.title}>
                <div className="card group hover:border-[#4CAF50]/30 h-full">
                  <S.icon className="w-10 h-10 text-[#4CAF50] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading font-bold text-lg text-[#0B3D24] mb-2">{S.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{S.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/services" className="btn-primary">
                View All Services
                <ArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Industries We Serve</h2>
              <p className="section-subtitle mx-auto">Delivering intelligent automation solutions across diverse sectors</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resolvedIndustries.map((I, i) => (
              <ScrollReveal key={I.label}>
                <Link href="/industries" className="img-card group block">
                  <img src={I.src} alt={I.label} className="w-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust PID Controls */}
      <section className="section-padding bg-gray-50 relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Why Trust PID Controls</h2>
              <p className="section-subtitle mx-auto">What sets us apart in the building automation industry</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPoints.map((T, i) => (
              <ScrollReveal key={T.title}>
                <div className="card flex gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-green flex items-center justify-center shrink-0 mt-1">
                    <T.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#0B3D24] mb-1">{T.title}</h3>
                    <p className="text-gray-600 text-sm">{T.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="section-title mb-4">Our Technology Partners</h2>
              <p className="section-subtitle mx-auto">Proud partners with global leaders in automation and control</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <PartnerMarquee />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] cta-grid-bg pointer-events-none" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234CAF50' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Ready to Make Your Building Smarter?
            </h2>
            <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto">
              Get in touch with our experts for a free consultation. Let&apos;s discuss how PID Controls can transform your facility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get a Consultation
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#0B3D24] text-lg px-8 py-4">
                Request a Quote
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
