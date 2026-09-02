import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Assistant.css'

export default function Assistant() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isWritingOpen, setIsWritingOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState('JudicialGPT')

  // Chat message state
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([])
  const [isAiTyping, setIsAiTyping] = useState(false)
  const chatEndRef = useRef(null)

  // Display 'Tayyab' or user's first name matching screenshot
  const userName = currentUser?.name
    ? (currentUser.name.includes('Tayyab')
        ? 'Tayyab'
        : currentUser.name.replace(/^(advocate|adv\.|mr\.|mrs\.|ms\.)\s+/i, '').split(' ')[0])
    : 'Tayyab'
  const userRole = currentUser?.role || 'Advocate High Court'

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isAiTyping])

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim()
    if (!text) return

    const userMsg = { sender: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsAiTyping(true)

    // Synthesize realistic Pakistani legal response
    setTimeout(() => {
      let aiResponseText = ''
      let citations = []

      if (text.toLowerCase().includes('contract') || text.toLowerCase().includes('breach')) {
        aiResponseText = `Under Pakistani law, breach of contract is governed primarily by the Contract Act, 1872. Section 73 provides for compensatory damages arising naturally in the usual course of things. Furthermore, under the Specific Relief Act, 1877 (Sections 12 and 19), courts grant decrees of specific performance where pecuniary compensation cannot afford adequate relief, particularly in transactions concerning immovable property.`
        citations = ['PLD 2023 SC 145', '2021 SCMR 980', 'Section 73, Contract Act 1872', 'Specific Relief Act 1877']
      } else if (text.toLowerCase().includes('bail') || text.toLowerCase().includes('497')) {
        aiResponseText = `In post-arrest bail petitions under Section 497 Cr.P.C., the Supreme Court of Pakistan has consistently held that liberty of a citizen is a precious fundamental right guaranteed under Articles 4 and 9 of the Constitution. Where reasonable grounds do not appear for believing the accused guilty of an offence punishable with death or imprisonment for life, bail is granted as a matter of rule and refusal is an exception.`
        citations = ['PLD 2022 SC 142', '2020 SCMR 249', 'Section 497, Code of Criminal Procedure 1898']
      } else if (text.toLowerCase().includes('writ') || text.toLowerCase().includes('199')) {
        aiResponseText = `Judicial review under Article 199 of the Constitution of the Islamic Republic of Pakistan, 1973 lies when no other adequate and alternate remedy is provided by law. The High Court exercises constitutional supervisory jurisdiction against unlawful executive and administrative actions violating statutory duties or fundamental rights.`
        citations = ['2023 SCMR 512', 'PLD 2016 SC 778', 'Article 199, Constitution of Pakistan 1973']
      } else {
        aiResponseText = `Based on binding jurisprudence from the Supreme Court of Pakistan and statutory provisions, your proposition requires established locus standi, adherence to the statutory limitation timeline under the Limitation Act 1908, and authoritative case precedence supporting the cause of action.`
        citations = ['PLD 2023 SC 102', '2022 SCMR 1150', 'Civil Procedure Code 1908']
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponseText,
          citations
        }
      ])
      setIsAiTyping(false)
    }, 850)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startNewChat = () => {
    setMessages([])
    setInputValue('')
  }

  return (
    <div className="assistant-workspace">
      {/* ----------------------------------------------------------------------
          1. LEFT SIDEBAR (Matches Screenshot)
          ---------------------------------------------------------------------- */}
      <aside className={`workspace-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
        {/* Top Header: Scales Emblem + Collapse Sidebar Icon */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo-icon" title="Return to Home">
            <i className="bi bi-bank2"></i>
          </Link>

          <button
            className="sidebar-collapse-btn"
            onClick={() => setIsSidebarOpen(false)}
            title="Close sidebar"
          >
            <i className="bi bi-layout-sidebar"></i>
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="sidebar-menu">
          {/* New Chat */}
          <button className="sidebar-menu-btn active" onClick={startNewChat}>
            <i className="bi bi-pencil-square leading-icon"></i>
            <span>New Chat</span>
          </button>

          {/* Judgment Search */}
          <button
            className="sidebar-menu-btn"
            onClick={() => handleSendMessage('Search Supreme Court judgments on breach of contract and specific performance')}
          >
            <i className="bi bi-journal-bookmark leading-icon"></i>
            <span>Judgment Search</span>
          </button>

          {/* Judgement Writing with dropdown */}
          <div>
            <button
              className={`sidebar-menu-btn ${isWritingOpen ? 'expanded' : ''}`}
              onClick={() => setIsWritingOpen(!isWritingOpen)}
            >
              <i className="bi bi-hammer leading-icon"></i>
              <span>Judgement Writing</span>
              <i className="bi bi-chevron-down chevron-icon"></i>
            </button>
            {isWritingOpen && (
              <div className="sidebar-sub-menu">
                <button
                  className="sidebar-sub-btn"
                  onClick={() => handleSendMessage('Draft a Bail Petition under Section 497 Cr.P.C.')}
                >
                  Bail Petition (s. 497)
                </button>
                <button
                  className="sidebar-sub-btn"
                  onClick={() => handleSendMessage('Draft Civil Plaint for Specific Performance of Agreement to Sell')}
                >
                  Civil Plaint (Specific Performance)
                </button>
                <button
                  className="sidebar-sub-btn"
                  onClick={() => handleSendMessage('Draft High Court Writ Petition under Article 199')}
                >
                  Writ Petition (Art. 199)
                </button>
              </div>
            )}
          </div>

          {/* Law Agents with dropdown */}
          <div>
            <button
              className={`sidebar-menu-btn ${isAgentsOpen ? 'expanded' : ''}`}
              onClick={() => setIsAgentsOpen(!isAgentsOpen)}
            >
              <i className="bi bi-book leading-icon"></i>
              <span>Law Agents</span>
              <i className="bi bi-chevron-down chevron-icon"></i>
            </button>
            {isAgentsOpen && (
              <div className="sidebar-sub-menu">
                <button
                  className="sidebar-sub-btn"
                  onClick={() => handleSendMessage('Activate SCMR Case Precedent Agent')}
                >
                  SCMR Precedent Agent
                </button>
                <button
                  className="sidebar-sub-btn"
                  onClick={() => handleSendMessage('Activate Statutory Limitation Auditor')}
                >
                  Limitation Period Auditor
                </button>
                <button
                  className="sidebar-sub-btn"
                  onClick={() => handleSendMessage('Activate Multilingual Vernacular Drafter')}
                >
                  Vernacular Law Agent
                </button>
              </div>
            )}
          </div>

          {/* Summarize */}
          <button
            className="sidebar-menu-btn"
            onClick={() => handleSendMessage('Please summarize the landmark judgment PLD 2022 SC 142 on statutory interpretation.')}
          >
            <i className="bi bi-file-earmark-text leading-icon"></i>
            <span>Summarize</span>
          </button>

          {/* Search */}
          <button
            className="sidebar-menu-btn"
            onClick={() => handleSendMessage('Search Pakistan Federal Statutes and Gazette notifications')}
          >
            <i className="bi bi-search leading-icon"></i>
            <span>Search</span>
          </button>
        </div>

        {/* Middle: Conversation History / No conversations */}
        <div className="sidebar-conversations">
          {messages.length === 0 ? (
            <div className="conversations-empty">No conversations</div>
          ) : (
            <div
              className="history-item active"
              onClick={() => {}}
            >
              <i className="bi bi-chat-left-text"></i>
              <span>{messages[0]?.text?.substring(0, 22)}...</span>
            </div>
          )}
        </div>

        {/* Bottom User Pill Profile (Matches Screenshot: avatar + "Tayyab" + "...") */}
        <div className="sidebar-footer">
          {isUserMenuOpen && (
            <div className="user-popup-menu">
              <div className="p-2 border-bottom border-secondary border-opacity-25 mb-1">
                <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{currentUser?.name || 'Advocate Tayyab'}</div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>{currentUser?.email || 'tayyab.advocate@gmail.com'}</div>
              </div>
              <button
                className="user-popup-item"
                onClick={() => navigate('/')}
              >
                <i className="bi bi-house"></i>
                <span>Return to Home</span>
              </button>
              <button
                className="user-popup-item danger"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <button
            className="sidebar-user-pill"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={userName} className="sidebar-avatar" />
            ) : (
              <div className="sidebar-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="sidebar-username">{userName}</span>
            <i className="bi bi-three-dots sidebar-dots-btn"></i>
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------------------------
          2. MAIN CHAT WORKSPACE CANVAS
          ---------------------------------------------------------------------- */}
      <main className="workspace-main">
        {/* Top Header Bar (Matches Screenshot: "JudicialGPT ⌵" + right circle) */}
        <header className="workspace-topbar">
          <div className="topbar-left">
            {!isSidebarOpen && (
              <button
                className="topbar-sidebar-toggle"
                onClick={() => setIsSidebarOpen(true)}
                title="Open sidebar"
              >
                <i className="bi bi-layout-sidebar"></i>
              </button>
            )}

            <div className="position-relative">
              <button
                className="topbar-model-dropdown"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              >
                <span>{selectedModel}</span>
                <i className="bi bi-chevron-down"></i>
              </button>

              {isModelDropdownOpen && (
                <div
                  className="position-absolute top-100 start-0 mt-1 p-2 rounded-3 shadow-lg"
                  style={{
                    background: '#1e1e1e',
                    border: '1px solid rgba(255,255,255,0.12)',
                    minWidth: '240px',
                    zIndex: 1000
                  }}
                >
                  <div
                    className="p-2 rounded-2 cursor-pointer text-white d-flex align-items-center justify-content-between"
                    style={{ background: 'rgba(16,185,129,0.15)', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedModel('JudicialGPT')
                      setIsModelDropdownOpen(false)
                    }}
                  >
                    <div>
                      <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>JudicialGPT</div>
                      <small className="text-muted" style={{ fontSize: '0.74rem' }}>Supreme Court & Federal Statutes</small>
                    </div>
                    <i className="bi bi-check2 text-success"></i>
                  </div>
                  <div
                    className="p-2 rounded-2 cursor-pointer text-white-50 mt-1 d-flex align-items-center justify-content-between"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedModel('JudicialGPT Pro')
                      setIsModelDropdownOpen(false)
                    }}
                  >
                    <div>
                      <div className="fw-semibold text-white" style={{ fontSize: '0.88rem' }}>JudicialGPT Pro</div>
                      <small className="text-muted" style={{ fontSize: '0.74rem' }}>All High Courts & Arbitral Tribunals</small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="topbar-right">
            <Link to="/" className="btn-exit-workspace" title="Back to main site">
              <i className="bi bi-arrow-left"></i>
              <span>Home</span>
            </Link>

            <div className="topbar-user-icon" title="Status: Online">
              <i className="bi bi-circle"></i>
            </div>
          </div>
        </header>

        {/* Chat Body */}
        <div className="workspace-chat-body">
          {messages.length === 0 ? (
            /* Matches screenshot: "Hi Tayyab, how can I help?" */
            <div className="chat-welcome-container">
              <h1 className="chat-welcome-greeting">
                Hi {userName}, how can I help?
              </h1>

              {/* Chat Input Pill (Centered in Welcome View) */}
              <div className="chat-input-wrapper">
                <div className="chat-input-pill">
                  {/* + Attachment Button */}
                  <button
                    type="button"
                    className="chat-attach-btn"
                    title="Attach legal document or plaint"
                    onClick={() => alert('Document upload modal: Select case file, PDF, or FIR to summarize.')}
                  >
                    <i className="bi bi-plus"></i>
                  </button>

                  {/* Input field */}
                  <input
                    type="text"
                    className="chat-text-input"
                    placeholder="Message JudicialGPT"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />

                  {/* Mic button */}
                  <button
                    type="button"
                    className="chat-action-btn"
                    title="Voice input"
                    onClick={() => alert('Voice input activated: Speak your legal query in English or Urdu.')}
                  >
                    <i className="bi bi-mic"></i>
                  </button>

                  {/* Phone / Call Audio button */}
                  <button
                    type="button"
                    className="chat-action-btn"
                    title="Voice consultation mode"
                    onClick={() => alert('Voice consultation stream initialized.')}
                  >
                    <i className="bi bi-telephone"></i>
                  </button>

                  {/* Send Arrow Button */}
                  <button
                    type="button"
                    className={`chat-send-btn ${inputValue.trim() ? 'active' : ''}`}
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                  >
                    <i className="bi bi-arrow-up"></i>
                  </button>
                </div>

                {/* Quick Prompts */}
                <div className="quick-prompts-row">
                  <button
                    className="quick-prompt-btn"
                    onClick={() => handleSendMessage('What is the limitation period for filing an Intra-Court Appeal in High Court?')}
                  >
                    Limitation for Intra-Court Appeal
                  </button>
                  <button
                    className="quick-prompt-btn"
                    onClick={() => handleSendMessage('Principles for grant of post-arrest bail under Section 497 CrPC')}
                  >
                    Bail Principles under S. 497 CrPC
                  </button>
                  <button
                    className="quick-prompt-btn"
                    onClick={() => handleSendMessage('Specific performance of contract when time is of the essence')}
                  >
                    Specific Performance & Time Essence
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Conversation Stream */
            <div className="chat-messages-stream">
              {messages.map((msg, index) => (
                <div key={index} className={`message-row ${msg.sender}`}>
                  {msg.sender === 'ai' && (
                    <div className="message-avatar ai">
                      <i className="bi bi-bank2"></i>
                    </div>
                  )}

                  <div className="message-bubble">
                    <div>{msg.text}</div>

                    {msg.citations && msg.citations.length > 0 && (
                      <div className="ai-legal-citations">
                        {msg.citations.map((cite, cIdx) => (
                          <span key={cIdx} className="citation-chip">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>{cite}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="message-avatar user">
                      <i className="bi bi-person-fill"></i>
                    </div>
                  )}
                </div>
              ))}

              {isAiTyping && (
                <div className="message-row ai">
                  <div className="message-avatar ai">
                    <i className="bi bi-bank2"></i>
                  </div>
                  <div className="message-bubble text-muted d-flex align-items-center gap-2">
                    <span className="spinner-border spinner-border-sm text-success" role="status"></span>
                    <span>Analyzing Pakistani case precedents and statutes...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Persistent Bottom Input Pill when conversation is active */}
        {messages.length > 0 && (
          <div className="chat-input-wrapper">
            <div className="chat-input-pill">
              <button
                type="button"
                className="chat-attach-btn"
                title="Attach legal document"
                onClick={() => alert('Document upload modal: Select case file or PDF.')}
              >
                <i className="bi bi-plus"></i>
              </button>

              <input
                type="text"
                className="chat-text-input"
                placeholder="Message JudicialGPT"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                type="button"
                className="chat-action-btn"
                title="Voice input"
                onClick={() => alert('Voice input activated.')}
              >
                <i className="bi bi-mic"></i>
              </button>

              <button
                type="button"
                className="chat-action-btn"
                title="Voice consultation"
                onClick={() => alert('Voice consultation stream initialized.')}
              >
                <i className="bi bi-telephone"></i>
              </button>

              <button
                type="button"
                className={`chat-send-btn ${inputValue.trim() ? 'active' : ''}`}
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
              >
                <i className="bi bi-arrow-up"></i>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
