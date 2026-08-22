import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using Formspree.io for email forwarding (no backend required)
      const response = await fetch('https://formspree.io/f/moeabrpr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Portfolio Contact: ${formData.subject}`
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/" className="text-xs text-signal-cyan hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-16">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="font-display text-4xl sm:text-5xl font-700 text-white mb-4">
          Connect With Me
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Have questions about DevSecOps, vulnerability management, or security automation? 
          Let's connect and collaborate!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="panel p-8 hover-glow">
          <h2 className="font-display text-2xl font-600 text-white mb-6">Send me a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-void-panel border border-void-line rounded-sm text-white placeholder-slate-500 focus:border-signal-cyan focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Your Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-void-panel border border-void-line rounded-sm text-white placeholder-slate-500 focus:border-signal-cyan focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="e.g., DevSecOps Consulting"
                className="w-full px-4 py-2 bg-void-panel border border-void-line rounded-sm text-white placeholder-slate-500 focus:border-signal-cyan focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project or inquiry..."
                rows="5"
                className="w-full px-4 py-2 bg-void-panel border border-void-line rounded-sm text-white placeholder-slate-500 focus:border-signal-cyan focus:outline-none transition-colors resize-none"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 rounded-sm bg-signal-green/10 border border-signal-green/40 text-signal-green text-sm">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 rounded-sm bg-signal-red/10 border border-signal-red/40 text-signal-red text-sm">
                ✗ Error sending message. Please try again or contact me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-console card-shine disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info & Links */}
        <div className="space-y-6">
          {/* Direct Email */}
          <div className="panel p-8 hover-glow border-signal-cyan/20">
            <h3 className="font-display text-xl font-600 text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">📧</span>
              Email
            </h3>
            <p className="text-slate-400 mb-3 text-sm">
              Send me an email directly
            </p>
            <a
              href="mailto:pravinpatil3096@gmail.com"
              className="inline-block btn-console card-shine"
            >
              pravinpatil3096@gmail.com
            </a>
          </div>

          {/* LinkedIn */}
          <div className="panel p-8 hover-glow border-signal-green/20">
            <h3 className="font-display text-xl font-600 text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">💼</span>
              LinkedIn
            </h3>
            <p className="text-slate-400 mb-3 text-sm">
              Connect with me on professional network
            </p>
            <a
              href="https://www.linkedin.com/in/pravin-pp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-console card-shine !border-signal-green/40 !text-signal-green"
            >
              Visit LinkedIn Profile ↗
            </a>
          </div>

          {/* GitHub */}
          <div className="panel p-8 hover-glow border-signal-amber/20">
            <h3 className="font-display text-xl font-600 text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              GitHub
            </h3>
            <p className="text-slate-400 mb-3 text-sm">
              View my security projects and scripts
            </p>
            <a
              href="https://github.com/pravin0408"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-console card-shine !border-signal-amber/40 !text-signal-amber"
            >
              View GitHub ↗
            </a>
          </div>

          {/* Response Time */}
          <div className="panel p-6 bg-signal-cyan/5 border-signal-cyan/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">Response Time</h4>
                <p className="text-xs text-slate-400">
                  I typically respond to inquiries within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics I Discuss */}
      <div className="mt-16 panel p-8 hover-glow">
        <h2 className="font-display text-2xl font-600 text-white mb-6">Topics I Can Help With</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '{ }', label: 'SAST & Code Security', color: 'cyan' },
            { icon: '⚡', label: 'DAST & Web App Testing', color: 'green' },
            { icon: '🔍', label: 'Penetration Testing', color: 'amber' },
            { icon: '🔒', label: 'DevSecOps & CI/CD', color: 'cyan' },
            { icon: '🛡️', label: 'Vulnerability Management', color: 'green' },
            { icon: '📋', label: 'Compliance & CIS Benchmarks', color: 'amber' },
            { icon: '🤖', label: 'LLM Security & AI', color: 'cyan' },
            { icon: '⚠️', label: 'OWASP Top 10', color: 'green' },
            { icon: '🔐', label: 'Security Architecture', color: 'amber' },
          ].map((topic) => (
            <div key={topic.label} className={`border border-signal-${topic.color}/30 rounded-sm p-4 hover:border-signal-${topic.color}/60 transition-colors`}>
              <div className="text-2xl mb-2">{topic.icon}</div>
              <div className="text-sm font-semibold text-white">{topic.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
