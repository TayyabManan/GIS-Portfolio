'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { 
  ExclamationTriangleIcon, 
  ArrowPathIcon,
  WifiIcon,
  ServerIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { motion, AnimatePresence } from 'framer-motion'

export type ErrorType = 'network' | 'server' | 'timeout' | 'permission' | 'notfound' | 'generic'

interface ErrorStateProps {
  error?: Error | string | null
  errorType?: ErrorType
  title?: string
  description?: string
  action?: string
  onRetry?: () => void | Promise<void>
  retryDelay?: number
  maxRetries?: number
  autoRetry?: boolean
  className?: string
  variant?: 'minimal' | 'card' | 'full'
  showDetails?: boolean
  customIcon?: React.ReactNode
  additionalActions?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }>
}

const errorConfig: Record<ErrorType, {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}> = {
  network: {
    icon: WifiIcon,
    title: 'Connection Error',
    description: 'Please check your internet connection and try again.',
    color: 'text-orange-500',
  },
  server: {
    icon: ServerIcon,
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
    color: 'text-red-500',
  },
  timeout: {
    icon: ClockIcon,
    title: 'Request Timeout',
    description: 'The request took too long. Please try again.',
    color: 'text-yellow-500',
  },
  permission: {
    icon: ShieldExclamationIcon,
    title: 'Permission Denied',
    description: 'You don\'t have permission to access this resource.',
    color: 'text-purple-500',
  },
  notfound: {
    icon: ExclamationTriangleIcon,
    title: 'Not Found',
    description: 'The requested resource could not be found.',
    color: 'text-gray-500',
  },
  generic: {
    icon: ExclamationTriangleIcon,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    color: 'text-red-500',
  },
}

export function ErrorState({
  error,
  errorType = 'generic',
  title,
  description,
  action = 'Try Again',
  onRetry,
  retryDelay = 0,
  maxRetries = 3,
  autoRetry = false,
  className,
  variant = 'card',
  showDetails = false,
  customIcon,
  additionalActions = [],
}: ErrorStateProps) {
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showErrorDetails, setShowErrorDetails] = useState(false)

  const config = errorConfig[errorType]
  const Icon = customIcon ? () => customIcon : config.icon
  const errorMessage = error instanceof Error ? error.message : error

  const handleRetry = useCallback(async () => {
    if (!onRetry || isRetrying) return
    
    setIsRetrying(true)
    setCountdown(null)
    
    try {
      await onRetry()
      // If retry succeeds, reset the count
      setRetryCount(0)
    } catch {
      // If retry fails, increment the count
      setRetryCount(prev => prev + 1)
    } finally {
      setIsRetrying(false)
    }
  }, [onRetry, isRetrying])

  useEffect(() => {
    if (autoRetry && retryCount < maxRetries && onRetry && !isRetrying) {
      const delay = retryDelay * Math.pow(2, retryCount) // Exponential backoff
      setCountdown(Math.ceil(delay / 1000))
      
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval)
            handleRetry()
            return null
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [retryCount, autoRetry, maxRetries, onRetry, retryDelay, isRetrying, handleRetry])

  const containerClasses = cn(
    'flex flex-col items-center justify-center text-center',
    variant === 'minimal' && 'py-8',
    variant === 'card' && 'p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
    variant === 'full' && 'min-h-[400px] py-16',
    className
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={containerClasses}
    >
      <div className={cn('mb-4', config.color)}>
        <Icon className="w-16 h-16 mx-auto" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title || config.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
        {description || config.description}
      </p>

      {showDetails && errorMessage && (
        <div className="mb-6 w-full max-w-md">
          <button
            onClick={() => setShowErrorDetails(!showErrorDetails)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-2"
          >
            {showErrorDetails ? 'Hide' : 'Show'} error details
          </button>
          
          <AnimatePresence>
            {showErrorDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <pre className="text-xs text-left bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                  <code>{errorMessage}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {retryCount > 0 && retryCount < maxRetries && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Retry attempt {retryCount} of {maxRetries}
        </p>
      )}

      {countdown !== null && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Retrying in {countdown} seconds...
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && retryCount < maxRetries && (
          <Button
            onClick={handleRetry}
            disabled={isRetrying || countdown !== null}
            variant="primary"
            className="min-w-[120px]"
          >
            {isRetrying ? (
              <>
                <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                {action}
              </>
            )}
          </Button>
        )}

        {additionalActions.map((additionalAction, index) => (
          <Button
            key={index}
            onClick={additionalAction.onClick}
            variant={additionalAction.variant || 'outline'}
          >
            {additionalAction.label}
          </Button>
        ))}
      </div>

      {retryCount >= maxRetries && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md"
        >
          <p className="text-sm text-red-600 dark:text-red-400">
            Maximum retry attempts reached. Please try again later or contact support.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

interface ErrorBoundaryFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorBoundaryFallback({ 
  error, 
  resetErrorBoundary 
}: ErrorBoundaryFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ErrorState
        error={error}
        errorType="generic"
        title="Application Error"
        description="Something went wrong in the application. The error has been logged and we'll look into it."
        onRetry={resetErrorBoundary}
        action="Reload Application"
        variant="card"
        showDetails={process.env.NODE_ENV === 'development'}
        additionalActions={[
          {
            label: 'Go Home',
            onClick: () => window.location.href = '/',
            variant: 'outline',
          },
        ]}
      />
    </div>
  )
}

export function LoadingError({ 
  resource = 'content',
  onRetry,
}: {
  resource?: string
  onRetry?: () => void
}) {
  return (
    <ErrorState
      errorType="generic"
      title={`Failed to load ${resource}`}
      description={`We couldn't load the ${resource}. Please check your connection and try again.`}
      onRetry={onRetry}
      variant="minimal"
    />
  )
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      errorType="network"
      onRetry={onRetry}
      autoRetry={true}
      retryDelay={3000}
      variant="minimal"
    />
  )
}

export function NotFoundError({ 
  resource = 'page',
  onGoHome,
}: {
  resource?: string
  onGoHome?: () => void
}) {
  return (
    <ErrorState
      errorType="notfound"
      title={`${resource.charAt(0).toUpperCase() + resource.slice(1)} not found`}
      description={`The ${resource} you're looking for doesn't exist or has been moved.`}
      variant="full"
      additionalActions={[
        {
          label: 'Go to Homepage',
          onClick: onGoHome || (() => window.location.href = '/'),
          variant: 'primary',
        },
      ]}
    />
  )
}