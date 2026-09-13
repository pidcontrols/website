'use client'

import { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { Building, Thermometer, Leaf, BarChart3, Gauge, Wind, Zap, Wrench, Monitor, ClipboardCheck, CheckCircle, ArrowRight, Cpu } from '@/components/Icons'

const altTexts = {
  'building-management-system': 'Building Management System dashboard and centralized building controls',
  'hvac-integration': 'HVAC integration architecture and building automation system',
  'environmental-monitoring-system': 'Environmental monitoring system dashboard',
  'energy-monitoring-system': 'Energy monitoring and analytics dashboard',
  'chiller-plant-manager': 'Chiller plant management and optimization dashboard',
  'hmi-solutions': 'HMI solutions and building control interface',
  'iaq-monitoring': 'Indoor Air Quality monitoring and sensor technology',
  'control-panels': 'Custom automation and electrical control panels',
}

const coreServices = [
  {
    id: 'building-management-system', icon: Building,
    title: 'Building Management System (BMS)',
    desc: 'Our BMS solutions provide centralized monitoring and control of all building operations — HVAC, lighting, power systems, security, fire safety, and more. We design and implement comprehensive BMS that deliver real-time visibility, intelligent automation, and data-driven insights.',
    features: ['Centralized monitoring & control', 'Real-time data visualization', 'Automated alerts & notifications', 'Energy consumption tracking', 'System integration & interoperability', 'Remote access & management'],
  },
  {
    id: 'hvac-integration', icon: Thermometer,
    title: 'HVAC Integration',
    desc: 'Maximize HVAC performance while minimizing energy consumption with our smart control strategies. We integrate all HVAC equipment — chillers, boilers, AHUs, FCUs, VAVs, and pumps — into a unified, intelligent control system.',
    features: ['Smart scheduling & setpoint optimization', 'Zone-based temperature control', 'Demand-controlled ventilation', 'Predictive maintenance alerts', 'Energy optimization algorithms', 'Integration with BMS platform'],
  },
  {
    id: 'environmental-monitoring-system', icon: Leaf,
    title: 'Environmental Monitoring System (EMS)',
    desc: 'Continuous monitoring of environmental parameters ensures compliance with health, safety, and regulatory standards. Our EMS solutions track temperature, humidity, CO2 levels, particulate matter, and more.',
    features: ['Real-time environmental monitoring', 'IAQ parameter tracking', 'Compliance reporting & documentation', 'Automated threshold alerts', 'Historical data analysis', 'Multi-zone monitoring'],
  },
  {
    id: 'energy-monitoring-system', icon: BarChart3,
    title: 'Energy Monitoring System (EnMS)',
    desc: 'Gain complete visibility into your energy consumption patterns with our advanced energy monitoring solutions. Track, analyze, and optimize energy usage across all building systems and equipment.',
    features: ['Real-time energy consumption tracking', 'Sub-metering & load profiling', 'Energy analytics & reporting', 'Cost allocation & benchmarking', 'Peak demand management', 'Energy savings verification'],
  },
  {
    id: 'chiller-plant-manager', icon: Gauge,
    title: 'Chiller Plant Manager (CPM)',
    desc: 'Our advanced CPM solutions automate and optimize chiller plant operations for maximum efficiency. Intelligent sequencing, setpoint optimization, and variable speed control deliver significant energy savings.',
    features: ['Intelligent chiller sequencing', 'Optimal setpoint management', 'Variable primary flow control', 'Condenser water temperature optimization', 'Performance analytics & reporting', 'Automated fault detection'],
  },
  {
    id: 'hmi-solutions', icon: Cpu,
    title: 'HMI Solutions',
    desc: 'Custom Human-Machine Interface (HMI) solutions for intuitive operator control and real-time visualization. We design and deploy touchscreen panels, SCADA dashboards, and remote monitoring interfaces tailored to your facility.',
    features: ['Custom touchscreen HMI design & development', 'SCADA system integration & visualization', 'Real-time dashboards & data trending', 'Alarm management & event logging', 'Remote monitoring via web & mobile', 'Multi-protocol communication (BACnet, Modbus, etc.)'],
  },
  {
    id: 'iaq-monitoring', icon: Wind,
    title: 'IAQ Monitoring',
    desc: 'Indoor Air Quality monitoring solutions for healthier, safer indoor environments. Real-time tracking of CO2, PM2.5/PM10, TVOC, temperature, and humidity with automated alerts and compliance reporting.',
    features: ['Real-time IAQ parameter tracking', 'CO2, PM2.5/PM10 & TVOC monitoring', 'Temperature & humidity sensing', 'Automated threshold alerts & notifications', 'Compliance reporting & documentation', 'Multi-zone IAQ monitoring'],
  },
  {
    id: 'control-panels', icon: Zap,
    title: 'Control Panels',
    desc: 'Custom designed and built automation panels, electrical panels, and VFD panels. Fully tested and commissioned to meet your specific project requirements and industry standards.',
    features: ['Custom automation panel design & fabrication', 'Electrical panel manufacturing & wiring', 'VFD panel integration & commissioning', 'PLC & controller panel integration', 'Quality testing & compliance', 'On-site installation & support'],
  },
]

const advancedServices = [
  { icon: Wrench, title: 'HVAC Products', desc: 'Supply and installation of quality HVAC components including filters, valves, actuators, VRV units, blowers, and associated accessories.' },
  { icon: Monitor, title: 'Engineering Services', desc: 'Comprehensive engineering services including system design, consultancy, project execution, technical support, and site supervision.' },
  { icon: ClipboardCheck, title: 'AMC & CMC Services', desc: 'Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC) to ensure your systems operate at peak performance year-round.' },
]

export default function ServicesPage() {
  const [highlightId, setHighlightId] = useState(null)
  const { serviceImages } = useSiteAssets()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setHighlightId(hash)
      const timer = setTimeout(() => setHighlightId(null), 2200)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <PageHeader title="Our Services" subtitle="Comprehensive building automation and energy management solutions" />

      {/* Core Services */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide relative z-10">
          {coreServices.map((S, i) => {
            const isImageLeft = i % 2 === 0
            const sectionId = S.id

            return (
              <section
                key={sectionId}
                id={sectionId}
                className={`scroll-mt-28 mb-20 last:mb-0 service-section ${highlightId === sectionId ? 'service-highlight' : ''}`}
              >
                <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${!isImageLeft ? 'md:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`${!isImageLeft ? 'md:col-start-2' : ''}`}>
                    {serviceImages[sectionId] ? (
                      <div className="service-image-wrapper group">
                        <img
                          src={serviceImages[sectionId]}
                          alt={altTexts[sectionId]}
                          className="service-image"
                          loading={i === 0 ? 'eager' : 'lazy'}
                          width={800}
                          height={500}
                        />
                      </div>
                    ) : (
                      <div className="service-image-wrapper flex items-center justify-center gradient-dark min-h-[280px] md:min-h-[320px]">
                        <div className="text-center p-8">
                          <S.icon className="w-20 h-20 md:w-24 md:h-24 text-[#8BC34A] mx-auto mb-4" />
                          <p className="text-green-200 font-heading font-semibold text-lg">{S.title}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Text */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <S.icon className="w-7 h-7 text-[#4CAF50]" />
                      <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3D24]">{S.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{S.desc}</p>
                    <h4 className="font-heading font-bold text-lg text-[#0B3D24] mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {S.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 shrink-0" />
                          <span className="text-gray-700">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </section>

      {/* Advanced Control & Monitoring */}
      <section className="section-padding bg-gray-50 relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Advanced Control & Monitoring Solutions</h2>
              <p className="section-subtitle mx-auto">Complementary solutions that complete our comprehensive service portfolio</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedServices.map((S, i) => (
              <ScrollReveal key={S.title}>
                <div className="card h-full group hover:border-[#4CAF50]/30">
                  <S.icon className="w-10 h-10 text-[#4CAF50] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0B3D24] mb-2">{S.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{S.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] cta-grid-bg pointer-events-none" />
        <div className="container-wide relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-green-200 mb-8 max-w-2xl mx-auto">Our team will design a solution tailored to your facility&apos;s specific requirements</p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Discuss Your Project <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
