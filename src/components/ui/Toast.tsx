'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DUR, EASE_MORPH_CSS, motionOK } from '@/lib/motion-tokens'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// Neutral elevated surface (site card language); the variant reads through a 4px
// left accent strip (echoes the site's border-l accents) and the colored icon,
// not a heavy colored border.
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 pl-5 pr-12 text-[var(--text)] shadow-lg transition-all before:absolute before:inset-y-0 before:left-0 before:w-1 before:content-[''] before:transition-colors before:duration-morph data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: 'before:bg-[var(--border-hover)]',
        destructive: 'before:bg-[var(--error)]',
        success: 'before:bg-[var(--success)]',
        warning: 'before:bg-[var(--warning)]',
        info: 'before:bg-[var(--info)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 min-h-0! min-w-0! shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-transparent px-3 text-sm font-medium transition-colors hover:bg-[var(--background-secondary)] disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      // The important suffix is required: the global `button { min-height: 44px }`
      // in globals.css is UNLAYERED, so it beats Tailwind's layered utilities at any
      // specificity - plain min-h-0 loses. Visual box is a tidy 32px; the invisible
      // after: extender keeps a ~44px effective touch target. No local focus classes:
      // keyboard focus gets the site-wide *:focus-visible outline, and mouse clicks
      // leave no lingering ring.
      "absolute right-2 top-2 flex h-8 w-8 min-h-0! min-w-0! items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors after:absolute after:-inset-1.5 after:content-[''] hover:bg-[var(--background-secondary)] hover:text-[var(--text)]",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold leading-tight', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-95 leading-snug', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

// Toast hook and context
interface ToastState {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: VariantProps<typeof toastVariants>['variant']
  duration?: number
  icon?: React.ReactNode
  open?: boolean
}

const TOAST_LIMIT = 5
// Time a dismissed toast stays in state before removal - just long enough for the
// exit animation (~300ms). The old 1000000 (shadcn default) kept ghosts ~16.7 min.
const TOAST_REMOVE_DELAY = 5000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Action =
  | {
      type: 'ADD_TOAST'
      toast: ToastState
    }
  | {
      type: 'UPDATE_TOAST'
      toast: Partial<ToastState>
    }
  | {
      type: 'DISMISS_TOAST'
      toastId?: ToastState['id']
    }
  | {
      type: 'REMOVE_TOAST'
      toastId?: ToastState['id']
    }

interface State {
  toasts: ToastState[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

interface ToastOptions {
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: VariantProps<typeof toastVariants>['variant']
  duration?: number
  icon?: React.ReactNode
}

function toast(options: ToastOptions) {
  const id = genId()
  const duration = options.duration ?? 5000

  const update = (props: ToastOptions) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...options,
      id,
      duration,
      open: true,
    },
  })

  if (duration > 0) {
    setTimeout(() => {
      dismiss()
    }, duration)
  }

  return {
    id: id,
    dismiss,
    update,
  }
}

// Helper functions for common toast types
toast.success = (message: string, description?: string) => {
  return toast({
    title: message,
    description,
    variant: 'success',
    icon: <CheckCircle className="h-5 w-5 text-[var(--success)]" />,
  })
}

toast.error = (message: string, description?: string) => {
  return toast({
    title: message,
    description,
    variant: 'destructive',
    icon: <AlertCircle className="h-5 w-5 text-[var(--error)]" />,
  })
}

toast.warning = (message: string, description?: string) => {
  return toast({
    title: message,
    description,
    variant: 'warning',
    icon: <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />,
  })
}

toast.info = (message: string, description?: string) => {
  return toast({
    title: message,
    description,
    variant: 'info',
    icon: <Info className="h-5 w-5 text-[var(--primary)]" />,
  })
}

toast.loading = (message: string, description?: string) => {
  return toast({
    title: message,
    description,
    variant: 'default',
    duration: 0, // Don't auto-dismiss loading toasts
    icon: (
      // data-essential-motion: a frozen spinner reads as a stalled request -
      // status indication is the WCAG exemption this attribute exists for.
      <div data-essential-motion className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent text-[var(--primary)]" />
    ),
  })
}

interface ToastPromiseMessage {
  title: string
  description?: string
}

/**
 * Update-toast lifecycle (board: hidden -> sending -> sent | failed ->
 * dismissed). ONE toast morphs through the states in place - same Radix Root,
 * same corner; ToastItem animates the height/content change via WAAPI.
 * Rethrows on rejection so callers can branch. duration: 0 skips the
 * creation-time dismiss timer (and Toaster maps it to Infinity for Radix), so
 * dismissal is armed here after settle.
 */
