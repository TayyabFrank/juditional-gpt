import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AiTools.css'
import Tilt3D from '../../components/Tilt3D'

export default function AiTools({ onOpenModal }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('all')

  const handleAction = () => {
    if (isAuthenticated) {
      if (onOpenModal) onOpenModal()
    } else {
      navigate('/signup')
    }
  }

  const tools = [
    {
      id: 'precedent',
      category: 'research',
      icon: 'bi-search',
      title: 'Precedent Recommender',
      desc: 'Input key legal propositions from your plaint or written statement to retrieve the highest binding Supreme Court authorities directly on point.',
      tag: 'Supreme Court & High Courts'
    },
    {
      id: 'limitation',
      category: 'procedural',
      icon: 'bi-calendar-check',
      title: 'Limitation & Vacation Auditor',
      desc: 'Calculates limitation timelines for filing civil appeals, revisions, writ petitions, and leave to appeal under the Limitation Act 1908, factoring in court winter/summer vacations.',
      tag: 'Statutory Compliance'
    },
    {
      id: 'constitution',
      category: 'constitutional',
      icon: 'bi-bank2',
      title: 'Constitutional Bench Analyst',
      desc: 'Analyzes fundamental rights under Articles 8-28 of the 1973 Constitution, tracks 18th & 26th Amendment case law, and synthesizes constitutional bench ratios.',
      tag: 'High Court & SC Benches'
    },
    {
      id: 'drafter',
      category: 'drafting',
      icon: 'bi-pencil-square',
      title: 'Writ & Plaint Drafter',
      desc: 'Drafts petitions under Article 199, bail applications under Section 497/498 CrPC, and recovery plaints formatted to High Court Rules & Orders.',
      tag: 'Petition Automation'
    },
    {
      id: 'cross-exam',
      category: 'trial',
      icon: 'bi-question-diamond',
      title: 'Cross-Examination Strategist',
      desc: 'Generates structured cross-examination lines of questioning based on witness deposition statements under the Qanun-e-Shahadat Order 1984.',
      tag: 'Trial Practice'
    },
    {
      id: 'criminal-defense',
      category: 'criminal',
      icon: 'bi-shield-shaded',
      title: 'Criminal Charge Evaluator',
      desc: 'Assesses FIR contents against penal sections (PPC 302, 324, 380, 420) to identify procedural lacunas, police investigation delays, and grounds for quashment.',
      tag: 'Criminal Law'
    }
  ]

  const filteredTools = activeTab === 'all'
    ? tools
    : tools.filter((t) => t.category === activeTab)

  return (
    <div className="ai-tools-page-view py-1">
      <div className="container">

        {/* Header */}
        <div className="page-hero-header reveal-on-scroll reveal-fade-up">
          <span className="section-tag anim-float">SPECIALIZED TOOLKIT</span>
          <h1 className="section-main-title">AI Tools for the Pakistani Legal Profession</h1>
          <p className="section-description">
            Tailored AI utilities designed to automate precedent discovery, statutory audit, petition drafting, and trial strategy.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-3 reveal-on-scroll reveal-fade-up stagger-1">
          {['all', 'research', 'procedural', 'constitutional', 'drafting', 'trial', 'criminal'].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold filter-tab-btn ${activeTab === cat ? 'btn-success active-filter-tab' : 'btn-outline-secondary'
                }`}
              onClick={() => setActiveTab(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="row g-4 mb-3">
          {filteredTools.map((t, idx) => (
            <div key={t.id} className={`col-md-6 col-lg-4 reveal-on-scroll reveal-fade-up stagger-${(idx % 3) + 1}`}>
              <Tilt3D maxTilt={10} scale={1.03} perspective={1100} className="h-100">
                <div className="tool-suite-card shimmer-card h-100">
                  <div className="tool-header-icon hover-icon-pop">
                    <i className={`bi ${t.icon}`}></i>
                  </div>
                  <span className="badge bg-success bg-opacity-10 text-success border border-success-subtle mb-2 w-fit">
                    {t.tag}
                  </span>
                  <h3 className="feature-card-heading">{t.title}</h3>
                  <p className="feature-card-text">{t.desc}</p>
                  <button
                    className="tool-interactive-demo-btn mt-auto"
                    onClick={handleAction}
                  >
                    <span>Launch Tool</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </button>
                </div>
              </Tilt3D>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="p-4 rounded-4 glass-card text-center mb-1 reveal-on-scroll reveal-zoom-in">
          <h3 className="fw-bold mb-2">Need a custom AI tool for your law firm or chamber?</h3>
          <p className="text-muted mb-3">
            We integrate with private chamber files, case management systems, and specialized arbitral rules.
          </p>
          <button className="btn-emerald" onClick={handleAction}>
            <i className="bi bi-chat-dots-fill"></i>
            <span>Schedule Legal Tech Consultation</span>
          </button>
        </div>

      </div>
    </div>
  )
}
