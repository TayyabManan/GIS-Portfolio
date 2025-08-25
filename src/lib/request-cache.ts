// Simple in-memory cache for API requests
class RequestCache {
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes
  
  // Get cached data if valid
  get<T = unknown>(key: string, ttl: number = this.DEFAULT_TTL): T | null {
    const cached = this.cache.get(key)
    
    if (!cached) return null
    
    const isExpired = Date.now() - cached.timestamp > ttl
    
    if (isExpired) {
      this.cache.delete(key)
      return null
    }
    
    return cached.data as T
  }
  
  // Set cache data
  set<T = unknown>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }
  
  // Clear specific cache entry
  clear(key: string): void {
    this.cache.delete(key)
  }
  
  // Clear all cache
  clearAll(): void {
    this.cache.clear()
  }
  
  // Get cache size
  size(): number {
    return this.cache.size
  }
}

// Singleton instance
const requestCache = new RequestCache()

// Cached fetch wrapper
export async function cachedFetch<T>(
  url: string,
  options?: RequestInit & { ttl?: number; cacheKey?: string }
): Promise<T> {
  const cacheKey = options?.cacheKey || url
  const ttl = options?.ttl
  
  // Check cache first
  const cachedData = requestCache.get<T>(cacheKey, ttl)
  if (cachedData) {
    return cachedData
  }
  
  // Make request
  const response = await fetch(url, options)
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const data = await response.json()
  
  // Cache successful responses
  requestCache.set(cacheKey, data)
  
  return data
}

// Deduplicate concurrent requests
const pendingRequests = new Map<string, Promise<unknown>>()

export async function deduplicatedFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const key = `${options?.method || 'GET'}:${url}`
  
  // Return existing promise if request is already pending
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key) as Promise<T>
  }
  
  // Create new request promise
  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return res.json()
    })
    .finally(() => {
      // Clean up pending request
      pendingRequests.delete(key)
    })
  
  pendingRequests.set(key, promise)
  
  return promise
}

// Batch API requests
export class BatchRequestProcessor<T = unknown> {
  private queue: Array<{
    url: string
    resolve: (value: T) => void
    reject: (error: Error) => void
  }> = []
  private timeoutId: NodeJS.Timeout | null = null
  private readonly batchDelay = 50 // ms
  
  add(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, resolve, reject })
      this.scheduleProcess()
    })
  }
  
  private scheduleProcess() {
    if (this.timeoutId) return
    
    this.timeoutId = setTimeout(() => {
      this.process()
    }, this.batchDelay)
  }
  
  private async process() {
    const batch = [...this.queue]
    this.queue = []
    this.timeoutId = null
    
    if (batch.length === 0) return
    
    try {
      // Process all requests in parallel
      const promises = batch.map(item => 
        fetch(item.url).then(res => res.json())
      )
      
      const results = await Promise.all(promises)
      
      // Resolve individual promises
      batch.forEach((item, index) => {
        item.resolve(results[index])
      })
    } catch (error) {
      // Reject all promises on error
      batch.forEach(item => {
        item.reject(error as Error)
      })
    }
  }
}

export const batchProcessor = new BatchRequestProcessor()

// Export cache instance for manual control
export { requestCache }