import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Home.css'
import Tilt3D from '../../components/Tilt3D'
import Features from '../Features/Features'
import HowItWorks from '../HowItWorks/HowItWorks'
import AiTools from '../AiTools/AiTools'
import Team from '../Team/Team'
import About from '../About/About'

const LANGUAGES = [
  {
    id: 'en',
    label: 'en English',
    dir: 'ltr',
    query: 'What are the legal consequences of breaching a contract in Pakistan, and can a court order specific performance?',
    answer: 'Under Pakistani law, breaching a contract exposes the defaulting party to two primary remedies: compensatory damages under Section 73 of the Contract Act 1872, or a decree of specific performance under the Specific Relief Act 1877. Damages are awarded when the loss is a natural consequence of the breach or was foreseeable at the time the contract was formed. Specific performance, which compels the breaching party to fulfil their exact obligations, is granted when monetary compensation is inadequate, such as in contracts for immovable property or unique goods.'
  },
  {
    id: 'ur',
    label: 'اردو PK',
    dir: 'rtl',
    query: 'پاکستان میں معاہدے کی خلاف ورزی کے قانونی نتائج کیا ہیں، اور کیا عدالت تعمیلِ مختص کا حکم دے سکتی ہے؟',
    answer: 'پاکستانی قانون کے مطابق، معاہدے کی خلاف ورزی پر نادہندہ فریق کے خلاف دو بنیادی چارہ جوئیاں حاصل ہیں: کنٹریکٹ ایکٹ 1872 کی دفعہ 73 کے تحت ہرجانہ، یا اسپیسیفک ریلیف ایکٹ 1877 کے تحت تعمیلِ مختص کی ڈگری۔ ہرجانہ اس وقت دیا جاتا ہے جب نقصان خلاف ورزی کا قدرتی نتیجہ ہو۔ تعمیلِ مختص، جس میں عدالت معاہدہ پورا کرنے پر مجبور کرتی ہے، تب دی جاتی ہے جب مالی ہرجانہ ناکافی ہو، جیسا کہ غیر منقولہ جائیداد میں۔ سپریم کورٹ نے PLD 2023 SC 145 میں واضح کیا۔'
  },
  {
    id: 'ba',
    label: 'بلوچی PK',
    dir: 'rtl',
    query: 'پاکستان ء معاہدے شکنئی کے قانونی نتیجہ انت، و آیا عدالت خاص اجرا ء حکم دئے سگیت؟',
    answer: 'پاکستانی قانون ءِ تہا، معاہدہ پروشگ ءِ نتیجہ ءَ دو بنیادی چارہ جوئی است انت: کانودِ معاہدہ 1872 ءِ دفعہ 73 ءِ رد ءَ تاوان، یا سپیسفک ریلیف ایکٹ 1877 ءِ رد ءَ خاص اجرا ءِ پرمان۔ تاوان ہمے وہد ءَ دئیگ بیت وہدے کہ تاوان معاہدہ شکنئی ءِ قدرتی نتیجہ بہ بیت۔ خاص اجرا ہمے وہد ءَ دئیگ بیت وہدے کہ مالی تاوان بس نہ بیت، چوش کہ ڈگار ءُ غیر منقولہ جائیداد ءِ معاملہاں۔'
  },
  {
    id: 'pa',
    label: 'پنجابی PK',
    dir: 'rtl',
    query: 'پاکستان وچ معاہدے دی خلاف ورزی دے کیہ قانونی نتیجے ہوندے نیں، تے کیہ عدالت خاص کارکردگی دا حکم دے سکدی اے؟',
    answer: 'پاکستانی قانون دے مطابق، معاہدے دی خلاف ورزی اُتے دو مکھ اپائے ملدے نیں: کنٹریکٹ ایکٹ 1872 دی دفعہ 73 تحت ہرجانہ، یا اسپیسیفک ریلیف ایکٹ 1877 تحت خاص کارکردگی دا ڈگری۔ ہرجانہ اودوں دتا جاندا اے جدوں نقصان خلاف ورزی دا قدرتی نتیجہ ہووے۔ خاص کارکردگی، جس وچ عدالت خلاف ورزی کرن والے نوں معاہدہ پورا کرن اُتے مجبور کردی اے، اودوں دتی جاندی اے جدوں مالی ہرجانہ ناکافی ہووے، جیویں غیر منقولہ جائیداد دے معاملیاں وچ۔'
  },
  {
    id: 'sd',
    label: 'سنڌي 🌙',
    dir: 'rtl',
    query: 'پاڪستان ۾ معاهدي جي ڀڃڪڙي جا قانوني نتيجا ڇا آهن، ۽ ڇا عدالت خاص عملداري جو حڪم ڏئي سگهي ٿي؟',
    answer: 'پاڪستاني قانون موجب، معاهدي جي خلاف ورزي تي ٻه بنيادي تدارڪ حاصل آهن: ڪانٽريڪٽ ايڪٽ 1872 جي سيڪشن 73 هيٺ هرجاڻو، يا اسپيسفڪ رليف ايڪٽ 1877 هيٺ خاص عملداري جي ڊگري۔ نقصان تڏهن ڏنو ويندو آهي جڏهن قدرتي نتيجو هجي۔ خاص عملداري تڏهن ڏني وڃي ٿي جڏهن پئسن جو معاوضو ناڪافي هجي، جيئن اڻ چُر ملڪيت ۾۔'
  }
]

