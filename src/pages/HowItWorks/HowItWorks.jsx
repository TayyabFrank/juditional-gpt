import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './HowItWorks.css'

export default function HowItWorks({ onOpenModal }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleAction = () => {
    if (isAuthenticated) {
      if (onOpenModal) onOpenModal()
    } else {
      navigate('/signup')
    }
  }

  const steps = [
    {
      num: '01',
      title: 'Formulate Case Facts or Procedural Query',
      desc: 'Type your factual proposition, legal dispute, or statutory question in English, Urdu, Balochi, Punjabi, or Sindhi. You can also paste excerpts from trial court orders or witness statements.',
      highlights: [
        'Natural conversational phrasing',
        'Automatic language & script recognition',
        'Identifies civil, criminal, constitutional, or revenue domain'
      ]
    },
    {
      num: '02',
      title: 'Neural Statutory & Precedent Vector Retrieval',
      desc: 'JudicialGPT maps your inquiry against high-dimensional embeddings indexing 2.4M+ Pakistani case reports, checking ratio decidendi and distinguishing obiter dicta.',
      highlights: [
        'Filters Supreme Court vs High Court hierarchy',
        'Eliminates repealed acts and outdated precedents',
        'Multi-vector parallel legal indexing'
      ]
    },
    {
      num: '03',
      title: 'Zero-Hallucination Jurisprudential Synthesis',
      desc: 'The reasoning engine generates a comprehensive legal memorandum, formulating the issue, stating the binding rule of law, and providing pin-point paragraph citations.',
      highlights: [
        'Court-ready citation formatting (e.g. 2023 SCMR 1045)',
        'Synthesizes conflicting High Court rulings',
        'Highlights strategic counter-arguments for trial'
      ]
    }
  ]

  return (
    <div className="how-it-works-page py-1">
      <div className="container">
        
        {/* Header */}
        <div className="page-hero-header reveal-on-scroll reveal-fade-up">
          <span className="section-tag anim-float">METHODOLOGY & PIPELINE</span>
          <h1 className="section-main-title">How JudicialGPT Synthesizes Law</h1>
          <p className="section-description">
            A step-by-step walkthrough of our specialized Pakistani legal intelligence architecture.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="row g-4 mt-1 mb-3">
          {steps.map((s, idx) => (
            <div key={idx} className={`col-md-4 reveal-on-scroll reveal-fade-up stagger-${idx + 1}`}>
              <div className="workflow-timeline-card shimmer-card">
                <div className="step-circle-badge">
                  <span>{s.num}</span>
                  <div className="radar-ping-ring"></div>
                </div>
                <h3 className="feature-card-heading">{s.title}</h3>
                <p className="feature-card-text">{s.desc}</p>
                <ul className="feature-list-bullet">
                  {s.highlights.map((h, i) => (
                    <li key={i} className="feature-bullet-item">
                      <i className="bi bi-check-circle-fill bullet-check-icon"></i>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram Box */}
        <div className="pipeline-diagram-box mb-5 reveal-on-scroll reveal-zoom-in">
          <div className="text-center mb-4">
            <span className="section-tag">DEEP ARCHITECTURE</span>
            <h3 className="fw-bold text-dark mt-2">The JudicialGPT Reasoning Engine</h3>
            <p className="text-muted">High-assurance legal retrieval-augmented generation (RAG)</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-3 reveal-on-scroll reveal-fade-up stagger-1">
              <div className="pipeline-node-card p-3 bg-white rounded-4 border shadow-sm h-100">
                <i className="bi bi-person-lines-fill fs-2 text-success mb-2 d-block hover-icon-pop"></i>
                <h6 className="fw-bold">1. Legal Prompt</h6>
                <small className="text-muted">English or 4 Regional Pakistani Languages</small>
              </div>
            </div>
            <div className="col-md-3 reveal-on-scroll reveal-fade-up stagger-2">
              <div className="pipeline-node-card p-3 bg-white rounded-4 border shadow-sm h-100">
                <i className="bi bi-search fs-2 text-success mb-2 d-block hover-icon-pop"></i>
                <h6 className="fw-bold">2. Law Library Index</h6>
                <small className="text-muted">SCMR, PLD, CLC, Federal Acts 1836–2026</small>
              </div>
            </div>
            <div className="col-md-3 reveal-on-scroll reveal-fade-up stagger-3">
              <div className="pipeline-node-card p-3 bg-white rounded-4 border shadow-sm h-100">
                <i className="bi bi-cpu-fill fs-2 text-success mb-2 d-block hover-icon-pop"></i>
                <h6 className="fw-bold">3. Precedent Verification</h6>
                <small className="text-muted">Hierarchical authority & overruling checks</small>
              </div>
            </div>
            <div className="col-md-3 reveal-on-scroll reveal-fade-up stagger-4">
              <div className="pipeline-node-card p-3 bg-white rounded-4 border shadow-sm h-100">
                <i className="bi bi-check-all fs-2 text-success mb-2 d-block hover-icon-pop"></i>
                <h6 className="fw-bold">4. Court Draft</h6>
                <small className="text-muted">Memorandum with verified citations</small>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="text-center mb-1 reveal-on-scroll reveal-fade-up">
          <button className="btn-emerald fs-6" onClick={handleAction}>
            <i className="bi bi-play-circle-fill"></i>
            <span>Test the Search Pipeline Live</span>
          </button>
        </div>

      </div>
    </div>
  )
}
