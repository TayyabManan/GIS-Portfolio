'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, ChatBubbleLeftRightIcon, MinusIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/contexts/ThemeContext'

export default function ResumeChatbot() {
  const { actualTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Show tooltip after 3 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        // You can add a tooltip state here if needed
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasInteracted, isOpen])

  // Inject CSS to hide Gradio elements when iframe loads
  useEffect(() => {
    if (iframeLoaded && isOpen) {
      const injectStyles = () => {
        try {
          const iframe = document.querySelector('iframe[title="Resume Chatbot"]') as HTMLIFrameElement
          if (iframe && iframe.contentWindow) {
            const style = document.createElement('style')
            style.textContent = `
              /* Hide Gradio footer and settings */
              footer { display: none !important; }
              .built-with { display: none !important; }
              .settings-button { display: none !important; }
              button[aria-label="Settings"] { display: none !important; }
              .gr-button.settings { display: none !important; }
              
              /* Additional selectors for Gradio elements */
              .gradio-container footer { display: none !important; }
              .gradio-container .built-with-gradio { display: none !important; }
              #settings_button { display: none !important; }
            `
            iframe.contentDocument?.head?.appendChild(style)
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // Cross-origin restrictions may prevent this, but we try anyway
          console.log('Could not inject styles into iframe')
        }
      }

      // Try multiple times as Gradio content loads dynamically
      injectStyles()
      setTimeout(injectStyles, 1000)
      setTimeout(injectStyles, 2000)
    }
  }, [iframeLoaded, isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setHasInteracted(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
    setIframeLoaded(false)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat Button with Pulse Animation */}
      <div className={`fixed bottom-4 right-4 z-40 ${isOpen ? 'hidden' : 'block'}`}>
        <button
          onClick={handleOpen}
          className="relative bg-[var(--primary)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--primary-hover)] transition-all duration-300 group"
          aria-label="Open resume assistant"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          {/* Pulse animation for attention */}
          {!hasInteracted && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)]"></span>
            </span>
          )}
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm py-2 px-3 rounded-lg whitespace-nowrap shadow-lg border border-gray-800 dark:border-gray-200">
              Chat with my resume!
              <div className="absolute top-full right-4 transform -translate-y-1">
                <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-all duration-300 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } ${
          isMinimized 
            ? 'bottom-0 right-4 w-[300px] h-[50px]' 
            : 'bottom-4 right-4 w-[90vw] sm:w-[400px] h-[55vh] sm:h-[600px]'
        } ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className={`bg-[var(--background)] rounded-lg shadow-2xl h-full flex flex-col ${
          isMinimized ? '' : 'border border-[var(--border)]'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 bg-[var(--background-secondary)] ${
            isMinimized ? 'rounded-lg' : 'rounded-t-lg border-b border-[var(--border)]'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-[var(--text-secondary)]" />
                <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]"></span>
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text)]">Resume Assistant</h3>
                {!isMinimized && (
                  <p className="text-xs text-[var(--text-tertiary)]">Ask about my experience</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMinimize}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors p-1"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <button
                onClick={handleClose}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors p-1"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          {!isMinimized && (
            <div className="flex-1 relative overflow-hidden">
              {isOpen && (
                <>
                  {/* Loading indicator */}
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-secondary)] z-20">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto mb-2"></div>
                        <p className="text-sm text-[var(--text-secondary)]">Loading assistant...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={`https://tayyabmanan-resumechatbot.hf.space?__theme=${actualTheme}&__hide_footer=true`}
                    className="w-full h-full rounded-b-lg relative z-10"
                    title="Resume Chatbot"
                    allow="microphone"
                    onLoad={() => {
                      setIframeLoaded(true)
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Style injection for iframe content */}
      <style jsx global>{`
        /* These styles attempt to hide Gradio elements via CSS cascade */
        iframe[title="Resume Chatbot"] {
          border: none;
        }
      `}</style>
    </>
  )
}