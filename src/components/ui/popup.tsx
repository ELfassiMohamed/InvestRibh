import * as React from "react"
import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PopupProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string | false
  description?: string | false
  children?: React.ReactNode
  className?: string
  showCloseButton?: boolean
}

export function Popup({
  open = false,
  onOpenChange,
  title,
  description,
  children,
  className,
  showCloseButton = true,
}: PopupProps) {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    onOpenChange?.(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div 
        className={cn(
          "relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl transform transition-all duration-300 ease-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-md p-1 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-yellow-100">
              <svg 
                className="h-4 w-4 text-yellow-600" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 8v4M12 16h.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            {title && (
              <h2 className="text-lg font-semibold text-on-surface">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 text-sm text-on-surface-variant">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
