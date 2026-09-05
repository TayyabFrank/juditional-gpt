import React from 'react'
import './About.css'

export default function About() {
  return (
    <div className="about-page py-1">
      <div className="container">
        
        {/* Header */}
        <div className="page-hero-header reveal-on-scroll reveal-fade-up">
          <span className="section-tag anim-float">OUR MISSION</span>
          <h1 className="section-main-title">About JudicialGPT</h1>
          <p className="section-description">
            Democratizing and accelerating access to justice through authoritative legal artificial intelligence.
          </p>
        </div>

        {/* Narrative */}
        <div className="about-narrative-card shimmer-card reveal-on-scroll reveal-fade-up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h2 className="fw-bold text-dark mb-3">Bridging Legal Tradition & Artificial Intelligence</h2>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.02rem' }}>
                JudicialGPT was born at the intersection of legal scholarship and computational linguistics. In Pakistan’s legal ecosystem, advocates spend hundreds of hours manually searching printed law digests (SCMR, PLD, CLC, YLR) and untangling complex amendments across overlapping statutes.
              </p>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.02rem' }}>
                We developed a zero-hallucination judicial copilot specifically designed for the nuances of Pakistani Common Law, Constitutional jurisprudence, and vernacular court languages—including Urdu, Balochi, Punjabi, and Sindhi.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="row g-3">
                <div className="col-6 reveal-on-scroll reveal-fade-up stagger-1">
                  <div className="mission-stat-box">
                    <h3 className="fw-bold text-success mb-1 stat-number">1947–2026</h3>
                    <small className="text-muted fw-semibold">Decades Indexed</small>
                  </div>
                </div>
                <div className="col-6 reveal-on-scroll reveal-fade-up stagger-2">
                  <div className="mission-stat-box">
                    <h3 className="fw-bold text-success mb-1 stat-number">5+</h3>
                    <small className="text-muted fw-semibold">Pakistani Languages</small>
                  </div>
                </div>
                <div className="col-6 reveal-on-scroll reveal-fade-up stagger-3">
                  <div className="mission-stat-box">
                    <h3 className="fw-bold text-success mb-1 stat-number">100%</h3>
                    <small className="text-muted fw-semibold">Zero-Hallucination Citations</small>
                  </div>
                </div>
                <div className="col-6 reveal-on-scroll reveal-fade-up stagger-4">
                  <div className="mission-stat-box">
                    <h3 className="fw-bold text-success mb-1 stat-number">2.4M+</h3>
                    <small className="text-muted fw-semibold">Judicial Rulings</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="row g-4 mb-3">
          <div className="col-md-4 reveal-on-scroll reveal-fade-up stagger-1">
            <div className="feature-glass-box shimmer-card">
              <div className="feature-icon-circle hover-icon-pop">
                <i className="bi bi-patch-check"></i>
              </div>
              <h3 className="feature-card-heading">Authoritative Precedence</h3>
              <p className="feature-card-text">
                Every statement generated is anchored directly into Supreme Court and High Court precedent with exact volume and page citations.
              </p>
            </div>
          </div>

          <div className="col-md-4 reveal-on-scroll reveal-fade-up stagger-2">
            <div className="feature-glass-box shimmer-card">
              <div className="feature-icon-circle hover-icon-pop">
                <i className="bi bi-globe2"></i>
              </div>
              <h3 className="feature-card-heading">Vernacular Inclusivity</h3>
              <p className="feature-card-text">
                Ensuring advocates across all provinces—Balochistan, Punjab, Sindh, Khyber Pakhtunkhwa, and Islamabad—can research with equal precision.
              </p>
            </div>
          </div>

          <div className="col-md-4 reveal-on-scroll reveal-fade-up stagger-3">
            <div className="feature-glass-box shimmer-card">
              <div className="feature-icon-circle hover-icon-pop">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h3 className="feature-card-heading">Chamber-Grade Privacy</h3>
              <p className="feature-card-text">
                Strict enterprise-grade confidentiality ensures confidential client documents and draft plaints are never stored or used for model training.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