toast.promise = async <T,>(
  promise: Promise<T>,
  messages: {
    loading: ToastPromiseMessage
    success: ToastPromiseMessage
    error: ToastPromiseMessage
  }
): Promise<T> => {
  const t = toast({
    ...messages.loading,
    variant: 'default',
    duration: 0,
    icon: (
      // data-essential-motion: a frozen spinner reads as a stalled request -
      // status indication is the WCAG exemption this attribute exists for.
      <div data-essential-motion className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent text-[var(--primary)]" />
    ),
  })
  try {
    const value = await promise
    t.update({
      ...messages.success,
      variant: 'success',
      icon: <CheckCircle className="h-5 w-5 text-[var(--success)]" />,
    })
    return value
  } catch (error) {
    t.update({
      ...messages.error,
      variant: 'destructive',
      icon: <AlertCircle className="h-5 w-5 text-[var(--error)]" />,
    })
    throw error
  } finally {
    setTimeout(t.dismiss, 5000)
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

// Renders one toast and, when its content is updated in place (toast.promise:
// sending -> sent | failed), morphs the container height and rises the new
// content in. WAAPI (el.animate), not CSS: it is immune to the global
// prefers-reduced-motion zeroing (status feedback is the one tier that must
// stay visible), costs zero bundle, and height:auto isn't CSS-transitionable.
// Missing Web Animations API -> heights snap; content still correct.
function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: ToastState
  onDismiss: (id: string) => void
}) {
  const { id, title, description, action, variant, icon, duration, open } = t
  const rootRef = React.useRef<React.ElementRef<typeof ToastPrimitives.Root>>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const contentKey = `${title}|${description}|${variant}`
  const prevKeyRef = React.useRef<string | undefined>(undefined)
  const prevHeightRef = React.useRef(0)
  const [announceText, setAnnounceText] = React.useState('')

  React.useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prevKey = prevKeyRef.current
    const prevHeight = prevHeightRef.current
    const nextHeight = root.offsetHeight
    prevKeyRef.current = contentKey
    prevHeightRef.current = nextHeight
    // Animate only genuine in-place content swaps, never the initial mount.
    if (prevKey === undefined || prevKey === contentKey) return
    // Radix only announces a toast on MOUNT; an in-place update (toast.promise
    // settling) is silent to screen readers, so announce it ourselves. Set
    // before the WAAPI guard - the announcement must not depend on el.animate.
    setAnnounceText([title, description].filter(Boolean).join('. '))
    // Reduced motion: the in-place swap lands instantly (end states stand
    // alone); the announcement above already happened.
    if (!motionOK()) return
    if (typeof root.animate !== 'function') return
    if (prevHeight > 0 && prevHeight !== nextHeight) {
      // fill 'none' (default): lands back on natural auto height, no cleanup.
      root.animate(
        [{ height: `${prevHeight}px` }, { height: `${nextHeight}px` }],
        { duration: DUR.morph * 1000, easing: EASE_MORPH_CSS }
      )
    }
    contentRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 180, easing: 'ease-out' }
    )
  }, [contentKey, title, description])

  return (
    <Toast
      ref={rootRef}
      variant={variant}
      open={open}
      // Radix treats duration 0 as "close immediately", not "never" - our
      // store uses 0 for promise/loading toasts, so map it to Infinity.
      duration={duration === 0 ? Infinity : duration}
      // open is controlled from our store, so Radix's close/swipe requests must
      // be routed back into it - without this the X and swipe were no-ops.
      onOpenChange={(o) => {
        if (!o) onDismiss(id)
      }}
    >
      <div ref={contentRef} className="flex gap-3 items-start w-full">
        {/* key remounts the icon on variant change, replaying icon-swap-in */}
        {icon && (
          <div key={variant ?? 'default'} className="icon-swap-in flex-shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div className="grid gap-1 flex-1 min-w-0">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && (
            <ToastDescription>{description}</ToastDescription>
          )}
        </div>
      </div>
      {/* Populated only on in-place content swaps (mounts are announced by
          Radix itself); assertive matches Radix's foreground level. */}
      <span aria-live="assertive" aria-atomic="true" className="sr-only">
        {announceText}
      </span>
      {action}
      <ToastClose />
    </Toast>
  )
}

// Toaster component
function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  toast,
  useToast,
  Toaster,
}