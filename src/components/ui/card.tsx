import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-ink/10 bg-porcelain/70 p-7 shadow-soft transition-all duration-300',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-display text-2xl font-600 leading-tight text-ink', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-[0.95rem] leading-relaxed text-ink-soft', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

export { Card, CardTitle, CardDescription }
