// Type definitions for Web Vitals
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
  startTime: number
}

interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  // Measure component render time
  measureRender(componentName: string, callback: () => void) {
    const start = performance.now()
    callback()
    const end = performance.now()
    
    this.recordMetric(componentName, end - start)
  }
  
  // Record a metric
  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    
    const values = this.metrics.get(name)!
    values.push(value)
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift()
    }
  }
  
  // Get average metric
  getAverageMetric(name: string): number {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return 0
    
    return values.reduce((a, b) => a + b, 0) / values.length
  }
  
  // Log Core Web Vitals
  logWebVitals() {
    if (typeof window === 'undefined') return
    
    // First Contentful Paint (FCP)
    const paintEntries = performance.getEntriesByType('paint')
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
    if (fcp) {
      console.log('FCP:', fcp.startTime.toFixed(2), 'ms')
    }
    
    // Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms')
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
    
    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEventTiming
        if (fidEntry.name === 'first-input') {
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime, 'ms')
        }
      })
    })
    
    fidObserver.observe({ entryTypes: ['first-input'] })
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as LayoutShift
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value
        }
      }
      console.log('CLS:', clsValue.toFixed(3))
    })
    
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  }
  
  // Memory usage monitoring
  getMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as Performance & {
        memory?: {
          usedJSHeapSize: number
          totalJSHeapSize: number
          jsHeapSizeLimit: number
        }
      }).memory
      if (memory) {
        return {
          usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
          totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
          jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
        }
      }
    }
    return null
  }
  
  // Bundle size tracking
  trackBundleSize() {
    if (typeof window === 'undefined') return
    
    const resources = performance.getEntriesByType('resource')
    const jsFiles = resources.filter(r => r.name.endsWith('.js'))
    const cssFiles = resources.filter(r => r.name.endsWith('.css'))
    
    const totalJsSize = jsFiles.reduce((acc, file) => {
      const resourceEntry = file as PerformanceResourceTiming
      return acc + (resourceEntry.transferSize || 0)
    }, 0)
    const totalCssSize = cssFiles.reduce((acc, file) => {
      const resourceEntry = file as PerformanceResourceTiming
      return acc + (resourceEntry.transferSize || 0)
    }, 0)
    
    console.log('Bundle Sizes:')
    console.log('- JavaScript:', (totalJsSize / 1024).toFixed(2), 'KB')
    console.log('- CSS:', (totalCssSize / 1024).toFixed(2), 'KB')
    console.log('- Total:', ((totalJsSize + totalCssSize) / 1024).toFixed(2), 'KB')
  }
}

// Hook for performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance()
  
  return {
    measureRender: (callback: () => void) => monitor.measureRender(componentName, callback),
    getAverageRenderTime: () => monitor.getAverageMetric(componentName),
  }
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return
  
  const monitor = PerformanceMonitor.getInstance()
  
  // Log web vitals after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      monitor.logWebVitals()
      monitor.trackBundleSize()
      
      const memory = monitor.getMemoryUsage()
      if (memory) {
        console.log('Memory Usage:', memory)
      }
    }, 2000)
  })
}