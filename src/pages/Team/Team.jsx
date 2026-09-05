import React, { useState, useEffect } from 'react'
import './Team.css'
import Tilt3D from '../../components/Tilt3D'

export default function Team({ onOpenModal }) {
  const [selectedMember, setSelectedMember] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedMember(null)
      setIsClosing(false)
    }, 280)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedMember) {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMember])

  const teamMembers = [
    {
      id: 'usman',
      name: 'Prof Dr. Usman Ghani Khan',
      initials: 'UK',
      role: 'Founder',
      image: '/team/usman.jpeg',
      institution: 'NCAI & UET Lahore',
      experience: '20+ Years AI & Computer Science',
      specialties: ['AI Strategy', 'Machine Learning', 'Computer Vision', 'Executive Leadership'],
      desc: 'Founded JudicialGPT to make quality legal assistance accessible through AI. Sets company strategy, product vision, and partnerships while guiding the team to build trustworthy legal technology.'
    },
    {
      id: 'ayesha',
      name: 'Ayesha Azam',
      initials: 'AA',
      role: 'Team Lead',
      image: '/team/ayesha.png',
      institution: 'NCAI & National Center of AI',
      experience: 'Team & Project Management',
      specialties: ['Agile Delivery', 'Product Engineering', 'Sprint Planning', 'Cross-functional Collaboration'],
      desc: 'Coordinates engineering delivery, sprint planning, and cross-functional collaboration to ship reliable AI-powered legal features on time and at scale.'
    },
    {
      id: 'ali',
      name: 'Syed Ali Hassan',
      initials: 'AH',
      role: 'Lead Developer / AI Engineer',
      image: '/team/ali.jpg',
      institution: 'NCAI Legal Tech Lab',
      experience: 'Full-Stack & LLM Architecture',
      specialties: ['Platform Architecture', 'LLM Fine-Tuning', 'Document Parsing', 'Vector Search Pipelines'],
      desc: 'Architects the full-stack platform and fine-tunes AI models for legal document analysis, case summarization, and intelligent query responses.'
    },
    {
      id: 'laiba',
      name: 'Laiba Saleem',
      initials: 'LS',
      role: 'Data Analyst',
      image: '/team/laiba.png',
      institution: 'NCAI Data Intelligence',
      experience: 'Data Analytics & Model Insights',
      specialties: ['Dataset Patterns', 'Model Evaluation', 'User Engagement Metrics', 'Insight Dashboards'],
      desc: 'Analyzes user engagement metrics, legal dataset patterns, and AI model performance to drive data-informed product decisions and improvements.'
    },
    {
      id: 'zubaid',
      name: 'Zubaid Rasool',
      initials: 'ZR',
      role: 'Full-Stack & DevOps Engineer',
      image: '/team/zubaid.png',
      institution: 'NCAI Infrastructure Engineering',
      experience: 'Cloud & DevOps Engineering',
      specialties: ['CI/CD Pipelines', 'Cloud Deployments', 'Containerization', 'Scalable Backend APIs'],
      desc: 'Builds and maintains frontend and backend features while managing CI/CD pipelines, server infrastructure, and deployment workflows on the cloud.'
    },
    {
      id: 'nasir',
      name: 'Dr. Abdul Nasir',
      initials: 'AN',
      role: 'Legal Domain Expert',
      image: '/team/nasir.jpg',
      institution: 'Pakistan Legal Bar & Judicial Academia',
      experience: 'Senior Legal Practice & Research',
      specialties: ['Judicial Precedent Analysis', 'Court Practice Procedures', 'Statutory Verification', 'Legal Domain Alignment'],
      desc: 'A legal practitioner for providing judicial domain expertise to validate legal accuracy, guide court-relevant content, and ensure JudicialGPT meets professional standards.'
    }
  ]


  return (
    <div className="team-page py-1">
      <div className="container">

        {/* Header */}
        <div className="page-hero-header reveal-on-scroll reveal-fade-up">
          <span className="section-tag anim-float">LEADERSHIP & ADVISORS</span>
          <h1 className="section-main-title">The Minds Behind JudicialGPT</h1>
          <p className="section-description">
            A cross-disciplinary team of Supreme Court advocates, legal researchers, and artificial intelligence scientists at NCAI. Click on any team member to view their background.
          </p>
        </div>

        {/* Team Grid: Display All 6 Team Members */}
        <div className="row g-4 mb-3 justify-content-center">
          {teamMembers.map((m, idx) => (
            <div key={m.id} className={`col-12 col-sm-6 col-lg-4 reveal-on-scroll reveal-fade-up stagger-${(idx % 3) + 1}`}>
              <Tilt3D maxTilt={0} scale={1.04} perspective={900} glare={false} className="h-100">
                <div
                  className="team-card-minimal shimmer-card"
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
                  {/* 1. Pic / Avatar with Animated Halo & Radar */}
                  <div className="team-pic-container">
                    <div className="team-pic-halo-spinner"></div>
                    <div className="team-pic-radar-pulse"></div>
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
                      <span className="badge-radar-ping"></span>
                      <i className="bi bi-eye-fill"></i>
                    </div>
                  </div>

                  {/* 2. Name with Animated Underline */}
                  <div className="team-name-wrapper text-center">
                    <h4 className="team-member-name mb-1">{m.name}</h4>
                    <span className="team-member-role-badge" style={{ fontSize: '0.84rem', color: '#059669', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                      {m.role}
                    </span>
                    <div className="team-name-underline"></div>
                  </div>

                  {/* Micro-interaction Hover Tag */}
                  <div className="team-card-hover-tag">
                    <i className="bi bi-sparkles text-success me-1"></i>
                    <span>View Details</span>
                  </div>
                </div>
              </Tilt3D>
            </div>
          ))}
        </div>

        {/* Details Modal on Picture Click */}
        {selectedMember && (
          <div
            className={`team-modal-backdrop ${isClosing ? 'closing' : ''}`}
            onClick={handleCloseModal}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={`team-modal-dialog ${isClosing ? 'closing' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="team-modal-close-btn"
                onClick={handleCloseModal}
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
                        <span key={idx} className="expertise-pill-tag" style={{ '--pill-idx': idx }}>
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
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success rounded-pill px-4 fw-bold shadow-sm"
                      onClick={() => {
                        handleCloseModal()
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
        <div className="p-4 rounded-4 glass-card text-center mb-1 reveal-on-scroll reveal-zoom-in">
          <span className="section-tag anim-float">ACADEMIC & JUDICIAL COLLABORATION</span>
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
