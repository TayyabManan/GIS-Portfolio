import { NextRequest } from 'next/server'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimiter {
  private store: RateLimitStore = {}
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
  }

  cleanup() {
    const now = Date.now()
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key]
      }
    })
  }

  async limit(identifier: string, config: RateLimitConfig): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now()
    const resetTime = now + config.windowMs

    if (!this.store[identifier] || this.store[identifier].resetTime < now) {
      this.store[identifier] = {
        count: 0,
        resetTime: resetTime
      }
    }

    const entry = this.store[identifier]
    entry.count++

    const remaining = Math.max(0, config.maxRequests - entry.count)
    const success = entry.count <= config.maxRequests

    return {
      success,
      limit: config.maxRequests,
      remaining,
      reset: entry.resetTime
    }
  }

  destroy() {
    clearInterval(this.cleanupInterval)
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter()

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5 // 5 requests per minute
  }
) {
  // Get IP address from request
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  
  const identifier = `${ip}:${request.nextUrl.pathname}`
  
  const result = await rateLimiter.limit(identifier, config)
  
  return result
}