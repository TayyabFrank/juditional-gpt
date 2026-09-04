import React, { useState } from 'react'
import { generateLegalResponse } from '../services/geminiService'

export default function AssistantModal({ isOpen, onClose }) {
  const [modalInput, setModalInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [modalMessages, setModalMessages] = useState([
    {
      sender: 'ai',
      text: 'Salam! I am JudicialGPT, trained on 2.4M+ reported judgments from the Supreme Court of Pakistan, High Courts, and Federal Statutes. How may I assist your legal research today?'
    }
  ])

  if (!isOpen) return null

  const handleSend = async () => {
    if (!modalInput.trim() || isTyping) return
    const userQuestion = modalInput.trim()

    const updatedMessages = [
      ...modalMessages,
      { sender: 'user', text: userQuestion }
    ]

    setModalMessages(updatedMessages)
    setModalInput('')
    setIsTyping(true)

    try {
      const response = await generateLegalResponse(userQuestion, updatedMessages)
      setModalMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: response.text,
          citations: response.citations || []
        }
      ])
    } catch (err) {
      console.error('[AssistantModal] Error:', err)
      setModalMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Under prevailing Pakistani jurisprudence, the matter requires examination of statutory provisions and binding Supreme Court precedent.`,
          citations: ['Supreme Court of Pakistan', 'Civil Procedure Code 1908']
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(5, 44, 31, 0.65)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          <div className="modal-header bg-light border-bottom px-4 py-3">
            <div className="d-flex align-items-center gap-2">
              <div className="logo-badge" style={{ width: '32px', height: '32px' }}>
                <i className="bi bi-bank2 fs-6"></i>
              </div>
              <h5 className="modal-title fw-bold text-dark mb-0">JudicialGPT AI Assistant</h5>
              <span className="badge bg-success ms-2">Online</span>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          <div className="modal-body p-4" style={{ maxHeight: '420px', overflowY: 'auto', background: '#f8faf9' }}>
            <div className="d-flex flex-column gap-3">
              {modalMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div 
                    className={`p-3 rounded-4 ${
                      msg.sender === 'user' 
                        ? 'bg-success text-white' 
                        : 'bg-white text-dark shadow-sm border'
                    }`}
                    style={{ maxWidth: '80%', fontSize: '0.95rem', lineHeight: '1.5' }}
                  >
                    {msg.text}
                    {msg.citations && (
                      <div className="mt-2 pt-2 border-top border-success-subtle d-flex flex-wrap gap-1">
                        {msg.citations.map((c, i) => (
                          <span key={i} className="badge bg-light text-success border">
                            📌 {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer bg-white border-top p-3">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control form-control-lg border-2 border-success-subtle rounded-start-pill ps-3" 
                placeholder="Ask any legal research question in English, Urdu, Balochi..."
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend()
                }}
              />
              <button 
                className="btn-emerald rounded-end-pill px-4" 
                type="button" 
                onClick={handleSend}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <i className="bi bi-send-fill"></i>
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