const HERO_MODES = [
  {
    id: 'case-analysis',
    title: 'Case Analysis',
    subtitle: 'Break down complex cases with AI-driven insights. Identify key facts, precedents, and arguments to strengthen your legal strategy faster.'
  },
  {
    id: 'document-review',
    title: 'Document Review',
    subtitle: 'Review contracts and legal documents in minutes, not hours. AI highlights risks, critical clauses, and compliance gaps with remarkable accuracy.'
  },
  {
    id: 'legal-research',
    title: 'Legal Research',
    subtitle: 'Search case law, statutes, and precedents in seconds. Our AI surfaces relevant authorities from millions of legal documents with precision.'
  },
  {
    id: 'legal-analysis',
    title: 'Legal Analysis',
    subtitle: 'Turn intricate legal questions into clear, structured analysis. Get issue breakdowns, applicable law, and actionable guidance instantly.'
  }
]

export default function Home({ onOpenModal }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleTryFree = () => {
    if (isAuthenticated) {
      if (onOpenModal) onOpenModal()
    } else {
      navigate('/signup')
    }
  }

  const [langIndex, setLangIndex] = useState(0)
  const [typedQuery, setTypedQuery] = useState('')
  const [typedAnswer, setTypedAnswer] = useState('')
  const [isQueryTyping, setIsQueryTyping] = useState(true)
  const [isAnswerTyping, setIsAnswerTyping] = useState(false)

  // Rotating Hero Feature Modes (Case Analysis -> Document Review -> Legal Research -> Legal Analysis)
  const [heroModeIndex, setHeroModeIndex] = useState(0)
  const [isHeroTransitioning, setIsHeroTransitioning] = useState(false)

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setIsHeroTransitioning(true)
      setTimeout(() => {
        setHeroModeIndex((prev) => (prev + 1) % HERO_MODES.length)
        setIsHeroTransitioning(false)
      }, 350)
    }, 4500)

    return () => clearInterval(heroInterval)
  }, [])

  const currentHeroMode = HERO_MODES[heroModeIndex] || HERO_MODES[0]

  const activeTimersRef = useRef([])

  const clearAllTimers = () => {
    activeTimersRef.current.forEach(timer => clearTimeout(timer))
    activeTimersRef.current = []
  }

  const addTimer = (fn, delay) => {
    const timer = setTimeout(fn, delay)
    activeTimersRef.current.push(timer)
    return timer
  }

  const runTypingCycle = (currentIndex) => {
    clearAllTimers()
    const targetLang = LANGUAGES[currentIndex]
    if (!targetLang) return

    addTimer(() => {
      setTypedQuery('')
      setTypedAnswer('')
      setIsQueryTyping(true)
      setIsAnswerTyping(false)

      const queryText = targetLang.query
      const answerText = targetLang.answer

      // 1. Slow, elegant character-by-character question typing
      let qIdx = 0
      const typeNextQueryChar = () => {
        if (qIdx <= queryText.length) {
          setTypedQuery(queryText.slice(0, qIdx))
          qIdx++
          const delay = 30 + Math.random() * 16
          addTimer(typeNextQueryChar, delay)
        } else {
          setIsQueryTyping(false)
          setIsAnswerTyping(true)
          addTimer(startTypingAnswer, 400)
        }
      }

      // 2. Slow, readable answer typing
      const startTypingAnswer = () => {
        let aIdx = 0
        const typeNextAnswerChar = () => {
          if (aIdx <= answerText.length) {
            aIdx++
            setTypedAnswer(answerText.slice(0, aIdx))

            if (aIdx < answerText.length) {
              const delay = 25 + Math.random() * 12
              addTimer(typeNextAnswerChar, delay)
            } else {
              setIsAnswerTyping(false)
              addTimer(() => {
                setLangIndex((prev) => (prev + 1) % LANGUAGES.length)
              }, 5000)
            }
          }
        }
        typeNextAnswerChar()
      }

      addTimer(typeNextQueryChar, 150)
    }, 0)
  }

  useEffect(() => {
    runTypingCycle(langIndex)
    return () => clearAllTimers()
  }, [langIndex])

  const handleSelectLanguage = (targetIdx) => {
    if (targetIdx === langIndex) return
    setLangIndex(targetIdx)
  }

  const currentLang = LANGUAGES[langIndex] || LANGUAGES[0]
  const isRtl = currentLang.dir === 'rtl'

  return (
    <div className="home-page-view">
      {/* HERO SECTION */}
      <section className="hero-wrapper" id="hero">
        <div className="hero-container-wide">
          <div className="row align-items-center g-4 g-xl-5">

            {/* LEFT COLUMN: Hero Title, Subtitle, CTA & Stats Bar */}
            <div className="col-lg-5 col-xl-5 ps-5">

              {/* AI Platform Badge */}
              <div className="ai-badge-pill">
                <span className="badge-sparkle">✨</span>
                <span>AI-Powered Judicial Intelligence Platform</span>
                <span className="badge-status-dot"></span>
              </div>

              {/* Dynamic Serif Typography: JudicialGPT for [Case Analysis / Document Review / Legal Research / Legal Analysis] */}
              <div className="hero-heading">
                <span className="heading-line-1">JudicialGPT</span>
                <span className="heading-line-2"><center>for</center></span>
                <span className={`heading-line-3 ${isHeroTransitioning ? 'fade-out' : 'fade-in'}`}>
                  {currentHeroMode.title}
                </span>
              </div>

              {/* Dynamic Subtitle Matching judicialgpt.org */}
              <p className={`hero-subtext ${isHeroTransitioning ? 'fade-out' : 'fade-in'}`}>
                {currentHeroMode.subtitle}
              </p>

              {/* Hero CTA Button */}
              <div>
                <button className="btn-hero-assistant" onClick={handleTryFree}>
                  <i className="bi bi-robot fs-5"></i>
                  <span>Try AI Assistant Free</span>
                  <i className="bi bi-arrow-right fs-5"></i>
                </button>
              </div>

              {/* Stats Glass Card with 3D Tilt */}
              <Tilt3D maxTilt={7} scale={1.02} perspective={900}>
                <div className="stats-strip-card">
                  <div className="stats-grid-layout">
                    <div className="stat-metric stat-metric-1">
                      <div className="stat-big">2.4M</div>
                      <div className="stat-desc">LEGAL DOCUMENTS</div>
                    </div>
                    <div className="stat-metric stat-metric-2">
                      <div className="stat-big">10K</div>
                      <div className="stat-desc">ACTIVE USERS</div>
                    </div>
                    <div className="stat-metric stat-metric-3">
                      <div className="stat-big">Highest</div>
                      <div className="stat-desc">BENCHMARK ACCURACY</div>
                    </div>
                    <div className="stat-metric stat-metric-4">
                      <div className="stat-big">24/7</div>
                      <div className="stat-desc">AI AVAILABILITY</div>
                    </div>
                  </div>
                </div>
              </Tilt3D>

            </div>

            {/* RIGHT COLUMN: Interactive 3D Tablet Mockup (Hidden on mobile) */}
            <div className="col-lg-7 col-xl-7 d-none d-lg-block">
              <Tilt3D maxTilt={5} scale={1.01} perspective={1400} className="w-100">
                <div className="mockup-outer-wrapper">
                  <div className="tablet-device-card">

                    {/* Tablet Top Bar: Language Tabs & Brand Seal */}
                    <div className="mockup-top-nav">
                      <div className="language-tabs-pill-row" role="tablist">
                        {LANGUAGES.map((item, idx) => (
                          <button
                            key={item.id}
                            className={`lang-button ${langIndex === idx ? 'active' : ''}`}
                            onClick={() => handleSelectLanguage(idx)}
                            role="tab"
                            aria-selected={langIndex === idx}
                          >
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Right Brand Seal */}
                      <div className="mockup-watermark-tag">
                        <i className="bi bi-bank2"></i>
                        <span>JUDICIALGPT</span>
                      </div>
                    </div>

                    {/* DYNAMIC CHILD AREA: Expanded Horizontally */}
                    <div className="tablet-body-dynamic">

                      {/* Child Question Box - Horizontally Stretched */}
                      <div className="mockup-search-container m-0">
                        <div className="mockup-search-box">

                          {/* LTR (English): Magnifying glass on LEFT */}
                          {!isRtl && (
                            <div className="search-icon-decor-left">
                              <i className="bi bi-search"></i>
                            </div>
                          )}

                          {/* RTL (Other languages): Arrow button on LEFT */}
                          {isRtl && (
                            <button
                              className="search-action-circle-btn-right"
                              title="Submit Legal Search"
                              aria-label="Submit search"
                            >
                              <i className="bi bi-arrow-right"></i>
                            </button>
                          )}

                          {/* Middle: Full Question Text */}
                          <div
                            className={`search-query-display-area ${isRtl ? 'rtl' : ''}`}
                          >
                            {typedQuery}
                            {isQueryTyping && <span className="blinking-cursor"></span>}
                          </div>

                          {/* LTR (English): Arrow button on RIGHT */}
                          {!isRtl && (
                            <button
                              className="search-action-circle-btn-right"
                              title="Submit Legal Search"
                              aria-label="Submit search"
                            >
                              <i className="bi bi-arrow-right"></i>
                            </button>
                          )}

                          {/* RTL (Other languages): Magnifying glass on RIGHT */}
                          {isRtl && (
                            <div className="search-icon-decor-left">
                              <i className="bi bi-search"></i>
                            </div>
                          )}

                        </div>
                      </div>

                      {/* Child Answer Box - Horizontally Stretched */}
                      <div className="mockup-response-container">
                        <div className="response-layout-row">

                          {/* LTR (English): Scales badge on LEFT */}
                          {!isRtl && (
                            <div className="mockup-floating-scale-badge-left" title="Judicial AI Verification">
                              <i className="bi bi-bank2"></i>
                            </div>
                          )}

                          {/* Dynamic Response panel */}
                          <div className="mockup-response-panel">
                            <div className={`response-live-text ${isRtl ? 'rtl' : ''}`}>
                              {typedAnswer}
                              {(isAnswerTyping || typedAnswer.length > 0) && (
                                <span className="blinking-cursor"></span>
                              )}
                            </div>
                          </div>

                          {/* RTL (Other languages): Scales badge on RIGHT */}
                          {isRtl && (
                            <div className="mockup-floating-scale-badge-left" title="Judicial AI Verification">
                              <i className="bi bi-bank2"></i>
                            </div>
                          )}

                        </div>
                      </div>

                    </div>

                    {/* Carousel Dots at Bottom of Mockup */}
                    <div className="mockup-carousel-indicator-bar">
                      {LANGUAGES.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          className={`carousel-indicator-dot ${langIndex === dotIdx ? 'active' : ''}`}
                          onClick={() => handleSelectLanguage(dotIdx)}
                          aria-label={`Switch to ${LANGUAGES[dotIdx].label}`}
                        ></button>
                      ))}
                    </div>

                  </div>
                </div>
              </Tilt3D>
            </div>

          </div>

          {/* Scroll To Explore Indicator */}
          <div className="scroll-indicator-container">
            <a
              href="#hero"
              className="scroll-indicator-link"
              onClick={(e) => { e.preventDefault(); window.scrollBy({ top: 350, behavior: 'smooth' }); }}
            >
              <span>SCROLL TO EXPLORE</span>
              <i className="bi bi-chevron-down"></i>
            </a>
          </div>

        </div>
      </section>

      {/* 6-ITEM FEATURE HIGHLIGHTS STRIP MATCHING REFERENCE DESIGN */}
      <section className="feature-highlights-strip-wrapper">
        <div className="container-fluid px-lg-4">
          <div className="feature-highlights-row">
            {/* 1. Open to All */}
            <div className="feature-highlight-item">
              <div className="highlight-icon-circle">
                <i className="bi bi-shield"></i>
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Open to All</span>
                <span className="highlight-desc">Ask Legal Questions</span>
              </div>
            </div>

            {/* 2. All-in-One */}
            <div className="feature-highlight-item">
              <div className="highlight-icon-circle">
                <i className="bi bi-bank2"></i>
              </div>
              <div className="highlight-text">
                <span className="highlight-title">All-in-One</span>
                <span className="highlight-desc">Judicial AI Platform</span>
              </div>
            </div>

            {/* 3. Multi-language */}
            <div className="feature-highlight-item">
              <div className="highlight-icon-circle">
                <i className="bi bi-globe"></i>
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Multi-language</span>
                <span className="highlight-desc">Coverage</span>
              </div>
            </div>

            {/* 4. Safe & Secure */}
            <div className="feature-highlight-item">
              <div className="highlight-icon-circle">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Safe & Secure</span>
                <span className="highlight-desc">Ad-Free</span>
              </div>
            </div>

            {/* 5. Learn Smarter, */}
            <div className="feature-highlight-item">
              <div className="highlight-icon-circle">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Learn Smarter,</span>
                <span className="highlight-desc">Not Harder</span>
              </div>
            </div>

            {/* 6. Affordable */}
            <div className="feature-highlight-item">
              <div className="highlight-icon-circle">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Affordable</span>
                <span className="highlight-desc">Premium Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INNOVATIVE FEATURES SECTION */}
      <section id="features" className="features-showcase-section">
        <Features onOpenModal={onOpenModal} />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="section-compact">
        <HowItWorks onOpenModal={onOpenModal} />
      </section>

      {/* AI TOOLS SECTION */}
      <section id="ai-tools" className="section-compact">
        <AiTools onOpenModal={onOpenModal} />
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="section-compact">
        <Team onOpenModal={onOpenModal} />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-compact">
        <About onOpenModal={onOpenModal} />
      </section>
    </div>
  )
}
