'use client'

import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { MapPin, Phone, Mail, Globe, ArrowRight } from '@/components/Icons'

const services = [
  'Building Management System (BMS)',
  'HVAC Integration',
  'Environmental Monitoring (EMS)',
  'Energy Monitoring (EnMS)',
  'Chiller Plant Manager (CPM)',
  'IAQ Monitoring',
  'Control Panels',
  'HMI Solutions',
  'AMC & CMC Services',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [serverMsg, setServerMsg] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setServerMsg('')
    const hpValue = e.target.elements.hpCheck?.value || ''
    if (hpValue) {
      setStatus('success')
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _hp: hpValue,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setServerMsg(data.error || 'We could not send your message right now. Please try again or contact us directly at sales@pid-controls.com.')
      }
    } catch {
      setStatus('error')
      setServerMsg('We could not send your message right now. Please try again or contact us directly at sales@pid-controls.com.')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Let's Build Smarter, More Efficient Facilities Together" />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="card">
                <h2 className="font-heading font-bold text-2xl text-[#0B3D24] mb-6">Request a Quote / Consultation</h2>
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#0B3D24] mb-2">Thank You!</h3>
                    <p className="text-gray-600">Thank you. Your message has been sent successfully. Our team will contact you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <input type="text" name="hpCheck" tabIndex={-1} autoComplete="new-password" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name *</label>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors`}
                          placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                        {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company">Company</label>
                        <input type="text" id="company" name="company" value={form.company} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                          placeholder="Company name" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email *</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors`}
                          placeholder="email@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                        {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                          placeholder="+91 1234567890" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">Service Interested In</label>
                      <select id="service" name="service" value={form.service} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors bg-white">
                        <option value="">Select a service...</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message *</label>
                      <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors resize-none`}
                        placeholder="Tell us about your project requirements..." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
                      {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    {status === 'error' && serverMsg && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm" role="alert" aria-live="assertive">
                        {serverMsg}
                      </div>
                    )}
                    <button type="submit" disabled={status === 'sending'}
                      className="btn-primary w-full justify-center text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                      {status === 'sending' ? 'Sending...' : 'Send Inquiry'} <ArrowRight />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Info + Map */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#0B3D24] mb-6">Get in Touch</h2>
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg gradient-green flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0B3D24]">Office Address</h3>
                        <p className="text-gray-600 text-sm mt-1">2-3-703/1/A/37/1/2, 2nd Floor, Tirumala Nagar, Quadribagh Lane, Maruthi Nagar, Amberpet, Hyderabad, Telangana 500013</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg gradient-green flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0B3D24]">Phone</h3>
                        <a href="tel:+918317639869" className="text-[#4CAF50] hover:text-[#388E3C] text-sm mt-1 block">+91 8317639869</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg gradient-green flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0B3D24]">Email</h3>
                        <a href="mailto:sales@pid-controls.com" className="text-[#4CAF50] hover:text-[#388E3C] text-sm mt-1 block">sales@pid-controls.com</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg gradient-green flex items-center justify-center shrink-0">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0B3D24]">Website</h3>
                        <a href="https://www.pid-controls.com" target="_blank" rel="noopener noreferrer" className="text-[#4CAF50] hover:text-[#388E3C] text-sm mt-1 block">www.pid-controls.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.654!2d78.5125!3d17.3888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzE5LjciTiA3OMKwMzAnNDUuMCJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%" height="280" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="PID Controls Office Location"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
