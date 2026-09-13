'use client'

import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { Cpu, Monitor, CheckCircle, ArrowRight } from '@/components/Icons'

export default function ProductsPage() {
  const { serviceImages } = useSiteAssets()
  const hmiImage = serviceImages?.['hmi-solutions'] || '/images/hmi.png'

  return (
    <>
      <PageHeader title="Products" subtitle="Advanced hardware and software solutions for intelligent building control" />

      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="service-image-wrapper group">
                <img src={hmiImage} alt="Human Machine Interface (HMI) control panel and dashboard" className="service-image" loading="eager" width={800} height={500} />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="section-title mb-6">Human Machine Interface (HMI)</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our HMI solutions provide intuitive operator interfaces for monitoring and controlling building automation systems. Designed for reliability and ease of use, our HMIs offer real-time visualization, data trending, alarm management, and remote access capabilities.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Touchscreen operator panels with intuitive UI',
                  'Real-time system visualization & data trending',
                  'Alarm management & event logging',
                  'Remote monitoring via web & mobile interfaces',
                  'Multi-protocol communication (BACnet, Modbus, SNMP)',
                  'SCADA integration & custom dashboard development',
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-primary">
                Enquire About This Product <ArrowRight />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 text-center">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="section-title mb-4">Need a Custom Control Solution?</h2>
            <p className="section-subtitle mx-auto mb-8">
              Our team can design and deliver tailored HMI and control solutions for your specific application.
            </p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Discuss Your Requirements <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
