import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({ 
  className = '', 
  variant = 'text',
  width,
  height,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-[var(--background-tertiary)]'
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  }
  
  const variantClasses = {
    text: 'rounded-md h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl'
  }
  
  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '16px' : '200px')
  }
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-label="Loading..."
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-[var(--background)] rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
      <Skeleton variant="rectangular" height={200} />
      <div className="p-6 space-y-4">
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="text" width="90%" height={24} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <div className="flex gap-2 pt-2">
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="text" width={60} height={24} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          width={i === lines - 1 ? '70%' : '100%'} 
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />
}