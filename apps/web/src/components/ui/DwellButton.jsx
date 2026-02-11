import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

const DWELL_MS = 2000

export function DwellButton({
  dwellEnabled = false,
  onActivate,
  className,
  children,
  disabled = false,
  title,
}) {
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  const startedAtRef = useRef(0)

  const clearTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setProgress(0)
  }

  useEffect(() => clearTimers, [])

  const startDwell = () => {
    if (!dwellEnabled || disabled) {
      return
    }
    clearTimers()
    startedAtRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current
      setProgress(Math.min(100, Math.round((elapsed / DWELL_MS) * 100)))
    }, 40)
    timeoutRef.current = setTimeout(() => {
      clearTimers()
      onActivate?.()
    }, DWELL_MS)
  }

  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={() => {
        if (!dwellEnabled && !disabled) {
          onActivate?.()
        }
      }}
      onMouseEnter={startDwell}
      onMouseLeave={clearTimers}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
    >
      {children}
      {dwellEnabled && progress > 0 ? (
        <span
          className="pointer-events-none absolute inset-0 rounded-md"
          style={{
            background: `conic-gradient(rgba(79,70,229,0.25) ${progress * 3.6}deg, transparent 0deg)`,
          }}
        />
      ) : null}
    </button>
  )
}
