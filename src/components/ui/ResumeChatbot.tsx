'use client'

import { useState, useRef, useEffect } from 'react'
import { XMarkIcon, ChatBubbleLeftRightIcon, MinusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { toast } from '@/components/ui/Toast'
import { DynamicReactMarkdown } from '@/lib/dynamic-imports'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ResumeChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Tayyab's AI assistant. I can answer questions about his experience, skills, projects, and qualifications. What would you like to know?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [serviceDown, setServiceDown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<AbortController | null>(null)
  const mountedRef = useRef(true)

  // Abort any in-flight request on unmount so a stream doesn't keep pushing
  // state (or fire an error toast) after the user navigates away.
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      controllerRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    // Only scroll to bottom if chatbot is open, prevents auto-scroll on page load
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setHasInteracted(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const quickQuestions = [
    "Tell me about your experience",
    "What are your main skills?",
    "Describe your recent projects",
    "What's your educational background?"
  ]

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    const controller = new AbortController()
    controllerRef.current = controller
    // Guards the CONNECTION phase only - cleared as soon as headers arrive, so a
    // healthy response that streams for longer than 30s isn't aborted mid-answer.
    const timeout = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!response.ok) {
        const err = new Error(`Failed to get response (${response.status})`) as Error & { status?: number }
        err.status = response.status
        throw err
      }
      setServiceDown(false)

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      if (reader) {
        const assistantId = Date.now().toString() + '-assistant'
        
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          assistantMessage += chunk
          
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            
            if (lastMessage?.id === assistantId) {
              lastMessage.content = assistantMessage
            } else {
              newMessages.push({
                id: assistantId,
                role: 'assistant',
                content: assistantMessage
              })
            }
            
            return newMessages
          })
        }
      }
    } catch (err) {
      // Unmount abort: component is gone - no error UI, no global toast.
      if (!mountedRef.current) return
      const error = err as { status?: number; message?: string; name?: string }
      if (error?.name === 'AbortError') {
        const errorMsg = 'Request timed out. Please try again.'
        setError(errorMsg)
        toast.error('Request timed out', 'The chat service took too long to respond.')
      } else if (error?.status === 429 || error?.message?.includes('429')) {
        const errorMsg = 'Too many messages. Please wait a moment before sending another.'
        setError(errorMsg)
        toast.warning('Slow down', errorMsg)
      } else if (error?.status === 503 || error?.message?.includes('503')) {
        const errorMsg = 'Chat service is temporarily unavailable. Please try again later.'
        setError(errorMsg)
        setServiceDown(true)
        toast.error('Chat is down', errorMsg)
      } else {
        const errorMsg = 'Failed to get response. Please try again.'
        setError(errorMsg)
        toast.error('Couldn\'t get a response', errorMsg)
      }
    } finally {
      clearTimeout(timeout)
      if (mountedRef.current) setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }

  return (
    <>
      {/* Chat Button with Pulse Animation */}
      <div className={`fixed bottom-4 right-4 z-[100] ${isOpen ? 'hidden' : 'block'}`}>
        <button
          onClick={handleOpen}
          className="relative bg-[var(--primary)] text-[var(--on-primary)] p-4 rounded-full shadow-lg hover:bg-[var(--primary-hover)] transition-all duration-300 group"
          aria-label="Open resume assistant"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          {!hasInteracted && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)]"></span>
            </span>
          )}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-[var(--text)] text-[var(--background)] text-sm py-2 px-3 rounded-lg whitespace-nowrap shadow-lg border border-[var(--border)]">
              Chat with my resume!
              <div className="absolute top-full right-4 transform -translate-y-1">
                <div className="border-4 border-transparent border-t-[var(--text)]"></div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      <div
        role="dialog"
        aria-label="Resume assistant chat"
        className={`fixed z-[100] transition-all duration-300 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } ${
          isMinimized
            ? 'bottom-4 right-4 w-[300px] h-[50px]'
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
                <span
                  className="absolute -bottom-1 -right-1 flex h-2 w-2"
                  title={serviceDown ? 'Chat service unavailable' : 'Online'}
                >
                  {!serviceDown && (
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${serviceDown ? 'bg-[var(--error)]' : 'bg-[var(--success)]'}`}></span>
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

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-[var(--primary)] text-[var(--on-primary)]'
                          : 'bg-[var(--background-secondary)] text-[var(--text)]'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        // Assistant replies render as markdown (models format lists/bold
                        // no matter what the prompt says); components are chat-scaled.
                        <div className="text-sm">
                          <DynamicReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>,
                              ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
                              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                              code: ({ children }) => (
                                <code className="rounded bg-[var(--background-tertiary)] px-1 py-0.5 font-mono text-xs">{children}</code>
                              ),
                              a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline underline-offset-2">
                                  {children}
                                </a>
                              ),
                              // Chat bubbles have no room for heading scale - flatten to bold lines.
                              h1: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
                              h2: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
                              h3: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
                              img: () => null,
                            }}
                          >
                            {message.content}
                          </DynamicReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--background-secondary)] rounded-lg px-4 py-2">
                      {/* data-essential-motion: exempt from the global reduced-motion
                          kill - a typing/status indicator is essential motion. */}
                      <div data-essential-motion className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-chat-dot" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-chat-dot" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-chat-dot" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-[var(--error)]/10 text-[var(--error)] rounded-lg px-4 py-2 text-sm">
                      {error}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions (only show initially) */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-[var(--text-tertiary)] mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs px-3 py-2 min-h-[44px] bg-[var(--background-secondary)] text-[var(--text-secondary)] rounded-full hover:bg-[var(--background-tertiary)] transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)]">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my experience..."
                    aria-label="Ask about my experience"
                    className="flex-1 px-3 py-2 bg-[var(--background-secondary)] text-[var(--text)] rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2.5 min-h-[44px] min-w-[44px] bg-[var(--primary)] text-[var(--on-primary)] rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}