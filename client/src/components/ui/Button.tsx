import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30',
  secondary:
    'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20',
  ghost:
    'hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  outline:
    'border border-white/10 hover:border-white/20 hover:bg-white/5 text-[var(--color-text-primary)]',
  gradient:
    'bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-xl',
          'transition-all duration-200 cursor-pointer hover:-translate-y-0.5',
          'focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
