import React, { useState } from 'react'
import './Team.css'

export default function Team({ onOpenModal }) {
  const [selectedMember, setSelectedMember] = useState(null)

  const teamMembers = [
    {
      id: 'zafarullah',
      name: 'Barrister Zafarullah Khan',
      initials: 'ZK',
      role: 'Lead Jurisprudence Advisor',
      image: '/team/zafarullah.jpg',
      institution: 'Lincoln’s Inn / Supreme Court of Pakistan',
      experience: '28+ Years Senior Advocate',
      specialties: ['Constitutional Law', 'Appellate Litigation', 'Judicial Precedent Ratios', 'Statutory Interpretation'],
      desc: 'Former Advocate General & Supreme Court Senior Advocate with 28+ years arguing constitutional, administrative, and corporate appeals before the Supreme Court of Pakistan. Guides the JudicialGPT reasoning engine on precedent hierarchy, ratio decidendi validation, and common law doctrine.'
    },
    {
      id: 'tariq',
      name: 'Dr. Tariq Mahmood',
      initials: 'TM',
      role: 'Chief AI Architect & NLP Director',
      image: '/team/tariq.jpg',
      institution: 'NCAI & National Center of AI',
      experience: '18+ Years in Machine Learning',
      specialties: ['Bilingual Legal NLP', 'Urdu Semantic Embeddings', 'RAG Neural Pipelines', 'Hallucination Mitigation'],
      desc: 'PhD in Natural Language Processing, specialized in bilingual Urdu-English semantic embeddings and retrieval-augmented neural models. Designed the foundational vector indexing architecture over 2.4 million Pakistani reported judicial volumes.'
    },
    {
      id: 'ayesha',
      name: 'Ayesha Siddiqua',
      initials: 'AS',
      role: 'Head of Legal Informatics',
      image: '/team/ayesha.jpg',
      institution: 'Harvard Law School / HCBA',
      experience: '12+ Years Legal Practice & Research',
      specialties: ['Legal Corpus Curation', 'Ratio Decidendi Tagging', 'High Court Rules & Orders', 'Ethical Legal AI'],
      desc: 'LLM from Harvard Law School; leads corpus curation, ratio decidendi annotation, and statutory verification pipelines. Spearheads collaboration with High Court Bar Associations and ensures chamber-grade ethical compliance.'
    },
    {
      id: 'bilal',
      name: 'Bilal Ahmad Farooqi',
      initials: 'BF',
      role: 'Principal Systems Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      institution: 'Fast-NUCES Legal Tech Lab',
      experience: '10+ Years Distributed Systems',
      specialties: ['Sub-Second Legal Retrieval', 'OCR Digitization Tuning', 'Distributed Indexing', 'Confidential Cloud Enclaves'],
      desc: 'Specialist in low-latency distributed search indexing 2.4 million scanned judicial PDF records with OCR accuracy tuning. Architected the high-throughput RAG search infrastructure powering sub-second case law retrieval.'
    }
  ]

  return (
    <div className="team-page py-4">
      <div className="container">

        {/* Header */}
        <div className="page-hero-header">
          <span className="section-tag">LEADERSHIP & ADVISORS</span>
          <h1 className="section-main-title">The Minds Behind JudicialGPT</h1>
          <p className="section-description">
            A cross-disciplinary team of Supreme Court advocates, legal researchers, and artificial intelligence scientists at NCAI. Click on any team member to view their background.
          </p>
        </div>

        {/* Team Grid: ONLY Display Pic and Name */}
        <div className="row g-4 mb-5 justify-content-center">
          {teamMembers.map((m) => (
            <div key={m.id} className="col-sm-6 col-lg-3">
              <div
                className="team-card-minimal"
                onClick={() => setSelectedMember(m)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedMember(m)
                  }
                }}
                title={`Click to read details of ${m.name}`}
              >
                {/* 1. Pic / Avatar */}
                <div className="team-pic-container">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="team-member-pic"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex'
                      }
                    }}
                  />
                  <div className="team-member-fallback-initials" style={{ display: 'none' }}>
                    {m.initials}
                  </div>
                  <div className="team-pic-badge" title="Click to view details">
                    <i className="bi bi-eye-fill"></i>
                  </div>
                </div>

                {/* 2. Name */}
                <h4 className="team-member-name mb-0">{m.name}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Details Modal on Picture Click */}
        {selectedMember && (
          <div
            className="team-modal-backdrop"
            onClick={() => setSelectedMember(null)}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="team-modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="team-modal-close-btn"
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <div className="team-modal-inner">
                {/* Left Side: Avatar & Badges */}
                <div className="team-modal-aside">
                  <div className="team-modal-pic-box">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="team-modal-pic"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = 'flex'
                        }
                      }}
                    />
                    <div className="team-member-fallback-initials team-large-initials" style={{ display: 'none' }}>
                      {selectedMember.initials}
                    </div>
                  </div>

                  <div className="team-modal-badges">
                    <div className="team-modal-badge">
                      <i className="bi bi-mortarboard-fill text-success"></i>
                      <span>{selectedMember.institution}</span>
                    </div>
                    <div className="team-modal-badge">
                      <i className="bi bi-shield-check text-success"></i>
                      <span>{selectedMember.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Full Details */}
                <div className="team-modal-main">
                  <span className="team-modal-working-tag">{selectedMember.role}</span>
                  <h3 className="team-modal-heading-name">{selectedMember.name}</h3>

                  <div className="team-modal-detail-block">
                    <h5 className="detail-section-title">
                      <i className="bi bi-person-lines-fill me-2 text-success"></i>
                      Professional Overview
                    </h5>
                    <p className="detail-narrative-text">{selectedMember.desc}</p>
                  </div>

                  <div className="team-modal-detail-block">
                    <h5 className="detail-section-title">
                      <i className="bi bi-award-fill me-2 text-success"></i>
                      Areas of Expertise
                    </h5>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {selectedMember.specialties.map((item, idx) => (
                        <span key={idx} className="expertise-pill-tag">
                          <i className="bi bi-check2 text-success me-1"></i>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="team-modal-actions mt-4 pt-3 border-top d-flex gap-3 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill px-4 fw-semibold"
                      onClick={() => setSelectedMember(null)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success rounded-pill px-4 fw-bold shadow-sm"
                      onClick={() => {
                        setSelectedMember(null)
                        if (onOpenModal) onOpenModal()
                      }}
                    >
                      <i className="bi bi-chat-dots-fill me-1"></i> Connect with Counsel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research Collaboration Callout */}
        <div className="p-5 rounded-4 glass-card text-center mb-4">
          <span className="section-tag">ACADEMIC & JUDICIAL COLLABORATION</span>
          <h3 className="fw-bold mt-2 mb-3">Partner With Our Legal Tech Lab</h3>
          <p className="text-muted max-w-600 mx-auto mb-4">
            We partner with High Court Bar Associations, Law Faculties, and judicial academies across Pakistan to advance legal informatics.
          </p>
          <button className="btn-emerald" onClick={onOpenModal}>
            <i className="bi bi-envelope-check-fill"></i>
            <span>Inquire for Collaboration</span>
          </button>
        </div>

      </div>
    </div>
  )
}
