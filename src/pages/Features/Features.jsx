import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Features.css'
import Tilt3D from '../../components/Tilt3D'

export default function Features({ onOpenModal }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleTryFree = () => {
    if (isAuthenticated) {
      if (onOpenModal) onOpenModal()
    } else {
      navigate('/signup')
    }
  }

  const featureList = [
    {
      badge: 'Database & Reports',
      icon: 'bi-journal-check',
      title: '2.4M+ Verified Case Law Repository',
      description: 'Instant full-text semantic searching across Supreme Court of Pakistan (SCMR) decisions, Federal Shariat Court rulings, and High Court law reports (PLD, CLC, YLR, PTD, MLD) from 1947 to present.',
      bullets: [
        'Automated ratio decidendi extraction',
        'Overruled and distinguished precedent warnings',
        'Headnotes and judgment summary generation'
      ]
    },
    {
      badge: 'Vernacular NLP',
      icon: 'bi-translate',
      title: 'Native Regional Language Legal AI',
      description: 'Formulate questions, upload Urdu petitions, or search in English, Urdu, Balochi, Punjabi, and Sindhi. The AI interprets legal maxims, archaic terminology, and local court idioms accurately.',
      bullets: [
        'Multilingual query translation with legal precision',
        'Recognition of Arabic and Persian legal phrases',
        'Urdu Nastaliq and standard Arabic script display'
      ]
    },
    {
      badge: 'Accuracy Standard',
      icon: 'bi-shield-check',
      title: 'Zero-Hallucination Citation Verification',
      description: 'Strict retrieval-augmented architecture guarantees that every precedent, section, and article cited links to real, verifiable Pakistani statutory volumes and official law reports.',
      bullets: [
        'Pinpoint paragraph and page references',
        'Verification of active statutory amendments',
        'Direct links to primary legal texts'
      ]
    },
    {
      badge: 'Court Documents',
      icon: 'bi-file-earmark-diff',
      title: 'Litigation Brief & Petition Drafter',
      description: 'Transform client facts and evidence into structured High Court writ petitions (Article 199), civil appeals, pre-arrest bail pleas under 498 CrPC, and formal legal notices.',
      bullets: [
        'Form templates complying with High Court Rules & Orders',
        'Automated grounds and prayer clause drafting',
        'Export to MS Word (.docx) and PDF'
      ]
    },
    {
      badge: 'Procedural Audit',
      icon: 'bi-calendar2-range',
      title: 'Automated Limitation & Vacation Calculator',
      description: 'Never miss a filing deadline. Computes appeal, review, and revision limitation timelines under the Limitation Act 1908, factoring in court winter/summer vacations and certified copy obtaining intervals.',
      bullets: [
        'Section 5 condonation of delay viability checks',
        'Appellate court jurisdiction boundaries',
        'Court fee and stamp duty calculations'
      ]
    },
    {
      badge: 'Constitutional',
      icon: 'bi-bank',
      title: 'Constitutional Bench Jurisprudence Analysis',
      description: 'Dedicated focus on Articles 8 to 28 (Fundamental Rights), the 18th & 26th Constitutional Amendments, and landmark public interest litigation rulings.',
      bullets: [
        'Suo motu jurisdiction historical precedent lookup',
        'Federal vs Provincial legislative competence maps',
        'Detailed bench breakdown and dissenting opinions'
      ]
    }
  ]

  return (
    <div className="features-page-view py-1">
      <div className="container">

        {/* Header Matching Screenshot */}
        <div className="features-header-block text-center reveal-on-scroll reveal-fade-up">
          <div className="features-pill-badge anim-float">
            <span className="features-pill-dot"></span>
            <span>FEATURES</span>
          </div>
          <h2 className="features-main-heading">
            <span className="heading-line-dark">Innovative Features That </span>
            <span className="heading-line-green">Redefine Legal Assistance</span>
          </h2>
          <p className="features-subtitle-text">
            Powered by advanced AI technology trained on millions of legal documents, delivering accurate and reliable legal intelligence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="row g-4 mt-1 mb-3">
          {featureList.map((item, idx) => (
            <div key={idx} className={`col-md-6 col-lg-4 reveal-on-scroll reveal-fade-up stagger-${(idx % 3) + 1}`}>
              <Tilt3D maxTilt={8} scale={1.02} perspective={1000} className="h-100">
                <div className="feature-detail-card shimmer-card">
                  <span className="feature-badge-label">{item.badge}</span>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="feature-icon-circle-lg hover-icon-pop">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <h3 className="feature-card-heading mb-0">{item.title}</h3>
                  </div>
                  <p className="feature-card-text">{item.description}</p>

                  <ul className="feature-list-bullet">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="feature-bullet-item">
                        <i className="bi bi-check-circle-fill bullet-check-icon"></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3D>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-4 rounded-4 text-center glass-card mt-3 mb-1 reveal-on-scroll reveal-zoom-in">
          <h2 className="fw-bold mb-3 text-dark">Ready to elevate your legal research?</h2>
          <p className="text-muted max-w-600 mx-auto mb-4">
            Try our interactive assistant now or explore how JudicialGPT seamlessly searches statutes, precedents, and court records.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
            <button className="btn-emerald" onClick={handleTryFree}>
              <i className="bi bi-robot"></i>
              <span>Try AI Assistant Free</span>
            </button>
            <a href="#ai-tools" className="btn-secondary-emerald">
              <i className="bi bi-stars"></i>
              <span>Explore AI Tools</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
