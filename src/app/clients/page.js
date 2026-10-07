'use client'

import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'
import { ArrowRight } from '@/components/Icons'

export default function ClientsPage() {
  const { clients } = useSiteAssets()

  return (
    <>
      <PageHeader title="Our Clients" subtitle="Trusted by leading organizations across pharmaceutical, healthcare, industrial, and engineering sectors" />

      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="section-title mb-4">Trusted Organizations</h2>
              <p className="section-subtitle mx-auto">
                We are proud to work with organizations that value reliable automation, intelligent control, operational efficiency, and sustainable performance.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {clients.map((client, i) => (
                <ScrollReveal key={client.name}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-2.5 sm:p-3 border border-gray-200/60 hover:border-[#4CAF50]/40 group text-center h-full flex flex-col items-center justify-center">
                    <div className="w-full h-20 sm:h-24 flex items-center justify-center p-2 bg-gray-50/70 rounded border border-gray-100">
                      <img
                        src={client.src}
                        alt={`${client.name} - Valued Client of PID Controls`}
                        className="max-h-12 sm:max-h-14 max-w-[130px] sm:max-w-[150px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        loading={i < 4 ? 'eager' : 'lazy'}
                        width={150}
                        height={56}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-dark text-center">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Join Our Growing Client Network
            </h2>
            <p className="text-green-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how PID Controls can deliver intelligent automation solutions for your organization.
            </p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get in Touch <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
