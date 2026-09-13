'use client'

import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { ArrowRight } from '@/components/Icons'

const industries = [
  { id: 'commercial', imageKey: 'commercial', title: 'Commercial Buildings', desc: 'Smart BMS and HVAC automation for office complexes, malls, hotels, and mixed-use developments. Reduce operational costs while enhancing occupant comfort and building performance.' },
  { id: 'healthcare', imageKey: 'healthcare', title: 'Healthcare Facilities', desc: 'Critical environment monitoring and control for hospitals, clinics, and medical facilities. Precise temperature, humidity, and IAQ management for patient safety and regulatory compliance.' },
  { id: 'pharma', imageKey: 'pharmaceutical', title: 'Pharmaceutical & Life Sciences', desc: 'GMP-compliant automation solutions for pharmaceutical manufacturing, clean rooms, and laboratory environments. 24/7 environmental monitoring with full validation support.' },
  { id: 'industrial', imageKey: 'industrial', title: 'Industrial Facilities', desc: 'Robust automation and control systems for factories, warehouses, and production plants. Energy optimization, process monitoring, and integrated plant management.' },
  { id: 'education', imageKey: 'education', title: 'Educational Institutions', desc: 'Comprehensive building management for campuses, universities, and research centers. Centralized control of HVAC, lighting, and energy systems across multiple buildings.' },
  { id: 'datacenter', imageKey: 'datacenter', title: 'Data Centers & Critical Infrastructure', desc: 'Precision cooling control, environmental monitoring, and power management for data centers. Ensure uptime, efficiency, and compliance with industry standards.' },
]

export default function IndustriesPage() {
  const { industryImages } = useSiteAssets()
  const resolved = industries.map((I) => ({ ...I, src: industryImages?.[I.imageKey] }))

  return (
    <>
      <PageHeader title="Industries We Serve" subtitle="Delivering intelligent automation solutions across diverse sectors" />
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolved.map((I) => (
              <section key={I.id} id={I.id}>
                <ScrollReveal>
                  <div className="img-card group">
                    <img src={I.src} alt={I.title} className="w-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  </div>
                </ScrollReveal>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dark text-center">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Not Sure Which Solution Fits Your Industry?</h2>
            <p className="text-green-200 mb-8 max-w-2xl mx-auto">Our team has experience across diverse sectors. Let&apos;s discuss your specific requirements.</p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Schedule a Consultation <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
