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
  private cleanupInterval: NodeJS.Timeout | null = null
  private isDestroyed = false

  constructor() {
    if (typeof process !== 'undefined' && !this.isDestroyed) {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
      this.setupProcessHandlers()
    }
  }

  private setupProcessHandlers() {
    const cleanup = () => {
      if (!this.isDestroyed) {
        this.destroy()
      }
    }

    if (typeof process !== 'undefined') {
      process.once('exit', cleanup)
      process.once('SIGINT', cleanup)
      process.once('SIGTERM', cleanup)
      process.once('SIGUSR1', cleanup)
      process.once('SIGUSR2', cleanup)
      
      // Critical error handlers - keep these for production monitoring
      process.once('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error)
        cleanup()
        process.exit(1)
      })
      
      process.once('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason)
        cleanup()
        process.exit(1)
      })
    }
  }

  cleanup() {
    if (this.isDestroyed) return
    
    const now = Date.now()
    const keysToDelete: string[] = []
    
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        keysToDelete.push(key)
      }
    })
    
    keysToDelete.forEach(key => {
      delete this.store[key]
    })
  }

  async limit(identifier: string, config: RateLimitConfig): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    if (this.isDestroyed) {
      throw new Error('RateLimiter has been destroyed')
    }

    const now = Date.now()
    const resetTime = now + config.windowMs

    // Check if entry exists and is still valid
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
    if (this.isDestroyed) return
    
    this.isDestroyed = true
    
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    
    this.store = {}
  }

  getStoreSize(): number {
    return Object.keys(this.store).length
  }
}

let rateLimiterInstance: RateLimiter | null = null

function getRateLimiter(): RateLimiter {
  if (!rateLimiterInstance) {
    rateLimiterInstance = new RateLimiter()
  }
  return rateLimiterInstance
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5 // 5 requests per minute
  }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown'
  
  const pathname = request.nextUrl.pathname
  const identifier = `${ip}:${pathname}`
  
  const rateLimiter = getRateLimiter()
  
  try {
    const result = await rateLimiter.limit(identifier, config)
    return result
  } catch {
    // Return a permissive result on error to avoid blocking legitimate requests
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      reset: Date.now() + config.windowMs
    }
  }
}

// Export for testing purposes
export const __testing = {
  getRateLimiter,
  resetInstance: () => {
    if (rateLimiterInstance) {
      rateLimiterInstance.destroy()
      rateLimiterInstance = null
    }
  }
}