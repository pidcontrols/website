'use client'

import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

const steps = [
  { num: '01', title: 'Consultation & Requirement Analysis', desc: 'We begin by understanding your facility, goals, and challenges. Our team conducts a thorough site assessment and requirements gathering to define the scope, objectives, and success criteria for your project.' },
  { num: '02', title: 'Design & Engineering', desc: 'Our engineering team develops detailed system designs, control strategies, and equipment selections. We create comprehensive schematics, BOMs, and integration plans tailored to your facility.' },
  { num: '03', title: 'Installation & Integration', desc: 'Our certified technicians execute professional installation of all hardware, sensors, controllers, and networking infrastructure. We integrate with existing systems and ensure seamless interoperability.' },
  { num: '04', title: 'Testing & Commissioning', desc: 'Every system undergoes rigorous testing and commissioning. We verify all control sequences, alarm setpoints, communication protocols, and performance parameters before going live.' },
  { num: '05', title: 'Training & Handover', desc: 'We provide comprehensive training to your facility team on system operations, monitoring, and troubleshooting. Complete documentation, user manuals, and as-built drawings are delivered.' },
  { num: '06', title: 'Support & Maintenance', desc: 'Our commitment continues with ongoing support, remote monitoring, and maintenance services. We offer AMC/CMC contracts to ensure your systems perform optimally year after year.' },
]

export default function ProcessPage() {
  return (
    <>
      <PageHeader title="Our Process" subtitle="A proven six-step methodology for successful project delivery" />

      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 circuit-overlay pointer-events-none" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Project Execution Process</h2>
              <p className="section-subtitle mx-auto">From consultation to ongoing support — a structured approach that ensures quality, reliability, and client satisfaction</p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num}>
                <div className="relative flex gap-6 md:gap-10 pb-12 last:pb-0">
                  {i < steps.length - 1 && (
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

      {/* Dashboard Mockup */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Real-Time Building Intelligence</h2>
              <p className="section-subtitle mx-auto">Our dashboards give you complete visibility and control over your facility operations</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="gradient-dark rounded-2xl p-6 md:p-10 overflow-hidden">
              <div className="bg-gray-900 rounded-xl p-4 md:p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-sm ml-2 font-mono">Building Overview Dashboard</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 font-mono">
                    <span>Live</span>
                    <span>Updated: Just now</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-gray-400 text-xs mb-1">Energy Consumption</p>
                    <p className="text-white font-heading font-bold text-lg md:text-2xl">284.6 <span className="text-xs font-normal text-gray-400">kWh</span></p>
                    <p className="text-green-400 text-xs">↓ 12.3% vs yesterday</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-gray-400 text-xs mb-1">HVAC Status</p>
                    <p className="text-green-400 font-heading font-bold text-lg md:text-2xl">Optimal</p>
                    <p className="text-gray-400 text-xs">All zones nominal</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-gray-400 text-xs mb-1">Equipment Online</p>
                    <p className="text-white font-heading font-bold text-lg md:text-2xl">47/48</p>
                    <p className="text-yellow-400 text-xs">1 maintenance alert</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-gray-400 text-xs mb-1">Active Alarms</p>
                    <p className="text-red-400 font-heading font-bold text-lg md:text-2xl">2</p>
                    <p className="text-gray-400 text-xs">Both low priority</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-gray-400 text-xs mb-3">Energy Consumption (Last 24 Hours)</p>
                  <div className="flex items-end gap-1 md:gap-2 h-24 md:h-32">
                    {[30, 45, 35, 55, 70, 85, 65, 75, 90, 95, 80, 60, 50, 45, 55, 70, 85, 100, 95, 80, 65, 50, 40, 35].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-[#4CAF50] to-[#8BC34A] rounded-t transition-all duration-300 hover:opacity-80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-gray-400 text-xs mb-2">Equipment Status</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Chiller 1', status: 'Running' },
                        { name: 'AHU-3', status: 'Running' },
                        { name: 'FCU-7', status: 'Standby' },
                        { name: 'Pump-2', status: 'Fault' },
                      ].map((eq) => (
                        <div key={eq.name} className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">{eq.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            eq.status === 'Running' ? 'bg-green-900/50 text-green-400' :
                            eq.status === 'Standby' ? 'bg-yellow-900/50 text-yellow-400' :
                            'bg-red-900/50 text-red-400'
                          }`}>{eq.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-gray-400 text-xs mb-2">Active Alarms</p>
                    <div className="space-y-2">
                      {[
                        { alarm: 'High temp - Zone B', severity: 'Warning' },
                        { alarm: 'Filter maint - AHU-2', severity: 'Info' },
                      ].map((a) => (
                        <div key={a.alarm} className="flex items-start gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full mt-1 ${a.severity === 'Warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                          <div>
                            <p className="text-gray-300">{a.alarm}</p>
                            <p className="text-gray-500">{a.severity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-green-300 text-sm mt-6">*Illustrative dashboard showing real-time building intelligence capabilities</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dark text-center">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Start Your Project Journey</h2>
            <p className="text-green-200 mb-8 max-w-2xl mx-auto">Let&apos;s discuss how our proven process can deliver results for your facility</p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get Started <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
